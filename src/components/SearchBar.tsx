import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search dApps, categories, tags...',
}) => {
  return (
    <div className="relative group">
      <Search
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-txt-muted group-focus-within:text-neon-cyan transition-colors duration-200"
      />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-10 py-3 rounded-lg font-ui text-sm
          bg-surface-2 border border-base-blue/20
          text-txt-primary placeholder:text-txt-muted
          focus:outline-none focus:border-neon-cyan/50 focus:bg-surface-2
          transition-all duration-200
        "
        style={{
          boxShadow: 'none',
        }}
        onFocus={e => {
          e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,212,255,0.25), 0 0 20px rgba(0,82,255,0.1)';
        }}
        onBlur={e => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-txt-muted hover:text-txt-primary transition-colors duration-150"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
