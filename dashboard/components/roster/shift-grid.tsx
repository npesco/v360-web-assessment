'use client';

import { useState } from 'react';
import { ShiftCell } from './shift-cell';

interface Shift {
  id: string;
  staffId: string;
  day: number;
  type: 'morning' | 'afternoon' | 'night';
  status: 'scheduled' | 'pending' | 'unavailable';
}

interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
}

interface ShiftGridProps {
  staff: Staff[];
  shifts: Shift[];
  week: Date[];
  onShiftClick: (shift: Shift, staff: Staff) => void;
}

export function ShiftGrid({ staff, shifts, week, onShiftClick }: ShiftGridProps) {
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDayDate = (date: Date) => {
    return date.getDate();
  };

  const getShiftForStaffDay = (staffId: string, dayIndex: number): Shift | undefined => {
    return shifts.find((s) => s.staffId === staffId && s.day === dayIndex);
  };

  const shiftColors = {
    morning: 'bg-sky-50 border-sky-200 dark:bg-sky-950/30 dark:border-sky-900',
    afternoon: 'bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-900',
    night: 'bg-slate-100 border-slate-300 dark:bg-slate-900/40 dark:border-slate-800',
  };

  const shiftBadgeColors = {
    morning: 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-200',
    afternoon: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-200',
    night: 'bg-slate-200 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300',
  };

  return (
    <div className="bg-card overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Header */}
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="w-48 px-4 sm:px-6 py-4 text-left sticky left-0 bg-muted/40 z-20">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Staff</p>
            </th>
            {week.map((date, idx) => (
              <th
                key={idx}
                className="min-w-[120px] sm:min-w-[140px] px-2 sm:px-4 py-4 text-center border-l border-border"
              >
                <p className="text-xs sm:text-sm font-semibold text-foreground">{getDayName(date)}</p>
                <p className="text-xs text-muted-foreground mt-1">{getDayDate(date)}</p>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {staff.map((person) => (
            <tr key={person.id} className="border-b border-border hover:bg-muted/30 transition-colors">
              {/* Staff info */}
              <td className="px-4 sm:px-6 py-4 sticky left-0 bg-card z-10 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary flex items-center justify-center rounded-lg flex-shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-primary-foreground">
                      {person.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-foreground truncate">{person.name}</p>
                    <p className="text-xs text-muted-foreground">{person.role}</p>
                  </div>
                </div>
              </td>

              {/* Shifts for each day */}
              {week.map((_, dayIdx) => {
                const shift = getShiftForStaffDay(person.id, dayIdx);

                return (
                  <td
                    key={dayIdx}
                    className="px-2 sm:px-4 py-3 sm:py-4 border-l border-border"
                  >
                    {shift ? (
                      <div
                        className={`
                          p-2 sm:p-3 rounded border-2 cursor-pointer transition-all
                          ${shiftColors[shift.type]}
                          ${
                            shift.status === 'pending'
                              ? 'opacity-70'
                              : shift.status === 'unavailable'
                                ? 'opacity-40'
                                : ''
                          }
                          hover:shadow-md hover:scale-105
                        `}
                        onClick={() => onShiftClick(shift, person)}
                      >
                        <div className="flex flex-col gap-1">
                          <span
                            className={`
                              inline-block text-xs font-semibold px-1.5 py-0.5 rounded
                              ${shiftBadgeColors[shift.type]}
                              w-fit
                            `}
                          >
                            {shift.type.charAt(0).toUpperCase() + shift.type.slice(1)}
                          </span>
                          <span className="text-xs text-foreground font-medium">
                            {shift.type === 'morning'
                              ? '6–14'
                              : shift.type === 'afternoon'
                                ? '14–22'
                                : '22–6'}
                          </span>
                          {shift.status === 'pending' && (
                            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                              Pending
                            </span>
                          )}
                          {shift.status === 'unavailable' && (
                            <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                              N/A
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2 sm:p-3 rounded border-2 border-dashed border-border/40 hover:border-border/70 transition-colors cursor-pointer text-center">
                        <p className="text-sm text-muted-foreground/60">—</p>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
