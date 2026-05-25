'use client';

import { useState, useMemo } from 'react';
import { RosterSidebar } from '@/components/roster/roster-sidebar';
import { ScheduleView } from '@/components/roster/views/schedule-view';
import { StaffView } from '@/components/roster/views/staff-view';
import { AnalyticsView } from '@/components/roster/views/analytics-view';
import { SettingsView } from '@/components/roster/views/settings-view';

type TabType = 'schedule' | 'staff' | 'analytics' | 'settings';

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

// Mock data
const mockStaff: Staff[] = [
  { id: '1', name: 'Dr. Sarah Johnson', role: 'Nurse', department: 'ER' },
  { id: '2', name: 'Dr. Michael Chen', role: 'Doctor', department: 'ICU' },
  { id: '3', name: 'Emma Wilson', role: 'Nurse', department: 'ER' },
  { id: '4', name: 'James Rodriguez', role: 'Technician', department: 'Surgery' },
  { id: '5', name: 'Dr. Lisa Anderson', role: 'Doctor', department: 'Pediatrics' },
  { id: '6', name: 'David Thompson', role: 'Nurse', department: 'ICU' },
  { id: '7', name: 'Sophie Martin', role: 'Nurse', department: 'ER' },
  { id: '8', name: 'Dr. Robert White', role: 'Doctor', department: 'Surgery' },
];

const mockShifts: Shift[] = [
  // Sarah Johnson (ER)
  { id: '1', staffId: '1', day: 0, type: 'morning', status: 'scheduled' },
  { id: '2', staffId: '1', day: 2, type: 'afternoon', status: 'scheduled' },
  { id: '3', staffId: '1', day: 4, type: 'morning', status: 'pending' },
  { id: '4', staffId: '1', day: 6, type: 'night', status: 'scheduled' },

  // Michael Chen (ICU)
  { id: '5', staffId: '2', day: 0, type: 'afternoon', status: 'scheduled' },
  { id: '6', staffId: '2', day: 1, type: 'afternoon', status: 'scheduled' },
  { id: '7', staffId: '2', day: 3, type: 'morning', status: 'scheduled' },
  { id: '8', staffId: '2', day: 5, type: 'night', status: 'pending' },

  // Emma Wilson (ER)
  { id: '9', staffId: '3', day: 1, type: 'morning', status: 'scheduled' },
  { id: '10', staffId: '3', day: 3, type: 'afternoon', status: 'scheduled' },
  { id: '11', staffId: '3', day: 5, type: 'morning', status: 'scheduled' },

  // James Rodriguez (Surgery)
  { id: '12', staffId: '4', day: 0, type: 'night', status: 'scheduled' },
  { id: '13', staffId: '4', day: 2, type: 'morning', status: 'unavailable' },
  { id: '14', staffId: '4', day: 4, type: 'afternoon', status: 'scheduled' },

  // Lisa Anderson (Pediatrics)
  { id: '15', staffId: '5', day: 1, type: 'night', status: 'scheduled' },
  { id: '16', staffId: '5', day: 3, type: 'night', status: 'scheduled' },
  { id: '17', staffId: '5', day: 5, type: 'afternoon', status: 'scheduled' },

  // David Thompson (ICU)
  { id: '18', staffId: '6', day: 0, type: 'morning', status: 'scheduled' },
  { id: '19', staffId: '6', day: 2, type: 'night', status: 'pending' },
  { id: '20', staffId: '6', day: 4, type: 'morning', status: 'scheduled' },

  // Sophie Martin (ER)
  { id: '21', staffId: '7', day: 1, type: 'afternoon', status: 'scheduled' },
  { id: '22', staffId: '7', day: 3, type: 'morning', status: 'scheduled' },
  { id: '23', staffId: '7', day: 5, type: 'night', status: 'scheduled' },
  { id: '24', staffId: '7', day: 6, type: 'afternoon', status: 'pending' },

  // Robert White (Surgery)
  { id: '25', staffId: '8', day: 0, type: 'afternoon', status: 'scheduled' },
  { id: '26', staffId: '8', day: 2, type: 'afternoon', status: 'scheduled' },
  { id: '27', staffId: '8', day: 4, type: 'morning', status: 'scheduled' },
  { id: '28', staffId: '8', day: 6, type: 'morning', status: 'pending' },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabType>('schedule');

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <RosterSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Render active tab view */}
        {activeTab === 'schedule' && (
          <ScheduleView staff={mockStaff} shifts={mockShifts} />
        )}
        {activeTab === 'staff' && (
          <StaffView staff={mockStaff} />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsView staff={mockStaff} shifts={mockShifts} />
        )}
        {activeTab === 'settings' && (
          <SettingsView />
        )}
      </div>
    </div>
  );
}
