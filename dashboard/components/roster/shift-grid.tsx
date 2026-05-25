'use client';

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

const shiftConfig = {
  morning: {
    bg: 'bg-sky-50',
    border: 'border-l-sky-400',
    badge: 'bg-sky-100 text-sky-700',
    timeColor: 'text-sky-900',
    subColor: 'text-sky-600',
    label: 'Morning',
    time: '06:00–14:00',
  },
  afternoon: {
    bg: 'bg-amber-50',
    border: 'border-l-amber-400',
    badge: 'bg-amber-100 text-amber-700',
    timeColor: 'text-amber-900',
    subColor: 'text-amber-500',
    label: 'Afternoon',
    time: '14:00–22:00',
  },
  night: {
    bg: 'bg-slate-100',
    border: 'border-l-slate-400',
    badge: 'bg-slate-200 text-slate-600',
    timeColor: 'text-slate-800',
    subColor: 'text-slate-500',
    label: 'Night',
    time: '22:00–06:00',
  },
};

const statusDot: Record<string, string> = {
  scheduled: 'bg-emerald-400',
  pending: 'bg-amber-400',
  unavailable: 'bg-rose-400',
};

const deptConfig: Record<string, { bg: string; light: string; text: string }> = {
  ER: { bg: 'bg-rose-500', light: 'bg-rose-100', text: 'text-rose-700' },
  ICU: { bg: 'bg-sky-500', light: 'bg-sky-100', text: 'text-sky-700' },
  Surgery: { bg: 'bg-violet-500', light: 'bg-violet-100', text: 'text-violet-700' },
  Pediatrics: { bg: 'bg-emerald-500', light: 'bg-emerald-100', text: 'text-emerald-700' },
};

function getDeptConfig(dept: string) {
  return deptConfig[dept] ?? { bg: 'bg-slate-500', light: 'bg-slate-100', text: 'text-slate-700' };
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function isToday(date: Date) {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

export function ShiftGrid({ staff, shifts, week, onShiftClick }: ShiftGridProps) {
  const getShift = (staffId: string, dayIdx: number) =>
    shifts.find((s) => s.staffId === staffId && s.day === dayIdx);

  const weeklyShiftCount = (staffId: string) =>
    shifts.filter((s) => s.staffId === staffId).length;

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-card overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-200">
            {/* Staff column header */}
            <th className="w-52 px-5 py-3.5 text-left sticky left-0 bg-white z-20 border-r border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Staff · {staff.length}
              </span>
            </th>

            {week.map((date, idx) => {
              const today = isToday(date);
              return (
                <th
                  key={idx}
                  className={`min-w-[130px] px-3 py-3.5 text-center border-l border-slate-100 ${
                    today ? 'bg-teal-50' : ''
                  }`}
                >
                  <p className={`text-xs font-bold ${today ? 'text-teal-600' : 'text-slate-400'}`}>
                    {dayNames[date.getDay()]}
                  </p>
                  <p
                    className={`
                      text-sm font-bold mt-0.5 w-7 h-7 flex items-center justify-center rounded-full mx-auto
                      ${today
                        ? 'bg-teal-600 text-white'
                        : 'text-slate-700'
                      }
                    `}
                  >
                    {date.getDate()}
                  </p>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {staff.map((person, rowIdx) => {
            const dept = getDeptConfig(person.department);
            const shiftCount = weeklyShiftCount(person.id);

            return (
              <tr
                key={person.id}
                className={`border-b border-slate-100 transition-colors hover:bg-slate-50/60 ${
                  rowIdx % 2 === 0 ? '' : 'bg-slate-50/30'
                }`}
              >
                {/* Staff info */}
                <td className={`
                  px-5 py-3.5 sticky left-0 z-10 border-r border-slate-100
                  ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}
                  hover:bg-slate-50 transition-colors
                `}>
                  <div className="flex items-center gap-2.5">
                    <div className={`
                      w-9 h-9 rounded-full ${dept.bg}
                      flex items-center justify-center flex-shrink-0
                      shadow-sm text-white text-xs font-bold
                    `}>
                      {getInitials(person.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate leading-none">{person.name}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-slate-400 font-medium">{person.role}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${dept.light} ${dept.text} leading-none`}>
                          {person.department}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 ml-0.5">
                    <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-300 rounded-full"
                        style={{ width: `${Math.min((shiftCount / 5) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium tabular-nums flex-shrink-0">
                      {shiftCount * 8}h
                    </span>
                  </div>
                </td>

                {/* Day cells */}
                {week.map((date, dayIdx) => {
                  const shift = getShift(person.id, dayIdx);
                  const today = isToday(date);
                  const cfg = shift ? shiftConfig[shift.type] : null;

                  return (
                    <td
                      key={dayIdx}
                      className={`px-2.5 py-2.5 border-l border-slate-100 ${today ? 'bg-teal-50/40' : ''}`}
                    >
                      {shift && cfg ? (
                        <div
                          onClick={() => onShiftClick(shift, person)}
                          className={`
                            rounded-lg cursor-pointer border-l-4 ${cfg.border} ${cfg.bg}
                            px-2.5 py-2 relative
                            transition-all duration-150
                            hover:shadow-md hover:-translate-y-0.5 hover:brightness-95
                            ${shift.status === 'unavailable' ? 'opacity-50' : ''}
                            ${shift.status === 'pending' ? 'opacity-80' : ''}
                          `}
                        >
                          {/* Status dot */}
                          <span className={`
                            absolute top-2 right-2 w-1.5 h-1.5 rounded-full
                            ${statusDot[shift.status]}
                          `} />

                          <span className={`
                            inline-block text-[9px] font-bold uppercase tracking-wide
                            px-1.5 py-0.5 rounded-full ${cfg.badge} leading-none mb-1.5
                          `}>
                            {cfg.label}
                          </span>
                          <p className={`text-xs font-bold ${cfg.timeColor} tabular-nums leading-none`}>
                            {cfg.time}
                          </p>
                          {shift.status === 'pending' && (
                            <p className="text-[10px] font-semibold text-amber-600 mt-1 leading-none">Pending</p>
                          )}
                          {shift.status === 'unavailable' && (
                            <p className="text-[10px] font-semibold text-rose-500 mt-1 leading-none">N/A</p>
                          )}
                        </div>
                      ) : (
                        <div className="
                          rounded-lg border border-dashed border-slate-200 hover:border-teal-300
                          hover:bg-teal-50/40 transition-all duration-150 cursor-pointer
                          px-2.5 py-2 flex items-center justify-center h-[62px] group
                        ">
                          <span className="text-xl leading-none text-slate-200 group-hover:text-teal-400 transition-colors select-none">
                            +
                          </span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>

        {/* Coverage footer */}
        <tfoot>
          <tr className="border-t-2 border-slate-200 bg-slate-50">
            <td className="px-5 py-3 sticky left-0 bg-slate-50 z-10 border-r border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Coverage</span>
            </td>
            {week.map((_, dayIdx) => {
              const count = shifts.filter((s) => s.day === dayIdx && s.status === 'scheduled').length;
              const total = staff.length;
              const pct = Math.round((count / total) * 100);
              const color = pct >= 75 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-rose-500';
              return (
                <td key={dayIdx} className="px-2.5 py-3 border-l border-slate-200 text-center">
                  <p className={`text-sm font-bold tabular-nums ${color}`}>{count}/{total}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{pct}%</p>
                </td>
              );
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
