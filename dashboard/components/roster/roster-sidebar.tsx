'use client';

import { Calendar, Users, BarChart3, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';

type TabType = 'schedule' | 'staff' | 'analytics' | 'settings';

interface RosterSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function RosterSidebar({ activeTab, onTabChange }: RosterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'schedule' as TabType, icon: Calendar, label: 'Schedule' },
    { id: 'staff' as TabType, icon: Users, label: 'Staff' },
    { id: 'analytics' as TabType, icon: BarChart3, label: 'Analytics' },
    { id: 'settings' as TabType, icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 sm:hidden p-2 hover:bg-muted rounded-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed sm:relative left-0 top-0 h-screen w-20 sm:w-64
          bg-sidebar border-r border-sidebar-border
          flex flex-col items-center sm:items-start
          transition-all duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="w-full px-4 py-6 flex items-center justify-center sm:justify-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Calendar size={20} className="text-primary-foreground" />
          </div>
          <h1 className="hidden sm:block font-bold text-foreground text-lg">RosterPro</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 w-full px-2 sm:px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setIsOpen(false);
              }}
              className={`
                flex items-center justify-center sm:justify-start gap-3 px-3 sm:px-4 py-3 rounded-lg text-sm font-medium
                transition-all w-12 sm:w-full
                ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
              title={item.label}
            >
              <item.icon size={20} />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User avatar */}
        <div className="w-full px-2 sm:px-4 py-6 border-t border-sidebar-border">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold cursor-pointer hover:opacity-80 transition-opacity mx-auto sm:mx-0">
            JD
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
