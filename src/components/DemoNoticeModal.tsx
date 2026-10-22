import React, { useEffect, useRef, useState } from 'react';
import { X, Sparkles, Mail, ExternalLink, Check, Info } from 'lucide-react';
import { siteConfig } from '../config/site';
import { InstagramIcon } from './icons';

interface DemoNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  type?: 'community' | 'registration';
  eventName?: string;
}

export const DemoNoticeModal: React.FC<DemoNoticeModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'community',
  eventName,
}) => {
  const [copied, setCopied] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.officialEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  const defaultTitle =
    type === 'community' ? 'Join INNOVANTA Ecosystem' : `Register: ${eventName || 'Event'}`;

  const defaultMessage =
    type === 'community'
      ? 'Official community onboarding (Discord / WhatsApp / Notion portal) link is configurable in src/config/site.ts. In this live prototype, connect with the core team directly via our verified channels:'
      : 'Official event registration forms are connected per event in src/data/events.ts. In this prototype, demo registration is simulated. When live, this button redirects directly to the official Google Form or ticketing portal.';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-white border border-[#E3E6EF] rounded-3xl p-6 sm:p-7 shadow-2xl dark:bg-[#0e0f18] dark:border-white/10 dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#555B6E] hover:text-[#171725] dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer z-10"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="w-12 h-12 rounded-2xl bg-[#EEE7FF] text-[#7028E8] border border-[#7028E8]/30 dark:bg-gradient-to-br dark:from-purple-500/20 dark:to-amber-500/20 dark:border-purple-500/30 dark:text-purple-300 flex items-center justify-center mb-4 relative z-10">
          {type === 'community' ? <Sparkles className="w-6 h-6" /> : <Info className="w-6 h-6" />}
        </div>

        <h3 className="text-xl font-display font-bold text-[#171725] dark:text-white mb-2 relative z-10">
          {title || defaultTitle}
        </h3>

        <p className="text-sm text-[#555B6E] dark:text-slate-300 leading-relaxed mb-6 relative z-10">
          {message || defaultMessage}
        </p>

        {/* Official Channels Action Cards */}
        <div className="space-y-3 mb-6 relative z-10">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F0F2F8] border border-[#E3E6EF] dark:bg-white/[0.03] dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EEE7FF] text-[#7028E8] dark:bg-purple-500/20 dark:text-purple-300 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-[#777D8D] dark:text-slate-400 uppercase font-semibold">Official Contact</div>
                <div className="text-xs text-[#171725] dark:text-white font-medium">{siteConfig.officialEmail}</div>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-200 border border-[#E3E6EF] text-[#171725] dark:bg-white/10 dark:hover:bg-white/20 dark:text-slate-200 dark:border-transparent transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Copied</span>
                </>
              ) : (
                <span>Copy</span>
              )}
            </button>
          </div>

          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F0F2F8] border border-[#E3E6EF] hover:border-[#F59E0B]/40 dark:bg-white/[0.03] dark:border-white/10 dark:hover:bg-white/[0.06] dark:hover:border-amber-500/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300 flex items-center justify-center">
                <InstagramIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-[#777D8D] dark:text-slate-400 uppercase font-semibold">Instagram Updates</div>
                <div className="text-xs text-[#171725] dark:text-white font-medium">{siteConfig.instagramHandle}</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#777D8D] group-hover:text-[#171725] dark:text-slate-400 dark:group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* Close Action */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 transition-all cursor-pointer shadow-md dark:shadow-purple-900/30 relative z-10"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
