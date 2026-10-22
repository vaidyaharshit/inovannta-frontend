import React, { useEffect, useRef } from 'react';
import type { EventItem } from '../types';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  ArrowUpRight,
  Award,
  Layers,
  Users
} from 'lucide-react';

interface EventDetailsModalProps {
  event: EventItem | null;
  onClose: () => void;
  onRegisterClick: (event: EventItem) => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  onClose,
  onRegisterClick,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Keyboard accessibility: ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (event) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/60 dark:bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[90vh] bg-white border border-[#E3E6EF] text-[#171725] rounded-3xl shadow-2xl dark:bg-[#0c0d15] dark:border-white/[0.12] dark:text-slate-200 dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
      >
        {/* Modal Header with Event Gradient Theme */}
        <div className={`relative bg-gradient-to-r ${event.posterGradient} p-6 sm:p-8 border-b border-[#E3E6EF] dark:border-white/[0.08]`}>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/40 hover:bg-black/70 text-slate-200 hover:text-white border border-white/15 transition-all cursor-pointer z-20"
            aria-label="Close modal dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 uppercase tracking-wider">
              {event.category}
            </span>

            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-black/60 text-amber-300 border border-amber-500/30">
              Prototype Demo Content
            </span>

            {event.status === 'open' && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Registrations Open
              </span>
            )}
            {event.status === 'completed' && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-500/20 text-slate-300 border border-slate-500/30">
                Event Concluded
              </span>
            )}
            {event.status === 'coming-soon' && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Coming Soon
              </span>
            )}
          </div>

          <h2
            id="event-modal-title"
            className="text-2xl sm:text-3xl font-display font-bold text-white mb-2"
          >
            {event.title}
          </h2>

          <p className="text-sm text-slate-200 font-light italic">
            {event.tagline}
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 text-[#555B6E] dark:text-slate-200">
          
          {/* Key Quick Metadata Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F0F2F8] border border-[#E3E6EF] dark:bg-white/[0.03] dark:border-white/[0.06] text-xs">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-[#7028E8] dark:text-purple-400 mt-0.5 shrink-0" />
              <div>
                <div className="text-[#777D8D] dark:text-slate-400 font-medium">Date & Time</div>
                <div className="text-[#171725] dark:text-white font-semibold">{event.date}</div>
                <div className="text-[#777D8D] dark:text-slate-400">{event.time}</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#F59E0B] dark:text-amber-400 mt-0.5 shrink-0" />
              <div>
                <div className="text-[#777D8D] dark:text-slate-400 font-medium">Format & Venue</div>
                <div className="text-[#171725] dark:text-white font-semibold capitalize">{event.locationType}</div>
                <div className="text-[#777D8D] dark:text-slate-400 line-clamp-1">{event.venue}</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#7028E8] dark:text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <div className="text-[#777D8D] dark:text-slate-400 font-medium">Registration Status</div>
                <div className="text-[#171725] dark:text-white font-semibold">
                  {event.registrationDeadline || (event.status === 'completed' ? 'Archived' : 'Check Updates')}
                </div>
              </div>
            </div>
          </div>

          {/* About This Event */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#171725] dark:text-slate-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#7028E8] dark:text-purple-400" />
              Overview & Objectives
            </h3>
            <p className="text-sm text-[#555B6E] dark:text-slate-300 leading-relaxed">
              {event.fullDescription}
            </p>
          </div>

          {/* Past Event Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div className="p-5 rounded-2xl bg-[#EEE7FF]/50 border border-[#7028E8]/20 dark:bg-purple-950/20 dark:border-purple-500/20">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#7028E8] dark:text-purple-300 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#7028E8] dark:text-purple-400" />
                Key Highlights & Outcomes
              </h3>
              <ul className="space-y-2 text-sm text-[#555B6E] dark:text-slate-300">
                {event.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prerequisites & Takeaways */}
          {(event.prerequisites || event.takeaways) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.prerequisites && (
                <div className="p-4 rounded-xl bg-[#F0F2F8] border border-[#E3E6EF] dark:bg-white/[0.02] dark:border-white/[0.05]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#171725] dark:text-slate-400 mb-2">
                    Prerequisites
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#555B6E] dark:text-slate-300">
                    {event.prerequisites.map((req, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7028E8] dark:bg-purple-400" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.takeaways && (
                <div className="p-4 rounded-xl bg-[#F0F2F8] border border-[#E3E6EF] dark:bg-white/[0.02] dark:border-white/[0.05]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#171725] dark:text-slate-400 mb-2">
                    What You'll Gain
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#555B6E] dark:text-slate-300">
                    {event.takeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] dark:bg-amber-400" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Agenda Breakdown */}
          {event.agenda && event.agenda.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#171725] dark:text-slate-400 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F59E0B] dark:text-amber-400" />
                Schedule Breakdown
              </h3>
              <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-[2px] before:bg-[#E3E6EF] dark:before:bg-white/[0.06]">
                {event.agenda.map((item, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 pl-8">
                    <span className="absolute left-2 top-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 ring-4 ring-white dark:ring-[#0c0d15]" />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="text-sm font-semibold text-[#171725] dark:text-white">{item.title}</h5>
                        <span className="text-xs font-mono text-[#7028E8] bg-[#EEE7FF] px-2 py-0.5 rounded border border-[#7028E8]/30 self-start dark:text-purple-300 dark:bg-purple-950/40 dark:border-purple-500/20">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#555B6E] dark:text-slate-400 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Speakers / Mentors */}
          {event.speakers && event.speakers.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#171725] dark:text-slate-400 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#7028E8] dark:text-purple-400" />
                Featured Mentors & Leads
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.speakers.map((spk, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#F0F2F8] border border-[#E3E6EF] dark:bg-white/[0.02] dark:border-white/[0.06] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500/20 to-amber-500/20 text-[#7028E8] dark:text-white flex items-center justify-center font-bold text-xs">
                      {spk.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#171725] dark:text-white">{spk.name}</div>
                      <div className="text-xs text-[#777D8D] dark:text-slate-400">{spk.role} • {spk.org}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer with Registration Action */}
        <div className="p-6 bg-[#F0F2F8] border-t border-[#E3E6EF] dark:bg-[#090a10] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#777D8D] dark:text-slate-400 text-center sm:text-left">
            <span className="font-semibold text-[#171725] dark:text-slate-300">Note: </span>
            This is a prototype demonstration card. Live events will integrate official forms.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-medium text-[#171725] hover:bg-slate-200 bg-white border border-[#E3E6EF] dark:text-slate-300 dark:hover:text-white dark:bg-white/[0.05] dark:hover:bg-white/[0.1] dark:border-white/[0.08] transition-all cursor-pointer shadow-xs"
            >
              Close
            </button>

            {event.status === 'open' ? (
              <button
                onClick={() => onRegisterClick(event)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 shadow-md dark:shadow-[0_0_20px_-3px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Register for Event</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            ) : event.status === 'completed' ? (
              <button
                disabled
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold text-[#777D8D] bg-slate-200 border border-[#E3E6EF] dark:text-slate-500 dark:bg-white/[0.03] dark:border-white/[0.05] cursor-not-allowed"
              >
                Registration Concluded
              </button>
            ) : (
              <button
                disabled
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 dark:text-amber-300/80 dark:bg-amber-500/10 dark:border-amber-500/20 cursor-not-allowed"
              >
                Registrations Opening Soon
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
