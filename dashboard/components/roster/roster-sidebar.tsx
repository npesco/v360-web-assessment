'use client';

import { Calendar, Users, BarChart3, Settings, Menu, X, Bell, HouseHeart, TrendingUp } from 'lucide-react';
import { useState } from 'react';

type TabType = 'schedule' | 'staff' | 'analytics' | 'settings';

interface RosterSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const navItems = [
  { id: 'schedule' as TabType, icon: Calendar, label: 'Schedule', badge: 3 },
  { id: 'staff' as TabType, icon: Users, label: 'Staff' },
  { id: 'analytics' as TabType, icon: BarChart3, label: 'Analytics' },
  { id: 'settings' as TabType, icon: Settings, label: 'Settings' },
];

const quickStats = [
  { label: 'Shifts', value: '28', colorClass: 'text-teal-400' },
  { label: 'Pending', value: '3', colorClass: 'text-amber-400' },
  { label: 'Staff', value: '8', colorClass: 'text-emerald-400' },
  { label: 'Open', value: '2', colorClass: 'text-rose-400' },
];

export function RosterSidebar({ activeTab, onTabChange }: RosterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 sm:hidden p-2 bg-slate-900 text-white rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <aside
        className={`
          fixed sm:relative left-0 top-0 h-screen w-64
          bg-slate-900 border-r border-slate-800/80
          flex flex-col
          transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-5 flex items-center gap-3 border-b border-slate-800/80">
          <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center flex-shrink-0">
            <HouseHeart size={17} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-base leading-none">WellCare</h1>
            <p className="text-slate-400 text-xs mt-0.5 font-medium">Rostering Suite</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-0.5 px-3 pt-5">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">
            Main Menu
          </p>
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onTabChange(item.id); setIsOpen(false); }}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all w-full group
                  ${active
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }
                `}
              >
                <item.icon
                  size={16}
                  className={active ? 'text-white' : 'text-slate-500 group-hover:text-slate-300 transition-colors'}
                />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge ? (
                  <span className={`
                    text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none
                    ${active ? 'bg-white/20 text-white' : 'bg-amber-500/20 text-amber-400'}
                  `}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Quick stats */}
        <div className="px-4 py-4 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 mb-3">
            <TrendingUp size={11} className="text-slate-500" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">This Week</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quickStats.map((s) => (
              <div key={s.label} className="bg-slate-800/70 rounded-xl px-3 py-2.5">
                <p className={`text-lg font-bold leading-none ${s.colorClass}`}>{s.value}</p>
                <p className="text-slate-500 text-[11px] mt-0.5 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* User */}
        <div className="px-4 py-4 border-t border-slate-800/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-teal-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-100 text-sm font-semibold leading-none">John Doe</p>
            <p className="text-slate-500 text-xs mt-0.5 font-medium">Roster Manager</p>
          </div>
          <button className="relative p-1.5 rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0">
            <Bell size={15} className="text-slate-400" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-500 rounded-full ring-1 ring-slate-900" />
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
