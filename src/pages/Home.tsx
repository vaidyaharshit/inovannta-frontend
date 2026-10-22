import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { PillarCard } from '../components/PillarCard';
import { pillarsData } from '../data/pillars';
import {
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  Lightbulb,
  Hammer,
  Globe2
} from 'lucide-react';

interface HomePageProps {
  onNavigateToEvents: () => void;
  onOpenCommunityJoin: () => void;
}

export const Home: React.FC<HomePageProps> = ({
  onNavigateToEvents,
  onOpenCommunityJoin,
}) => {
  // Philosophy active tab for Section A interactive exploration
  const [activePhilosophy, setActivePhilosophy] = useState<'manifest' | 'build' | 'impact'>('manifest');

  const philosophyDetails = {
    manifest: {
      step: '01',
      title: 'MANIFEST',
      accentColor: 'text-[#7028E8] dark:text-purple-400',
      borderAccent: 'border-purple-500/30',
      icon: Lightbulb,
      tagline: 'Imagine possibilities, identify problems and envision what can be achieved.',
      bullets: [
        'Curating student-led curiosity into high-conviction research questions',
        'Identifying unsolved community, environmental, and technological bottlenecks',
        'Unconstrained ideation sprints with interdisciplinary teams',
      ],
    },
    build: {
      step: '02',
      title: 'BUILD',
      accentColor: 'text-[#171725] dark:text-slate-100',
      borderAccent: 'border-white/20',
      icon: Hammer,
      tagline: 'Turn ideas into projects, solutions, initiatives and experiences through action.',
      bullets: [
        'Shipping production code, training intelligent models, and building hardware',
        'Peer code critiques, architecture reviews, and sprint check-ins',
        'Collaborative open-source repositories and product labs',
      ],
    },
    impact: {
      step: '03',
      title: 'IMPACT',
      accentColor: 'text-[#D97706] dark:text-amber-400',
      borderAccent: 'border-amber-500/30',
      icon: Globe2,
      tagline: 'Create meaningful value for students, communities and the wider ecosystem.',
      bullets: [
        'Deploying live tools to real student and institutional users',
        'Presenting papers, launching ventures, and winning national hackathons',
        'Mentoring the next generation of incoming builders and researchers',
      ],
    },
  };

  const currentPhil = philosophyDetails[activePhilosophy];
  const PhilIcon = currentPhil.icon;

  return (
    <div className="relative w-full bg-[#F8F9FC] dark:bg-[#08080c] transition-colors duration-200">
      
      {/* 1. Flagship Hero Section */}
      <Hero
        onNavigateToEvents={onNavigateToEvents}
        onOpenCommunityJoin={onOpenCommunityJoin}
      />

      {/* 2. SECTION A: Introduction to INNOVANTA */}
      <section
        id="ecosystem-intro"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#E3E6EF] dark:border-white/[0.05] bg-[#F8F9FC] dark:bg-[#08080c] transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#EEE7FF] text-[#7028E8] border border-[#7028E8]/30 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20 uppercase tracking-widest shadow-xs">
              The INNOVANTA Thesis
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#171725] dark:text-white mt-5 mb-6 tracking-tight">
              More Than a Community.{' '}
              <span className="gradient-text-brand">An Ecosystem.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#555B6E] dark:text-slate-300/85 leading-relaxed font-normal">
              INNOVANTA brings together aspiring innovators, developers, researchers and entrepreneurs to learn, collaborate and create meaningful solutions. Through projects, events and collaborative initiatives, we create opportunities for students to develop their skills and turn ideas into impact.
            </p>
          </div>

          {/* Interactive Core Philosophy Showcase (MANIFEST. BUILD. IMPACT.) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Philosophy Navigation Tabs (Left 5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#777D8D] dark:text-slate-400 mb-1">
                Our Triad of Action
              </div>

              {(['manifest', 'build', 'impact'] as const).map((key) => {
                const item = philosophyDetails[key];
                const isActive = activePhilosophy === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActivePhilosophy(key)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-white border-[#7028E8]/40 shadow-sm translate-x-1 dark:bg-white/[0.06] dark:border-white/20 dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
                        : 'bg-white/60 border-[#E3E6EF] hover:bg-white hover:border-slate-300 dark:bg-white/[0.02] dark:border-white/[0.05] dark:hover:bg-white/[0.04] dark:hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono font-semibold text-[#777D8D] dark:text-slate-500">
                        {item.step}
                      </span>
                      <div>
                        <div className={`font-display font-bold text-lg ${isActive ? item.accentColor : 'text-[#555B6E] group-hover:text-[#171725] dark:text-slate-300 dark:group-hover:text-white'}`}>
                          {item.title}
                        </div>
                        <div className="text-xs text-[#777D8D] dark:text-slate-400 line-clamp-1 max-w-[240px]">
                          {item.tagline}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'text-[#7028E8] dark:text-white translate-x-1' : 'text-[#777D8D] group-hover:text-[#171725] dark:text-slate-600 dark:group-hover:text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Philosophy Visual Display Card (Right 7 Cols) */}
            <div className="lg:col-span-7 rounded-3xl p-8 sm:p-10 border border-[#E3E6EF] bg-white shadow-sm dark:border-white/[0.08] dark:bg-[#0c0d16] flex flex-col justify-between relative overflow-hidden transition-all duration-500 dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEE7FF] border border-[#7028E8]/20 text-[#7028E8] dark:bg-white/[0.05] dark:border-white/10 flex items-center justify-center">
                    <PhilIcon className={`w-6 h-6 ${currentPhil.accentColor}`} />
                  </div>
                  <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-[#F0F2F8] border border-[#E3E6EF] text-[#777D8D] dark:bg-white/[0.05] dark:border-white/10 dark:text-slate-400">
                    Phase {currentPhil.step} of 03
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-[#171725] dark:text-white">
                  <span className={currentPhil.accentColor}>{currentPhil.title}</span>: {currentPhil.tagline}
                </h3>

                <ul className="space-y-3 mt-6">
                  {currentPhil.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#555B6E] dark:text-slate-300">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${currentPhil.accentColor}`} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link to Pillars */}
              <div className="mt-8 pt-6 border-t border-[#E3E6EF] dark:border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-[#777D8D] dark:text-slate-400">
                  Integrated across all 6 core pillars of INNOVANTA
                </span>
                <a
                  href="#six-pillars"
                  className="text-xs font-semibold text-[#7028E8] hover:text-[#551fb5] dark:text-purple-400 dark:hover:text-purple-300 flex items-center gap-1 group"
                >
                  Explore Pillars
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. SECTION B: Our Six Pillars */}
      <section
        id="six-pillars"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#F0F2F8] dark:bg-[#08080c] border-t border-[#E3E6EF] dark:border-white/[0.04] transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-widest shadow-xs">
              Foundational Architecture
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#171725] dark:text-white mt-5 mb-4 tracking-tight">
              Our Six Pillars
            </h2>
            <p className="text-base sm:text-lg text-[#555B6E] dark:text-slate-300/85 leading-relaxed font-normal">
              Structured to support every phase of a student's technical and entrepreneurial trajectory from curiosity to leadership.
            </p>
          </div>

          {/* Pillars Responsive Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pillarsData.map((pillar) => (
              <PillarCard key={pillar.id} pillar={pillar} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. SECTION D: Final Call To Action */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#F8F9FC] dark:bg-[#07070a] border-t border-[#E3E6EF] dark:border-white/[0.05] transition-colors duration-200">
        {/* Subtle dual-color ambient backdrop */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[480px] h-[480px] bg-purple-600/[0.04] dark:bg-purple-700/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[480px] h-[480px] bg-amber-500/[0.04] dark:bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto rounded-3xl p-8 sm:p-14 border border-[#E3E6EF] bg-white shadow-lg dark:border-white/[0.08] dark:bg-[#0c0d16]/90 backdrop-blur-xl text-center dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0F2F8] border border-[#E3E6EF] text-xs font-semibold tracking-widest text-[#555B6E] uppercase mb-6 dark:bg-white/[0.04] dark:border-white/[0.07] dark:text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] dark:text-amber-400" />
            BUILD SOMETHING THAT MATTERS
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#171725] dark:text-white tracking-tight mb-5">
            Your Ideas Deserve a Platform.
          </h2>

          <p className="font-body text-base sm:text-lg text-[#555B6E] dark:text-slate-300/90 max-w-2xl mx-auto leading-relaxed mb-10">
            Join a community where ideas are explored, skills are developed and meaningful work gets built.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenCommunityJoin}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-amber-500 shadow-[0_4px_20px_rgba(112,40,232,0.25)] dark:shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_6px_25px_rgba(249,115,22,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              Join INNOVANTA
            </button>

            <button
              onClick={onNavigateToEvents}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-[#171725] bg-white hover:bg-slate-50 border border-[#E3E6EF] hover:border-[#7028E8]/40 shadow-xs dark:bg-white/[0.03] dark:hover:bg-white/[0.07] dark:text-slate-200 dark:border-white/[0.1] dark:hover:border-purple-400/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <Compass className="w-4 h-4 text-[#7028E8] dark:text-purple-400" />
              Explore Events
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
