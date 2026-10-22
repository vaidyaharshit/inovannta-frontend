import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activePage: 'home' | 'events';
  onNavigate: (page: 'home' | 'events') => void;
  onOpenCommunityJoin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenCommunityJoin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (page: 'home' | 'events') => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#F8F9FC]/95 border-b border-[#E3E6EF] shadow-sm py-3 dark:bg-[#08080c]/95 dark:border-white/[0.08] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md'
          : 'bg-[#F8F9FC]/80 border-b border-[#E3E6EF]/70 py-4 dark:bg-[#08080c]/80 dark:border-white/[0.05] backdrop-blur-sm'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Original INNOVANTA Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-xl cursor-pointer"
              aria-label="INNOVANTA Home"
            >
              <BrandLogo size="sm" variant="plain" />
            </button>
          </div>

          {/* Center: Clean Editorial Navigation Links (Desktop) */}
          <nav
            className="hidden md:flex items-center gap-8 bg-white/80 border border-[#E3E6EF] px-6 py-2 rounded-full shadow-xs backdrop-blur-md dark:bg-white/[0.03] dark:border-white/[0.08] dark:shadow-sm"
            aria-label="Main Navigation"
          >
            <button
              onClick={() => handleNavClick('home')}
              className={`relative text-xs sm:text-sm font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded px-2 py-0.5 ${
                activePage === 'home'
                  ? 'text-[#171725] font-semibold dark:text-white'
                  : 'text-[#777D8D] hover:text-[#171725] dark:text-slate-400 dark:hover:text-white'
              }`}
              aria-current={activePage === 'home' ? 'page' : undefined}
            >
              Home
              {activePage === 'home' && (
                <span
                  className="absolute bottom-[-6px] left-2 right-2 h-[2px] bg-gradient-to-r from-purple-500 to-amber-500 rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>

            <button
              onClick={() => handleNavClick('events')}
              className={`relative text-xs sm:text-sm font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded px-2 py-0.5 ${
                activePage === 'events'
                  ? 'text-[#171725] font-semibold dark:text-white'
                  : 'text-[#777D8D] hover:text-[#171725] dark:text-slate-400 dark:hover:text-white'
              }`}
              aria-current={activePage === 'events' ? 'page' : undefined}
            >
              Events
              {activePage === 'events' && (
                <span
                  className="absolute bottom-[-6px] left-2 right-2 h-[2px] bg-gradient-to-r from-purple-500 to-amber-500 rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          </nav>

          {/* Right: Theme Toggle & Original CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button (Desktop) */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-[#171725] border border-[#E3E6EF] shadow-xs dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:text-slate-200 dark:border-white/[0.08] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              id="theme-toggle-desktop"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-[#7028E8] transition-transform duration-200 hover:-rotate-12" />
              )}
            </button>

            <button
              onClick={onOpenCommunityJoin}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-purple-600 via-purple-700 to-amber-500 shadow-[0_2px_14px_rgba(112,40,232,0.25)] dark:shadow-[0_2px_14px_rgba(168,85,247,0.3)] hover:shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <span>Join the Community</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/90" />
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Theme Toggle Button (Mobile Header) */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center w-8.5 h-8.5 rounded-xl bg-white text-[#171725] border border-[#E3E6EF] shadow-xs dark:bg-white/[0.05] dark:text-slate-300 dark:border-white/[0.08] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              id="theme-toggle-mobile-header"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#7028E8]" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#171725] hover:bg-slate-100 border border-[#E3E6EF] dark:text-slate-300 dark:hover:bg-white/[0.05] dark:border-white/[0.08] active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`md:hidden fixed inset-x-0 top-full left-0 right-0 h-[calc(100vh-100%)] min-h-[380px] bg-[#F8F9FC] border-t border-[#E3E6EF] dark:bg-[#08080c] dark:border-white/[0.08] transition-all duration-200 flex flex-col justify-between p-6 shadow-xl z-40 overflow-y-auto ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0 visible'
            : 'opacity-0 pointer-events-none -translate-y-2 invisible'
        }`}
      >
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`flex items-center justify-between p-4 rounded-xl text-base font-medium transition-all cursor-pointer ${
              activePage === 'home'
                ? 'bg-white text-[#171725] border border-[#E3E6EF] font-semibold shadow-xs dark:bg-white/[0.06] dark:text-white dark:border-white/20'
                : 'text-[#555B6E] hover:text-[#171725] hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.03]'
            }`}
          >
            <span>Home</span>
            {activePage === 'home' && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500/10 to-amber-500/10 text-[#7028E8] border border-[#7028E8]/30 font-semibold dark:from-purple-500/20 dark:to-amber-500/20 dark:text-purple-300 dark:border-purple-500/30">
                Active
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('events')}
            className={`flex items-center justify-between p-4 rounded-xl text-base font-medium transition-all cursor-pointer ${
              activePage === 'events'
                ? 'bg-white text-[#171725] border border-[#E3E6EF] font-semibold shadow-xs dark:bg-white/[0.06] dark:text-white dark:border-white/20'
                : 'text-[#555B6E] hover:text-[#171725] hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.03]'
            }`}
          >
            <span>Events</span>
            {activePage === 'events' && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500/10 to-amber-500/10 text-[#7028E8] border border-[#7028E8]/30 font-semibold dark:from-purple-500/20 dark:to-amber-500/20 dark:text-purple-300 dark:border-purple-500/30">
                Active
              </span>
            )}
          </button>

          {/* Theme Switcher inside Mobile Drawer */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#E3E6EF] shadow-xs dark:bg-white/[0.04] dark:border-white/[0.08] my-1">
            <span className="text-sm font-medium text-[#171725] dark:text-slate-200">
              Appearance: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F0F2F8] hover:bg-slate-200/70 text-[#171725] dark:bg-white/10 dark:hover:bg-white/20 dark:text-white transition-all cursor-pointer"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#7028E8]" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommunityJoin();
              }}
              className="w-full flex items-center justify-center gap-2 p-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-amber-500 shadow-md active:scale-98 transition-all cursor-pointer"
            >
              <span>Join the Community</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Drawer Footer */}
        <div className="border-t border-[#E3E6EF] dark:border-white/[0.08] pt-6 pb-2 text-center text-xs text-[#777D8D] dark:text-slate-400">
          <p className="font-semibold text-[#171725] dark:text-white tracking-widest uppercase mb-1">
            MANIFEST. BUILD. IMPACT.
          </p>
          <p>
            Official Contact:{' '}
            <a href="mailto:innovantaofficial@gmail.com" className="text-[#7028E8] dark:text-purple-400 hover:underline font-medium">
              innovantaofficial@gmail.com
            </a>
          </p>
        </div>
      </div>
    </header>
  );
};
