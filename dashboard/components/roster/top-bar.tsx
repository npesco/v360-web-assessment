'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Download } from 'lucide-react';

interface TopBarProps {
  startDate: Date;
  onDateChange: (direction: 'prev' | 'next') => void;
  onFilterChange: (filters: Record<string, unknown>) => void;
}

export function TopBar({ startDate, onDateChange, onFilterChange }: TopBarProps) {
  const [showFilter, setShowFilter] = useState(false);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-card border-b border-border sticky top-0 z-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 py-4 sm:py-6">
        {/* Title and date navigation */}
        <div className="flex flex-col gap-2 sm:gap-0">
          <h2 className="text-xl font-bold text-foreground">Weekly Roster</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDateChange('prev')}
              className="p-1.5 hover:bg-muted rounded-lg transition-colors"
              aria-label="Previous week"
            >
              <ChevronLeft size={18} className="text-foreground" />
            </button>
            <div className="text-sm font-medium text-foreground whitespace-nowrap px-2">
              {formatDate(startDate)} — {formatDate(endDate)}
            </div>
            <button
              onClick={() => onDateChange('next')}
              className="p-1.5 hover:bg-muted rounded-lg transition-colors"
              aria-label="Next week"
            >
              <ChevronRight size={18} className="text-foreground" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-foreground text-sm font-medium"
            >
              <Filter size={16} />
              <span className="hidden sm:inline">Filters</span>
            </button>

            {showFilter && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-xl p-4 z-20">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Department
                    </label>
                    <div className="mt-2 space-y-2">
                      {['All', 'ER', 'ICU', 'Surgery', 'Pediatrics'].map((dept) => (
                        <label key={dept} className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors">
                          <input
                            type="checkbox"
                            defaultChecked={dept === 'All'}
                            className="rounded"
                          />
                          {dept}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-primary text-primary-foreground px-3 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-foreground text-sm font-medium" title="Export">
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}
