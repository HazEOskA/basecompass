import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { categoryList } from '../data/categories';

interface FilterState {
  category: string;
  level: string;
  risk: string;
  sort: string;
}

interface CategoryFilterProps {
  filters: FilterState;
  onChange: (f: Partial<FilterState>) => void;
  totalCount: number;
  filteredCount: number;
}

const LEVELS  = ['Easy', 'Medium', 'Advanced'];
const RISKS   = ['Low', 'Medium', 'High'];
const SORTS   = [
  { value: 'score-desc', label: 'Best Score' },
  { value: 'score-asc',  label: 'Lowest Score' },
  { value: 'name',       label: 'Name A-Z' },
  { value: 'risk-low',   label: 'Safest First' },
];

const Pill: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-sm border
      min-h-10 transition-all duration-150 whitespace-nowrap touch-manipulation
      ${active
        ? 'bg-base-blue/25 border-base-blue/60 text-base-blue-lt'
        : 'bg-surface-2 border-base-blue/15 text-txt-muted hover:border-base-blue/35 hover:text-txt-secondary'
      }
    `}
  >
    {children}
  </button>
);

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  filters,
  onChange,
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-base-blue" />
          <span className="font-mono text-xs text-txt-muted uppercase tracking-wider">Filters</span>
        </div>
        <div className="font-mono text-xs text-txt-muted">
          <span className="text-neon-cyan font-bold">{filteredCount}</span>
          <span className="opacity-50"> / {totalCount} dApps</span>
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="font-mono text-[10px] text-txt-muted uppercase tracking-[0.2em] mb-2">District</p>
        <div className="flex flex-wrap gap-1.5">
          <Pill active={filters.category === ''} onClick={() => onChange({ category: '' })}>
            All
          </Pill>
          {categoryList.map(cat => (
            <Pill
              key={cat.id}
              active={filters.category === cat.id}
              onClick={() => onChange({ category: filters.category === cat.id ? '' : cat.id })}
            >
              {cat.emoji} {cat.name}
            </Pill>
          ))}
        </div>
      </div>

      {/* Level + Risk row */}
      <div className="flex flex-wrap gap-6">
        <div>
          <p className="font-mono text-[10px] text-txt-muted uppercase tracking-[0.2em] mb-2">Level</p>
          <div className="flex flex-wrap gap-1.5">
            <Pill active={filters.level === ''} onClick={() => onChange({ level: '' })}>All</Pill>
            {LEVELS.map(l => (
              <Pill key={l} active={filters.level === l} onClick={() => onChange({ level: filters.level === l ? '' : l })}>
                {l}
              </Pill>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] text-txt-muted uppercase tracking-[0.2em] mb-2">Risk</p>
          <div className="flex flex-wrap gap-1.5">
            <Pill active={filters.risk === ''} onClick={() => onChange({ risk: '' })}>All</Pill>
            {RISKS.map(r => (
              <Pill key={r} active={filters.risk === r} onClick={() => onChange({ risk: filters.risk === r ? '' : r })}>
                {r}
              </Pill>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] text-txt-muted uppercase tracking-[0.2em] mb-2">Sort</p>
          <div className="flex flex-wrap gap-1.5">
            {SORTS.map(s => (
              <Pill key={s.value} active={filters.sort === s.value} onClick={() => onChange({ sort: s.value })}>
                {s.label}
              </Pill>
            ))}
          </div>
        </div>
      </div>

      {/* Clear filters */}
      {(filters.category || filters.level || filters.risk) && (
        <button
          onClick={() => onChange({ category: '', level: '', risk: '', sort: 'score-desc' })}
          className="font-mono text-[10px] text-street-red/70 uppercase tracking-wider hover:text-street-red transition-colors duration-150"
        >
          × Clear all filters
        </button>
      )}
    </div>
  );
};

export default CategoryFilter;
