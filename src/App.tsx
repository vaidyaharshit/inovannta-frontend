import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { EventDetailsModal } from './components/EventDetailsModal';
import { DemoNoticeModal } from './components/DemoNoticeModal';
import { IntroAnimation } from './components/IntroAnimation';
import type { EventItem } from './types';
import { siteConfig } from './config/site';
import { ThemeProvider } from './context/ThemeContext';

const INTRO_STORAGE_KEY = 'innovanta_intro_seen';

export function App() {
  // Determine page from pathname (/events or /) and hash fallback
  const getPageFromLocation = useCallback((): 'home' | 'events' => {
    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    
    if (pathname.includes('/events') || hash.includes('events')) {
      return 'events';
    }
    return 'home';
  }, []);

  const [activePage, setActivePage] = useState<'home' | 'events'>(getPageFromLocation);
  
  // Starting Intro Animation state:
  // Shows once per browser session, only when opening Home ('/'), and respects prefers-reduced-motion
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;

    // 1. Accessibility: skip intro if prefers-reduced-motion is requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return false;

    // 2. Direct /events route: do not show intro
    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (pathname.includes('/events') || hash.includes('events')) {
      sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
      return false;
    }

    // 3. Session persistence: do not replay if already viewed in this browser session
    if (sessionStorage.getItem(INTRO_STORAGE_KEY) === 'true') {
      return false;
    }

    return true;
  });

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [demoNotice, setDemoNotice] = useState<{
    isOpen: boolean;
    type: 'community' | 'registration';
    eventName?: string;
  }>({
    isOpen: false,
    type: 'community',
  });

  // Listen to browser navigation (back/forward) and hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      setActivePage(getPageFromLocation());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [getPageFromLocation]);

  // Update document title dynamically based on active route
  useEffect(() => {
    if (activePage === 'events') {
      document.title = 'Events & Sprints — INNOVANTA | Manifest. Build. Impact.';
    } else {
      document.title = 'INNOVANTA — Student-Led Innovation Ecosystem | Manifest. Build. Impact.';
    }
  }, [activePage]);

  // Clean router push that supports HTML5 history path + hash fallback
  const handleNavigate = (page: 'home' | 'events') => {
    const targetPath = page === 'events' ? '/events' : '/';
    
    // Push new history state
    window.history.pushState({ page }, '', targetPath);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete intro handler
  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
    setShowIntro(false);
  };

  // Registration action handler
  const handleRegisterClick = (event: EventItem) => {
    if (event.registrationUrl && event.registrationUrl.trim() !== '') {
      window.open(event.registrationUrl, '_blank', 'noopener,noreferrer');
    } else {
      setDemoNotice({
        isOpen: true,
        type: 'registration',
        eventName: event.title,
      });
    }
  };

  // Community join action handler
  const handleOpenCommunityJoin = () => {
    if (siteConfig.communityJoinUrl && siteConfig.communityJoinUrl.trim() !== '') {
      window.open(siteConfig.communityJoinUrl, '_blank', 'noopener,noreferrer');
    } else {
      setDemoNotice({
        isOpen: true,
        type: 'community',
      });
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#F8F9FC] text-[#555B6E] dark:bg-[#08080c] dark:text-slate-100 flex flex-col font-body selection:bg-purple-600/30 selection:text-white relative transition-colors duration-200">
        
        {/* Fullscreen Intro Animation (Only on initial Home visit) */}
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

        {/* Global Refined Navbar */}
        <Navbar
          activePage={activePage}
          onNavigate={handleNavigate}
          onOpenCommunityJoin={handleOpenCommunityJoin}
        />

        {/* Completely Independent Pages */}
        <main className="flex-1 w-full" id="main-content">
          {activePage === 'home' ? (
            <Home
              onNavigateToEvents={() => handleNavigate('events')}
              onOpenCommunityJoin={handleOpenCommunityJoin}
            />
          ) : (
            <Events
              onSelectEvent={(event) => setSelectedEvent(event)}
              onRegisterClick={handleRegisterClick}
              onOpenCommunityJoin={handleOpenCommunityJoin}
            />
          )}
        </main>

        {/* Global Persistent Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenCommunityJoin={handleOpenCommunityJoin}
        />

        {/* Event Details Modal (Accessible across routes if triggered) */}
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegisterClick={handleRegisterClick}
        />

        {/* Prototype Demo Notice Modal */}
        <DemoNoticeModal
          isOpen={demoNotice.isOpen}
          onClose={() => setDemoNotice((prev) => ({ ...prev, isOpen: false }))}
          type={demoNotice.type}
          eventName={demoNotice.eventName}
        />

      </div>
    </ThemeProvider>
  );
}

export default App;

