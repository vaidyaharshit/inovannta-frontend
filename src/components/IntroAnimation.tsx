import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SkipForward } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasTriggeredRef = useRef(false);

  // Smoothly trigger completion with fade-out
  const triggerComplete = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsFadingOut(true);

    // Wait for the CSS fade-out transition (700ms) to complete before unmounting
    setTimeout(() => {
      onComplete();
    }, 700);
  }, [onComplete]);

  // Handle Skip button
  const handleSkip = () => {
    triggerComplete();
  };

  // Keyboard accessibility: ESC or Space skips intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        triggerComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerComplete]);

  // Lock body scroll while intro is playing
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Graceful fallback watchdog timer (12s safety timeout)
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      triggerComplete();
    }, 12000);

    return () => clearTimeout(safetyTimer);
  }, [triggerComplete]);

  // Autoplay attempt with error fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback, smoothly complete to reveal Home
        triggerComplete();
      });
    }
  }, [triggerComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-700 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="INNOVANTA Intro Animation"
    >
      {/* Video Element: Autoplay, Muted, Inline, Aspect-ratio preserved */}
      <video
        ref={videoRef}
        src="/innovanta-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={triggerComplete}
        onError={() => triggerComplete()}
        className="w-full h-full object-contain select-none bg-black"
      />

      {/* Elegant Skip Intro button in top-right */}
      <button
        onClick={handleSkip}
        className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white text-xs sm:text-sm font-medium tracking-wide backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white select-none"
        aria-label="Skip intro animation"
      >
        <span>Skip Intro</span>
        <SkipForward className="w-3.5 h-3.5 text-slate-300" />
      </button>
    </div>
  );
};

