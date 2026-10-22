import React, { useState, useMemo } from 'react';
import { EventCard } from '../components/EventCard';
import { demoEventsData } from '../data/events';
import type { EventItem } from '../types';
import {
  Sparkles,
  Search,
  ArrowRight
} from 'lucide-react';

interface EventsPageProps {
  onSelectEvent: (event: EventItem) => void;
  onRegisterClick: (event: EventItem) => void;
  onOpenCommunityJoin: () => void;
}

type FilterTab = 'all' | 'upcoming' | 'past';

export const Events: React.FC<EventsPageProps> = ({
  onSelectEvent,
  onRegisterClick,
  onOpenCommunityJoin,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter categories extracted dynamically
  const categories = useMemo(() => {
    const cats = new Set(demoEventsData.map((e) => e.category));
    return ['all', ...Array.from(cats)];
  }, []);

  // Filter events based on active status tab, search query, and category
  const filteredEvents = useMemo(() => {
    return demoEventsData.filter((event) => {
      // 1. Tab filter: 'all' | 'upcoming' | 'past'
      if (activeTab === 'upcoming') {
        if (event.status !== 'open' && event.status !== 'coming-soon') {
          return false;
        }
      } else if (activeTab === 'past') {
        if (event.status !== 'completed' && event.status !== 'closed') {
          return false;
        }
      }

      // 2. Category subfilter
      if (selectedCategory !== 'all' && event.category !== selectedCategory) {
        return false;
      }

      // 3. Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesDesc = event.description.toLowerCase().includes(query);
        const matchesCategory = event.category.toLowerCase().includes(query);
        const matchesVenue = event.venue.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesVenue) {
          return false;
        }
      }

      return true;
    });
  }, [activeTab, selectedCategory, searchQuery]);

  const upcomingCount = demoEventsData.filter(
    (e) => e.status === 'open' || e.status === 'coming-soon'
  ).length;

  const pastCount = demoEventsData.filter(
    (e) => e.status === 'completed' || e.status === 'closed'
  ).length;

  return (
    <div className="relative w-full min-h-screen pt-28 pb-24 bg-[#F8F9FC] dark:bg-[#08080c] transition-colors duration-200">
      {/* Background Ambient Lighting */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[300px] bg-purple-600/[0.04] dark:bg-purple-700/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-28 right-1/4 w-[400px] h-[300px] bg-amber-500/[0.04] dark:bg-amber-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Events Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E3E6EF] shadow-xs dark:bg-white/[0.04] dark:border-white/[0.08] backdrop-blur-md mb-5">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-amber-500" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#555B6E] dark:text-slate-300 uppercase">
              THE INNOVANTA EXPERIENCE
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#171725] dark:text-white tracking-tight mb-5 transition-colors duration-200">
            Ideas Come Alive Here.
          </h1>

          <p className="font-body text-base sm:text-lg text-[#555B6E] dark:text-slate-300 max-w-2xl mx-auto leading-relaxed transition-colors duration-200">
            Discover events, workshops, challenges and collaborative experiences designed to help you learn, build and create impact.
          </p>
        </div>

        {/* Prototype Disclaimer Alert */}
        <div className="max-w-4xl mx-auto mb-10 p-4 rounded-2xl bg-white border border-[#E3E6EF] shadow-xs dark:bg-white/[0.02] dark:border-white/[0.08] backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#555B6E] dark:text-slate-300">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] dark:bg-amber-400 animate-pulse shrink-0" />
            <span>
              <strong className="text-[#171725] dark:text-white">Demo Environment: </strong>
              All event listings, dates, and agendas shown are realistic prototype mockups.
            </span>
          </div>
          <button
            onClick={onOpenCommunityJoin}
            className="text-[#7028E8] dark:text-purple-400 hover:underline font-semibold shrink-0 cursor-pointer"
          >
            Get notified when official events go live →
          </button>
        </div>

        {/* Interactive Filter Bar */}
        <div className="max-w-7xl mx-auto mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 rounded-2xl bg-white border border-[#E3E6EF] shadow-xs dark:bg-[#0d0e19] dark:border-white/[0.08]">
            
            {/* Primary Category Tabs: All Events, Upcoming, Past Events */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F0F2F8] border border-[#E3E6EF] dark:bg-white/[0.03] dark:border-white/[0.04] overflow-x-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#7028E8] text-white shadow-xs dark:bg-purple-600'
                    : 'text-[#555B6E] hover:text-[#171725] hover:bg-white/80 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.04]'
                }`}
              >
                All Events ({demoEventsData.length})
              </button>

              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'upcoming'
                    ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-xs'
                    : 'text-[#555B6E] hover:text-[#171725] hover:bg-white/80 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.04]'
                }`}
              >
                Upcoming ({upcomingCount})
              </button>

              <button
                onClick={() => setActiveTab('past')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'past'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'text-[#555B6E] hover:text-[#171725] hover:bg-white/80 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.04]'
                }`}
              >
                Past Events ({pastCount})
              </button>
            </div>

            {/* Quick Keyword Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#777D8D] dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword, or track..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F0F2F8] border border-[#E3E6EF] rounded-xl text-[#171725] placeholder-[#777D8D] focus:outline-none focus:border-[#7028E8]/50 dark:bg-white/[0.04] dark:border-white/[0.06] dark:text-white dark:placeholder-slate-500 dark:focus:border-purple-500/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#777D8D] hover:text-[#171725] dark:text-slate-500 dark:hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

          {/* Secondary Domain Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-[#777D8D] dark:text-slate-400">
            <span className="font-semibold text-[#555B6E] dark:text-slate-500 uppercase tracking-wider shrink-0 mr-1">
              Filter by track:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full border transition-all shrink-0 capitalize cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#EEE7FF] text-[#7028E8] border-[#7028E8]/40 font-semibold dark:bg-white/[0.1] dark:text-white dark:border-purple-500/40'
                    : 'bg-white text-[#555B6E] border-[#E3E6EF] hover:text-[#171725] hover:bg-slate-50 dark:bg-white/[0.02] dark:text-slate-400 dark:border-white/[0.05] dark:hover:text-white dark:hover:bg-white/[0.05]'
                }`}
              >
                {cat === 'all' ? 'All Tracks' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#777D8D] dark:text-slate-400 mb-6">
          <span>
            Showing <strong className="text-[#171725] dark:text-white">{filteredEvents.length}</strong> {filteredEvents.length === 1 ? 'event' : 'events'}
          </span>
          {(activeTab !== 'all' || selectedCategory !== 'all' || searchQuery !== '') && (
            <button
              onClick={() => {
                setActiveTab('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-[#7028E8] dark:text-purple-400 hover:underline font-medium cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Events Cards Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelectEvent={onSelectEvent}
                onRegisterClick={onRegisterClick}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-20 text-center rounded-3xl bg-white border border-[#E3E6EF] shadow-xs dark:bg-white/[0.02] dark:border-white/[0.06] p-8">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F2F8] text-[#777D8D] dark:bg-white/[0.05] flex items-center justify-center mx-auto mb-4 dark:text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#171725] dark:text-white mb-2">No events match your criteria</h3>
            <p className="text-sm text-[#555B6E] dark:text-slate-400 max-w-md mx-auto mb-6">
              Try adjusting your search terms or clearing the selected category filters.
            </p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#7028E8] hover:bg-[#5e1ec4] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Suggest / Propose an Event CTA Box */}
        <div className="mt-20 rounded-3xl p-8 sm:p-10 border border-[#E3E6EF] bg-white shadow-md dark:border-white/[0.08] dark:bg-gradient-to-r dark:from-purple-950/30 dark:via-slate-900/40 dark:to-amber-950/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D97706] dark:text-amber-300 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Have an Idea for a Sprint or Talk?
            </div>
            <h3 className="text-2xl font-display font-bold text-[#171725] dark:text-white mb-2">
              Host or Propose a Workshop with INNOVANTA
            </h3>
            <p className="text-sm text-[#555B6E] dark:text-slate-300 max-w-xl">
              Are you an aspiring speaker, student lead, or domain researcher? INNOVANTA provides the stage, audience, and technical support to turn your vision into an impactful campus event.
            </p>
          </div>

          <button
            onClick={onOpenCommunityJoin}
            className="w-full md:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-[#171725] bg-[#F0F2F8] hover:bg-slate-200 border border-[#E3E6EF] dark:text-white dark:bg-white/[0.08] dark:hover:bg-white/[0.15] dark:border-white/[0.12] transition-all shrink-0 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Connect with Event Team</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </div>
  );
};
