'use client';

import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';

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

interface AnalyticsViewProps {
  staff: Staff[];
  shifts: Shift[];
}

export function AnalyticsView({ staff, shifts }: AnalyticsViewProps) {
  // Calculate stats
  const totalShifts = shifts.length;
  const scheduledShifts = shifts.filter((s) => s.status === 'scheduled').length;
  const pendingShifts = shifts.filter((s) => s.status === 'pending').length;
  const unavailableShifts = shifts.filter((s) => s.status === 'unavailable').length;

  const staffWithMostShifts = staff
    .map((s) => ({
      ...s,
      count: shifts.filter((sh) => sh.staffId === s.id).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const shiftTypeStats = {
    morning: shifts.filter((s) => s.type === 'morning').length,
    afternoon: shifts.filter((s) => s.type === 'afternoon').length,
    night: shifts.filter((s) => s.type === 'night').length,
  };

  const departmentStats = staff.reduce(
    (acc, s) => {
      const dept = s.department;
      if (!acc[dept]) {
        acc[dept] = { count: 0, shifts: 0 };
      }
      acc[dept].count++;
      acc[dept].shifts += shifts.filter((sh) => sh.staffId === s.id).length;
      return acc;
    },
    {} as Record<string, { count: number; shifts: number }>
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-card p-4 sm:p-6 min-h-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 size={24} className="text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
          </div>
          <p className="text-sm text-muted-foreground">Weekly rostering statistics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-muted/40 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase">Total Shifts</p>
                <p className="text-2xl font-bold text-foreground mt-1">{totalShifts}</p>
              </div>
              <Clock className="text-primary opacity-20" size={32} />
            </div>
          </div>

          <div className="bg-muted/40 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase">Scheduled</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{scheduledShifts}</p>
              </div>
              <TrendingUp className="text-green-600 opacity-20" size={32} />
            </div>
          </div>

          <div className="bg-muted/40 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase">Pending</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{pendingShifts}</p>
              </div>
              <Clock className="text-amber-600 opacity-20" size={32} />
            </div>
          </div>

          <div className="bg-muted/40 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase">Unavailable</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{unavailableShifts}</p>
              </div>
              <Users className="text-red-600 opacity-20" size={32} />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shift Type Distribution */}
          <div className="bg-muted/40 border border-border rounded-lg p-5">
            <h3 className="font-semibold text-foreground mb-4">Shifts by Type</h3>
            <div className="space-y-3">
              {Object.entries(shiftTypeStats).map(([type, count]) => {
                const total = totalShifts;
                const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground capitalize">{type}</span>
                      <span className="text-sm text-muted-foreground">{count} shifts</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          type === 'morning'
                            ? 'bg-sky-500'
                            : type === 'afternoon'
                              ? 'bg-orange-500'
                              : 'bg-slate-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Staff by Shifts */}
          <div className="bg-muted/40 border border-border rounded-lg p-5">
            <h3 className="font-semibold text-foreground mb-4">Most Scheduled Staff</h3>
            <div className="space-y-3">
              {staffWithMostShifts.map((person, idx) => (
                <div key={person.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-semibold text-muted-foreground">{idx + 1}</span>
                    <span className="text-sm font-medium text-foreground truncate">{person.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">{person.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Stats */}
        <div className="mt-6 bg-muted/40 border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground mb-4">Department Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(departmentStats).map(([dept, stats]) => (
              <div key={dept} className="bg-card rounded-lg p-3 border border-border/50">
                <p className="text-xs text-muted-foreground font-semibold mb-2">{dept}</p>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-foreground">{stats.count}</p>
                  <p className="text-xs text-muted-foreground">{stats.shifts} shifts assigned</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
