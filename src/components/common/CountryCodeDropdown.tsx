import React, { useState, useRef, useEffect } from 'react';
import { COUNTRY_CODES, CountryCodeItem } from '../../data/countryCodes';
import { ChevronDown, Search, Check } from 'lucide-react';

interface CountryCodeDropdownProps {
  selectedDialCode: string;
  onSelect: (dialCode: string) => void;
  className?: string;
  compact?: boolean;
}

export const CountryCodeDropdown: React.FC<CountryCodeDropdownProps> = ({
  selectedDialCode,
  onSelect,
  className = '',
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Normalize current dial code (e.g. "+880")
  const currentCode = selectedDialCode.startsWith('+')
    ? selectedDialCode
    : `+${selectedDialCode.replace(/\D/g, '')}`;

  const currentCountry =
    COUNTRY_CODES.find((c) => c.dialCode === currentCode) ||
    COUNTRY_CODES.find((c) => c.code === 'BD') ||
    COUNTRY_CODES[0];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  const filteredCountries = COUNTRY_CODES.filter((c) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.dialCode.includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Collapsed Trigger Button - Shows ONLY dial code (and flag) as requested */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 px-3 flex items-center gap-1.5 rounded-lg bg-black/70 hover:bg-black/90 border border-white/15 hover:border-[#c5a059]/60 text-white text-xs font-mono transition-colors focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
        title={`${currentCountry.name} (${currentCountry.dialCode})`}
      >
        <span className="text-sm select-none">{currentCountry.flag}</span>
        <span className="font-semibold text-slate-100">{currentCountry.dialCode}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#e6ca85]' : ''
          }`}
        />
      </button>

      {/* Expanded Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-72 sm:w-80 max-h-80 bg-[#0d111a] border border-[#c5a059]/40 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          {/* Search Header */}
          <div className="p-2.5 border-b border-white/10 bg-black/60 sticky top-0 z-10">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country or code (+880, BD, SG)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="overflow-y-auto max-h-64 divide-y divide-white/5 p-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const isSelected = c.dialCode === currentCountry.dialCode && c.code === currentCountry.code;
                return (
                  <button
                    key={`${c.code}-${c.dialCode}`}
                    type="button"
                    onClick={() => {
                      onSelect(c.dialCode);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between rounded-lg transition-colors text-xs ${
                      isSelected
                        ? 'bg-[#c5a059]/20 text-[#e6ca85] font-semibold'
                        : 'text-slate-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base select-none">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 pl-2">
                      <span className="font-mono text-[11px] text-slate-400 font-medium">
                        {c.dialCode}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#e6ca85]" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                No matching country code found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
