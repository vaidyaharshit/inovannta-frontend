import React from 'react';
import { HeroInfinityCanvas } from './HeroInfinityCanvas';
import { BrandLogo } from './BrandLogo';
import { siteConfig } from '../config/site';
import { ArrowRight, ChevronDown, Compass, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onNavigateToEvents: () => void;
  onOpenCommunityJoin: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigateToEvents,
  onOpenCommunityJoin,
}) => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('ecosystem-intro');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 overflow-hidden bg-[#F8F9FC] dark:bg-[#08080c] transition-colors duration-200">
      {/* Background Interactive Lemniscate Curves */}
      <HeroInfinityCanvas />

      {/* Subtle, restrained ambient lighting */}
      <div className="absolute top-1/4 -left-28 w-[380px] h-[380px] bg-purple-600/[0.04] dark:bg-purple-700/[0.08] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-28 w-[380px] h-[380px] bg-amber-500/[0.04] dark:bg-amber-600/[0.08] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-35 dark:opacity-15 pointer-events-none" />

      {/* Main Content Container with Balanced Editorial Hierarchy */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Subtle Brand Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E3E6EF] shadow-xs dark:bg-white/[0.04] dark:border-white/[0.08] dark:shadow-sm backdrop-blur-md mb-5 transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-amber-500" />
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[#555B6E] dark:text-slate-300 uppercase">
            STUDENT-LED INNOVATION ECOSYSTEM
          </span>
        </div>

        {/* Official Brand Logo with Authentic Proportions & Controlled Spacing */}
        <div className="mb-6 relative group">
          <BrandLogo size="hero" variant="plain" />
        </div>

        {/* Official Headline with Purple-to-Orange Brand Gradient */}
        <h1 className="font-display font-extrabold text-[clamp(2.35rem,5.6vw,4.5rem)] leading-[1.08] tracking-[-0.03em] max-w-4xl mx-auto mb-5 sm:mb-6">
          <span className="block text-[#171725] dark:text-white transition-colors duration-200">
            {siteConfig.headline.line1}
          </span>
          <span className="block gradient-text-brand mt-1 sm:mt-1.5">
            {siteConfig.headline.line2}
          </span>
        </h1>

        {/* Concise Supporting Description */}
        <p className="font-body text-[clamp(0.95rem,1.8vw,1.15rem)] text-[#555B6E] dark:text-slate-300/85 max-w-2xl mx-auto leading-relaxed mb-9 sm:mb-11 font-normal transition-colors duration-200">
          {siteConfig.introText}
        </p>

        {/* Symmetrically Paired Call To Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto justify-center mb-11">
          {/* Primary Purple-to-Orange Gradient CTA */}
          <button
            onClick={onOpenCommunityJoin}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 via-purple-700 to-amber-500 shadow-[0_2px_18px_rgba(112,40,232,0.25)] dark:shadow-[0_2px_18px_rgba(168,85,247,0.35)] hover:shadow-[0_4px_24px_rgba(249,115,22,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            id="hero-primary-cta"
          >
            <span>Join the Community</span>
            <ArrowRight className="w-4 h-4 text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          {/* Secondary Outlined CTA (Navigates to /events) */}
          <button
            onClick={onNavigateToEvents}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-[#171725] bg-white hover:bg-slate-50 border border-[#E3E6EF] hover:border-[#7028E8]/40 shadow-xs dark:bg-[#0e0f18]/80 dark:hover:bg-[#141522] dark:text-slate-200 dark:border-white/10 dark:hover:border-purple-400/40 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            id="hero-secondary-cta"
          >
            <Compass className="w-4 h-4 text-[#7028E8] dark:text-purple-400" />
            <span>Explore Events</span>
          </button>
        </div>

        {/* Proof / Trust Markers */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#777D8D] dark:text-slate-400 font-medium mb-8 sm:mb-10 transition-colors duration-200">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7028E8] dark:text-purple-400" />
            <span>100% Student-Led Ecosystem</span>
          </div>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] dark:bg-amber-400" />
            <span>Multi-Disciplinary Innovation Labs</span>
          </div>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7028E8] dark:bg-purple-400" />
            <span>Real-World Impact & Ventures</span>
          </div>
        </div>

        {/* Refined Scroll Down Indicator */}
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center gap-1 text-[#777D8D] hover:text-[#171725] dark:text-slate-500 dark:hover:text-slate-300 transition-colors p-1.5 cursor-pointer z-10"
          aria-label="Scroll to introduction section"
        >
          <span className="text-[10px] font-medium tracking-widest uppercase">Discover</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#7028E8] dark:text-purple-400" />
        </button>

      </div>
    </section>
  );
};
