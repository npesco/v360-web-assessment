'use client';

import { X, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

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

const shiftMeta = {
  morning: {
    label: 'Morning',
    start: '06:00',
    end: '14:00',
    hours: '8h',
    startPct: 25,
    widthPct: 33.3,
    accentBg: 'bg-sky-500',
    lightBg: 'bg-sky-50',
    lightText: 'text-sky-700',
    badge: 'bg-sky-100 text-sky-700',
    barColor: 'bg-sky-400',
  },
  afternoon: {
    label: 'Afternoon',
    start: '14:00',
    end: '22:00',
    hours: '8h',
    startPct: 58.3,
    widthPct: 33.3,
    accentBg: 'bg-amber-400',
    lightBg: 'bg-amber-50',
    lightText: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-700',
    barColor: 'bg-amber-400',
  },
  night: {
    label: 'Night',
    start: '22:00',
    end: '06:00',
    hours: '8h',
    startPct: 91.7,
    widthPct: 8.3,
    accentBg: 'bg-slate-500',
    lightBg: 'bg-slate-100',
    lightText: 'text-slate-600',
    badge: 'bg-slate-200 text-slate-600',
    barColor: 'bg-slate-500',
  },
};

const statusConfig = {
  scheduled: {
    label: 'Confirmed',
    Icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    dot: 'bg-emerald-400',
  },
  pending: {
    label: 'Pending Approval',
    Icon: AlertCircle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    dot: 'bg-amber-400',
  },
  unavailable: {
    label: 'Unavailable',
    Icon: AlertCircle,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    dot: 'bg-rose-400',
  },
};

const deptConfig: Record<string, { bg: string; text: string; light: string }> = {
  ER: { bg: 'bg-rose-500', text: 'text-rose-700', light: 'bg-rose-100' },
  ICU: { bg: 'bg-sky-500', text: 'text-sky-700', light: 'bg-sky-100' },
  Surgery: { bg: 'bg-violet-500', text: 'text-violet-700', light: 'bg-violet-100' },
  Pediatrics: { bg: 'bg-emerald-500', text: 'text-emerald-700', light: 'bg-emerald-100' },
};

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function getDept(dept: string) {
  return deptConfig[dept] ?? { bg: 'bg-slate-500', text: 'text-slate-700', light: 'bg-slate-100' };
}

export function ShiftDetailPanel({ shift, staff, week, onClose }: ShiftDetailPanelProps) {
  if (!shift || !staff) return null;

  const meta = shiftMeta[shift.type];
  const status = statusConfig[shift.status];
  const dept = getDept(staff.department);
  const shiftDate = week[shift.day];

  const formattedDate = shiftDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const timeLabels = ['00', '06', '12', '18', '24'];

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[380px] bg-white border-l border-slate-200 shadow-2xl shadow-slate-300/30 z-40 flex flex-col overflow-hidden">
      {/* Flat header */}
      <div className="border-b border-slate-200">
        <div className={`h-1 ${meta.accentBg}`} />
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${meta.lightBg} ${meta.lightText}`}>
                {meta.label} Shift
              </span>
              <p className="text-slate-900 text-2xl font-bold mt-2 leading-none tabular-nums">
                {meta.start} – {meta.end}
              </p>
              <p className="text-slate-400 text-xs font-medium mt-1">{meta.hours} · {formattedDate}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-700 flex-shrink-0"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Staff row */}
          <div className="flex items-center gap-2.5 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
            <div className={`w-9 h-9 rounded-full ${dept.bg} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
              {getInitials(staff.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-slate-800 font-semibold text-sm leading-none truncate">{staff.name}</p>
              <p className="text-slate-400 text-xs font-medium mt-0.5">{staff.role} · {staff.department}</p>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${status.bg} ${status.color} border ${status.border} flex-shrink-0`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              <span className="text-[10px] font-bold">{status.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-5 space-y-5">
          {/* Location */}
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
              <MapPin size={14} className="text-slate-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Location</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">{staff.department} Unit</p>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">Floor 3 · Wing B</p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Timeline</p>
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
              <div className="relative">
                {/* Background track */}
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden relative">
                  {/* Shift bar */}
                  <div
                    className={`absolute h-full rounded-full ${meta.barColor}`}
                    style={
                      shift.type === 'night'
                        ? { left: '91.7%', right: 0, width: '8.3%' }
                        : { left: `${meta.startPct}%`, width: `${meta.widthPct}%` }
                    }
                  />
                  {shift.type === 'night' && (
                    <div className={`absolute h-full rounded-full ${meta.barColor}`} style={{ left: 0, width: '25%' }} />
                  )}
                </div>

                {/* Time labels */}
                <div className="flex justify-between mt-1.5">
                  {timeLabels.map((t) => (
                    <span key={t} className="text-[9px] text-slate-400 font-medium tabular-nums">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 font-medium">Start</p>
                  <p className="text-sm font-bold text-slate-700 tabular-nums">{meta.start}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${meta.badge}`}>
                  {meta.hours}
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 font-medium">End</p>
                  <p className="text-sm font-bold text-slate-700 tabular-nums">{meta.end}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes placeholder */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Notes</p>
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 border-dashed">
              <p className="text-xs text-slate-400 font-medium italic">No notes added for this shift.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="p-5 border-t border-slate-100 bg-slate-50/60 space-y-2">
        {shift.status === 'pending' ? (
          <>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm">
              Approve Shift
            </button>
            <button className="w-full border border-rose-200 text-rose-600 hover:bg-rose-50 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors">
              Reject
            </button>
          </>
        ) : shift.status === 'unavailable' ? (
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm">
            Reassign Shift
          </button>
        ) : (
          <>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm">
              Edit Shift
            </button>
            <button className="w-full border border-slate-200 text-slate-600 hover:bg-slate-100 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors">
              Delete Shift
            </button>
          </>
        )}
      </div>
    </div>
  );
}
