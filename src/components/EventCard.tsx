import React from 'react';
import type { EventItem } from '../types';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  onSelectEvent: (event: EventItem) => void;
  onRegisterClick?: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onSelectEvent,
  onRegisterClick,
}) => {
  // Status badge styling
  const statusConfig = {
    open: {
      label: 'Registrations Open',
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      dot: 'bg-emerald-500 dark:bg-emerald-400',
    },
    'coming-soon': {
      label: 'Coming Soon',
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30',
      dot: 'bg-amber-500 dark:bg-amber-400',
    },
    closed: {
      label: 'Registrations Closed',
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      dot: 'bg-rose-500 dark:bg-rose-400',
    },
    completed: {
      label: 'Event Concluded',
      bg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30',
      dot: 'bg-slate-500 dark:bg-slate-400',
    },
  };

  const status = statusConfig[event.status];

  return (
    <article className="group flex flex-col h-full rounded-2xl bg-white border border-[#E3E6EF] hover:border-[#7028E8]/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden shadow-xs hover:shadow-md dark:bg-[#0e0f18] dark:border-white/[0.08] dark:hover:border-purple-500/30 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.7)]">
      
      {/* Event Poster / Visual Header */}
      <div className={`relative h-44 w-full bg-gradient-to-br ${event.posterGradient} p-5 flex flex-col justify-between overflow-hidden border-b border-[#E3E6EF] dark:border-white/[0.06]`}>
        {/* Subtle geometric overlay */}
        <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          {/* Category Tag */}
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white uppercase tracking-wider">
            {event.category}
          </span>

          {/* Prototype / Demo Label */}
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-slate-200 border border-white/15 uppercase tracking-widest">
            Demo Sample
          </span>
        </div>

        {/* Bottom Poster Content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-white/20 bg-black/40 backdrop-blur-md mb-1.5 shadow-sm text-white">
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${event.status === 'open' ? 'animate-pulse' : ''}`} />
            <span>{status.label}</span>
          </div>
          <p className="text-xs text-slate-100 line-clamp-1 italic font-light drop-shadow-sm">
            {event.tagline}
          </p>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-display font-bold text-xl text-[#171725] group-hover:text-[#7028E8] dark:text-white dark:group-hover:text-purple-200 transition-colors mb-3 line-clamp-2">
            {event.title}
          </h3>

          {/* Logistics Metadata */}
          <div className="space-y-2 mb-4 text-xs text-[#777D8D] dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#7028E8] dark:text-purple-400 shrink-0" />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#777D8D] dark:text-slate-500 shrink-0" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B] dark:text-amber-400 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="font-body text-sm text-[#555B6E] dark:text-slate-300/80 leading-relaxed line-clamp-3 mb-5">
            {event.description}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-[#E3E6EF] dark:border-white/[0.06] flex items-center justify-between gap-3">
          <button
            onClick={() => onSelectEvent(event)}
            className="text-xs font-semibold text-[#555B6E] hover:text-[#171725] hover:bg-[#F0F2F8] dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.05] flex items-center gap-1.5 py-2 px-3 rounded-lg transition-all cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#7028E8] dark:text-purple-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Action button based on event status */}
          {event.status === 'open' ? (
            <button
              onClick={() => (onRegisterClick ? onRegisterClick(event) : onSelectEvent(event))}
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-purple-700 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Register</span>
            </button>
          ) : event.status === 'completed' ? (
            <span className="text-[11px] font-medium text-[#777D8D] px-2.5 py-1 rounded bg-[#F0F2F8] border border-[#E3E6EF] dark:text-slate-500 dark:bg-white/[0.02] dark:border-white/[0.04]">
              Concluded
            </span>
          ) : (
            <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400/80 px-2.5 py-1 rounded bg-amber-50 border border-amber-200 dark:bg-amber-500/5 dark:border-amber-500/10">
              Opening Soon
            </span>
          )}
        </div>

      </div>

    </article>
  );
};
