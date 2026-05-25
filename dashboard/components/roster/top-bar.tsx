'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Download, Plus, CalendarDays } from 'lucide-react';

interface TopBarProps {
  startDate: Date;
  onDateChange: (direction: 'prev' | 'next') => void;
  onFilterChange: (filters: Record<string, unknown>) => void;
  onGoToToday?: () => void;
}

const departments = ['All', 'ER', 'ICU', 'Surgery', 'Pediatrics'];
const deptDotColors: Record<string, string> = {
  ER: 'bg-rose-400',
  ICU: 'bg-sky-400',
  Surgery: 'bg-violet-400',
  Pediatrics: 'bg-emerald-400',
};

function getWeekNumber(date: Date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export function TopBar({ startDate, onDateChange, onGoToToday }: TopBarProps) {
  const [showFilter, setShowFilter] = useState(false);
  const [activeDepts, setActiveDepts] = useState<string[]>(['All']);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  const today = new Date();
  const isCurrentWeek = today >= startDate && today <= endDate;

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const toggleDept = (dept: string) => {
    if (dept === 'All') {
      setActiveDepts(['All']);
      return;
    }
    const without = activeDepts.filter((d) => d !== 'All');
    const next = without.includes(dept) ? without.filter((d) => d !== dept) : [...without, dept];
    setActiveDepts(next.length ? next : ['All']);
  };

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      {/* Primary row */}
      <div className="flex items-center gap-4 px-6 py-3.5">
        {/* Left: title + date navigation */}
        <div className="flex items-center gap-4 min-w-0">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 leading-none">Weekly Schedule</h2>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full leading-none">
                W{getWeekNumber(startDate)}
              </span>
              {isCurrentWeek && (
                <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded-full leading-none border border-teal-100">
                  Current
                </span>
              )}
            </div>
            <div className="flex items-center gap-0.5 mt-1.5">
              <button
                onClick={() => onDateChange('prev')}
                className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-400 hover:text-slate-700"
                aria-label="Previous week"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-sm font-medium text-slate-600 px-1 tabular-nums">
                {fmt(startDate)} — {fmt(endDate)}, {endDate.getFullYear()}
              </span>
              <button
                onClick={() => onDateChange('next')}
                className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-400 hover:text-slate-700"
                aria-label="Next week"
              >
                <ChevronRight size={14} />
              </button>
              {!isCurrentWeek && onGoToToday && (
                <button
                  onClick={onGoToToday}
                  className="ml-1 text-xs font-semibold text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 px-2 py-0.5 rounded-full transition-colors"
                >
                  Today
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Center: stats pills */}
        <div className="hidden lg:flex items-center gap-2 flex-1 justify-center">
          {[
            { label: 'Scheduled', value: 25, bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400' },
            { label: 'Pending', value: 3, bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
            { label: 'Open slots', value: 2, bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-400' },
          ].map((s) => (
            <div
              key={s.label}
              className={`flex items-center gap-1.5 pl-2 pr-3 py-1.5 rounded-full text-xs font-semibold ${s.bg} ${s.text} border border-transparent`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot} flex-shrink-0`} />
              <span className="font-bold tabular-nums">{s.value}</span>
              <span className="font-medium opacity-80">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto lg:ml-0">
          {/* Filter */}
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`
                flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-all
                ${showFilter
                  ? 'border-teal-300 bg-teal-50 text-teal-700'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                }
              `}
            >
              <SlidersHorizontal size={13} />
              <span className="hidden sm:inline">Filter</span>
            </button>

            {showFilter && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 p-4 z-20">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Department</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {departments.map((dept) => {
                    const active = activeDepts.includes(dept);
                    return (
                      <button
                        key={dept}
                        onClick={() => toggleDept(dept)}
                        className={`
                          flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all
                          ${active
                            ? 'bg-teal-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }
                        `}
                      >
                        {dept !== 'All' && (
                          <span className={`w-1.5 h-1.5 rounded-full ${deptDotColors[dept]}`} />
                        )}
                        {dept}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Shift Type</p>
                <div className="flex gap-1.5 mb-4">
                  {['Morning', 'Afternoon', 'Night'].map((type) => (
                    <button
                      key={type}
                      className="flex-1 px-2 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <button className="w-full bg-teal-600 text-white px-3 py-2 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors shadow-sm">
                  Apply Filters
                </button>
              </div>
            )}
          </div>

          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-600 text-sm font-medium">
            <Download size={13} />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors text-white text-sm font-semibold shadow-sm shadow-teal-200">
            <Plus size={14} />
            <span className="hidden sm:inline">Add Shift</span>
          </button>
        </div>
      </div>

      {/* Secondary row: dept quick filter */}
      <div className="flex items-center gap-2 px-6 py-2 border-t border-slate-100 bg-slate-50/60">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mr-0.5">Dept</span>
        {departments.filter((d) => d !== 'All').map((dept) => (
          <button
            key={dept}
            className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-all bg-white"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${deptDotColors[dept]} flex-shrink-0`} />
            {dept}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 text-[11px] text-slate-400 font-medium">
          <CalendarDays size={11} />
          <span>Week view</span>
        </div>
      </div>
    </div>
  );
}
