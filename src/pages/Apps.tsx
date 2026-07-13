import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Database, SlidersHorizontal } from 'lucide-react';
import { apps } from '../data/apps';
import { filterApps, sortApps, FilterState } from '../utils/filters';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import StreetIntelCard from '../components/StreetIntelCard';
import SprayDivider from '../components/SprayDivider';

const DEFAULT_FILTERS: FilterState = {
  search:   '',
  category: '',
  level:    '',
  risk:     '',
  sort:     'score-desc',
};

const Apps: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...DEFAULT_FILTERS,
    category: searchParams.get('category') ?? '',
  }));

  // sync URL param on mount
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setFilters(f => ({ ...f, category: cat }));
  }, [searchParams]);

  const merge = (partial: Partial<FilterState>) =>
    setFilters(f => ({ ...f, ...partial }));

  const filtered = useMemo(
    () => sortApps(filterApps(apps, filters), filters.sort),
    [filters],
  );

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div
        className="relative py-10 sm:py-14 px-4 border-b overflow-hidden"
        style={{
          borderColor: 'rgba(0,82,255,0.15)',
          background:
            'linear-gradient(180deg, rgba(0,82,255,0.08) 0%, transparent 100%)',
        }}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 bg-grid pointer-events-none"
          style={{ backgroundSize: '60px 60px' }}
        />
        <div className="relative max-w-6xl mx-auto">
          <p className="font-mono text-[11px] text-txt-muted uppercase tracking-[0.3em] mb-2">
            // street intel directory
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-txt-primary mb-3">
            DAPP DIRECTORY
          </h1>
          <p className="font-ui text-txt-secondary max-w-xl">
            56 dApps mapped across 8 Base districts. Scored for beginners.
            Risk-rated. Mission-ready.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
        {/* Search */}
        <div className="mb-6">
          <SearchBar
            value={filters.search}
            onChange={v => merge({ search: v })}
          />
        </div>

        {/* Filters */}
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(open => !open)}
          aria-expanded={mobileFiltersOpen}
          className="md:hidden w-full min-h-11 mb-3 px-4 rounded-lg border border-base-blue/25 bg-surface-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-txt-secondary touch-manipulation"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-base-blue" />
            Filters · {filtered.length} results
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <div
          className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block neon-card rounded-xl p-4 sm:p-5 mb-6 sm:mb-8`}
          style={{ borderColor: 'rgba(0,82,255,0.2)' }}
        >
          <CategoryFilter
            filters={filters}
            onChange={merge}
            totalCount={apps.length}
            filteredCount={filtered.length}
          />
        </div>

        <SprayDivider
          label={`${filtered.length} intel cards`}
          className="mb-8"
        />

        {/* Results grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((app, i) => (
              <StreetIntelCard key={app.id} app={app} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <Database
              size={40}
              className="text-txt-muted mx-auto mb-4 opacity-40"
            />
            <p className="font-display text-3xl text-txt-muted mb-2">
              NO INTEL FOUND
            </p>
            <p className="font-ui text-txt-muted text-sm mb-6">
              No dApps match your current filters.
            </p>
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="btn-ghost text-sm"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Apps;
