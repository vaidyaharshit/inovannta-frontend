import React from 'react';
import { BrandLogo } from './BrandLogo';
import { siteConfig } from '../config/site';
import { Mail, ArrowUpRight, ArrowRight } from 'lucide-react';
import { InstagramIcon } from './icons';

interface FooterProps {
  onNavigate: (page: 'home' | 'events') => void;
  onOpenCommunityJoin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCommunityJoin }) => {
  const handleNav = (page: 'home' | 'events') => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#F0F2F8] border-t border-[#E3E6EF] text-[#555B6E] pt-16 pb-12 overflow-hidden dark:bg-[#07070b] dark:border-white/[0.08] dark:text-slate-300 transition-colors duration-200">
      {/* Subtle background ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/[0.03] dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/[0.03] dark:bg-amber-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#E3E6EF] dark:border-white/[0.06]">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center">
              <BrandLogo size="md" variant="plain" onClick={() => handleNav('home')} />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E3E6EF] shadow-xs text-xs font-semibold tracking-widest text-[#171725] uppercase dark:bg-white/[0.04] dark:border-white/[0.06] dark:text-slate-300">
              <span className="text-[#7028E8] dark:text-purple-400">MANIFEST</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-[#171725] dark:text-white">BUILD</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-[#D97706] dark:text-amber-400">IMPACT</span>
            </div>

            <p className="text-sm text-[#555B6E] dark:text-slate-400 max-w-sm leading-relaxed">
              INNOVANTA is a student-led innovation ecosystem designed to empower curious minds through technology, AI, research, entrepreneurship and real-world impact.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#171725] dark:text-slate-400">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-[#555B6E] hover:text-[#171725] dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 group-hover:bg-[#7028E8] dark:group-hover:bg-purple-400 transition-colors" />
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('events')}
                  className="text-[#555B6E] hover:text-[#171725] dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-amber-500 dark:group-hover:bg-amber-400 transition-colors" />
                  Events & Workshops
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCommunityJoin}
                  className="text-[#7028E8] hover:text-[#551fb5] dark:text-purple-400 dark:hover:text-purple-300 transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
                >
                  <span>Join the Community</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Official Contact & Socials */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#171725] dark:text-slate-400">
              Official Channels
            </h3>
            
            <div className="space-y-3">
              <a
                href={`mailto:${siteConfig.officialEmail}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#E3E6EF] shadow-xs hover:border-[#7028E8]/40 dark:bg-white/[0.03] dark:border-white/[0.06] dark:hover:bg-white/[0.06] dark:hover:border-purple-500/30 transition-all text-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#EEE7FF] text-[#7028E8] dark:bg-purple-500/10 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1 truncate">
                  <div className="text-[11px] text-[#777D8D] uppercase tracking-wider font-semibold">Official Email</div>
                  <div className="text-[#171725] dark:text-slate-200 group-hover:text-[#7028E8] dark:group-hover:text-purple-300 transition-colors truncate font-medium">
                    {siteConfig.officialEmail}
                  </div>
                </div>
              </a>

              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#E3E6EF] shadow-xs hover:border-[#F59E0B]/40 dark:bg-white/[0.03] dark:border-white/[0.06] dark:hover:bg-white/[0.06] dark:hover:border-amber-500/30 transition-all text-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] text-[#777D8D] uppercase tracking-wider font-semibold">Instagram</div>
                  <div className="text-[#171725] dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors flex items-center gap-1 font-medium">
                    {siteConfig.instagramHandle}
                    <ArrowUpRight className="w-3 h-3 text-[#777D8D] dark:text-slate-400" />
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777D8D] dark:text-slate-500">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.brandName}. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-[#777D8D] dark:text-slate-500">
            <span>Built by student innovators</span>
            <span>•</span>
            <span className="text-[#7028E8] dark:text-purple-400 font-medium">Ideas Into Action</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
