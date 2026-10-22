import React from 'react';
import type { PillarItem } from '../types';
import { Cpu, Sparkles, BookOpen, Rocket, Users, Network } from 'lucide-react';

interface PillarCardProps {
  pillar: PillarItem;
}

export const PillarCard: React.FC<PillarCardProps> = ({ pillar }) => {
  // Minimal monochrome line icons
  const renderIcon = () => {
    const props = { className: 'w-4 h-4 text-[#7028E8] dark:text-slate-300 dark:group-hover:text-purple-300 transition-colors duration-200' };
    switch (pillar.iconName) {
      case 'Cpu':
        return <Cpu {...props} strokeWidth={1.75} />;
      case 'Sparkles':
        return <Sparkles {...props} strokeWidth={1.75} />;
      case 'BookOpen':
        return <BookOpen {...props} strokeWidth={1.75} />;
      case 'Rocket':
        return <Rocket {...props} strokeWidth={1.75} />;
      case 'Users':
        return <Users {...props} strokeWidth={1.75} />;
      case 'Network':
        return <Network {...props} strokeWidth={1.75} />;
      default:
        return <Sparkles {...props} strokeWidth={1.75} />;
    }
  };

  return (
    <article className="group relative flex flex-col justify-between h-full p-7 sm:p-8 bg-white border border-[#E3E6EF] shadow-xs hover:border-[#7028E8]/40 hover:bg-slate-50/50 hover:shadow-md dark:bg-[#0e0f18] dark:border-white/[0.08] dark:hover:border-purple-500/40 dark:hover:bg-[#121422] dark:hover:shadow-[0_12px_32px_-8px_rgba(168,85,247,0.18)] hover:-translate-y-1 transition-all duration-300 rounded-2xl">
      <div>
        {/* Top bar: Minimal icon container & subtle editorial number */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E3E6EF] dark:border-white/[0.06]">
          <div className="w-9 h-9 rounded-lg bg-[#EEE7FF] border border-[#7028E8]/20 group-hover:bg-[#7028E8]/10 group-hover:border-[#7028E8]/40 dark:bg-white/[0.04] dark:border-white/[0.08] dark:group-hover:bg-purple-500/10 dark:group-hover:border-purple-500/30 flex items-center justify-center transition-colors duration-200">
            {renderIcon()}
          </div>
          <span className="font-mono text-xs font-semibold text-[#777D8D] group-hover:text-[#F59E0B] dark:text-slate-500 dark:group-hover:text-amber-400 transition-colors tracking-widest">
            {pillar.number}
          </span>
        </div>

        {/* Pillar Title */}
        <h3 className="font-display font-bold text-xl text-[#171725] group-hover:text-[#7028E8] dark:text-white dark:group-hover:text-purple-200 transition-colors duration-200 mb-3 tracking-tight">
          {pillar.title}
        </h3>

        {/* Pillar Description */}
        <p className="font-body text-sm text-[#555B6E] dark:text-slate-400 leading-relaxed">
          {pillar.description}
        </p>
      </div>

      {/* Understated Editorial Hover Accent Line */}
      <div className="mt-8 pt-4 border-t border-[#E3E6EF] dark:border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-[#777D8D] group-hover:text-[#171725] dark:text-slate-500 dark:group-hover:text-slate-300 transition-colors">
          Core Pillar
        </span>
        <div className="w-5 h-[1.5px] bg-slate-200 dark:bg-white/10 group-hover:w-8 group-hover:bg-gradient-to-r group-hover:from-[#7028E8] group-hover:to-[#F59E0B] dark:group-hover:from-purple-400 dark:group-hover:to-amber-400 transition-all duration-300" />
      </div>
    </article>
  );
};
