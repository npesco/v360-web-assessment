'use client';

import { X, Clock, MapPin, AlertCircle, CheckCircle2, User } from 'lucide-react';

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

interface ShiftDetailPanelProps {
  shift: Shift | null;
  staff: Staff | null;
  week: Date[];
  onClose: () => void;
}

export function ShiftDetailPanel({ shift, staff, week, onClose }: ShiftDetailPanelProps) {
  if (!shift || !staff) return null;

  const shiftDate = week[shift.day];
  const formattedDate = shiftDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const shiftTimes = {
    morning: { start: '6:00 AM', end: '2:00 PM', icon: '🌅' },
    afternoon: { start: '2:00 PM', end: '10:00 PM', icon: '☀️' },
    night: { start: '10:00 PM', end: '6:00 AM', icon: '🌙' },
  };

  const times = shiftTimes[shift.type];

  const statusConfig = {
    scheduled: {
      label: 'Scheduled',
      icon: CheckCircle2,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
    },
    pending: {
      label: 'Pending',
      icon: AlertCircle,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    },
    unavailable: {
      label: 'Unavailable',
      icon: AlertCircle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950/30',
    },
  };

  const status = statusConfig[shift.status];
  const StatusIcon = status.icon;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-card border-l border-border shadow-2xl z-40 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-muted/30">
        <h2 className="text-lg font-bold text-foreground">Shift Details</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Close"
        >
          <X size={20} className="text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          {/* Staff Info */}
          <div className="bg-muted/40 rounded-lg p-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3 tracking-wide">
              Staff Member
            </h3>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-lg flex-shrink-0">
                <span className="text-sm font-bold text-primary-foreground">
                  {staff.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{staff.name}</p>
                <p className="text-xs text-muted-foreground">{staff.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{staff.department}</p>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Shift Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-lg">
                <Clock size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-lg">
                <Clock size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-sm font-medium text-foreground">
                    {times.start} – {times.end}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-lg">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">{staff.department}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className={`p-4 rounded-lg ${status.bgColor}`}>
            <div className="flex items-center gap-2">
              <StatusIcon size={18} className={status.color} />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</p>
                <p className={`text-sm font-bold ${status.color}`}>{status.label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 sm:p-6 border-t border-border space-y-2 bg-muted/30">
        {shift.status === 'pending' ? (
          <>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors">
              Approve Shift
            </button>
            <button className="w-full bg-destructive hover:opacity-90 text-destructive-foreground px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors">
              Reject
            </button>
          </>
        ) : shift.status === 'unavailable' ? (
          <button className="w-full bg-primary hover:opacity-90 text-primary-foreground px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors">
            Reassign Shift
          </button>
        ) : (
          <>
            <button className="w-full bg-primary hover:opacity-90 text-primary-foreground px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors">
              Edit Shift
            </button>
            <button className="w-full border border-destructive text-destructive hover:bg-destructive/10 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors">
              Delete Shift
            </button>
          </>
        )}
      </div>
    </div>
  );
}
