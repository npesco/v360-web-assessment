'use client';

import { useState, useMemo } from 'react';
import { TopBar } from '../top-bar';
import { ShiftGrid } from '../shift-grid';
import { ShiftDetailPanel } from '../shift-detail-panel';

interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
}

interface Shift {
  id: string;
  staffId: string;
  day: number;
  type: 'morning' | 'afternoon' | 'night';
  status: 'scheduled' | 'pending' | 'unavailable';
}

interface ScheduleViewProps {
  staff: Staff[];
  shifts: Shift[];
}

export function ScheduleView({ staff, shifts }: ScheduleViewProps) {
  const [startDate, setStartDate] = useState<Date>(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day;
    return new Date(today.setDate(diff));
  });

  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const week = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      return date;
    });
  }, [startDate]);

  const handleDateChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setStartDate(newDate);
  };

  const handleShiftClick = (shift: Shift, staffMember: Staff) => {
    setSelectedShift(shift);
    setSelectedStaff(staffMember);
  };

  const handlePanelClose = () => {
    setSelectedShift(null);
    setSelectedStaff(null);
  };

  const handleGoToToday = () => {
    const now = new Date();
    const diff = now.getDate() - now.getDay();
    setStartDate(new Date(now.getFullYear(), now.getMonth(), diff));
  };

  return (
    <>
      <TopBar startDate={startDate} onDateChange={handleDateChange} onFilterChange={() => {}} onGoToToday={handleGoToToday} />
      <div className="flex-1 overflow-auto">
        <ShiftGrid
          staff={staff}
          shifts={shifts}
          week={week}
          onShiftClick={handleShiftClick}
        />
      </div>

      {selectedShift && (
        <ShiftDetailPanel
          shift={selectedShift}
          staff={selectedStaff}
          week={week}
          onClose={handlePanelClose}
        />
      )}

      {selectedShift && (
        <div
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          onClick={handlePanelClose}
        />
      )}
    </>
  );
}
