'use client';

import { Settings, Bell, Lock, User, Database, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function SettingsView() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [shiftReminders, setShiftReminders] = useState(true);
  const [pendingApprovals, setPendingApprovals] = useState(true);

  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-card p-4 sm:p-6 min-h-full max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Settings size={24} className="text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Settings</h2>
          </div>
          <p className="text-sm text-muted-foreground">Manage your preferences and account settings</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <Bell size={20} className="text-primary" />
              <h3 className="font-semibold text-foreground">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive email updates about your shifts</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="w-5 h-5 rounded border-border"
                  />
                </label>
              </div>
              <div className="h-px bg-border/50" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Shift Reminders</p>
                  <p className="text-xs text-muted-foreground">Get reminded before your scheduled shifts</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shiftReminders}
                    onChange={(e) => setShiftReminders(e.target.checked)}
                    className="w-5 h-5 rounded border-border"
                  />
                </label>
              </div>
              <div className="h-px bg-border/50" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Pending Approvals</p>
                  <p className="text-xs text-muted-foreground">Notify when new shift requests need approval</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pendingApprovals}
                    onChange={(e) => setPendingApprovals(e.target.checked)}
                    className="w-5 h-5 rounded border-border"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <User size={20} className="text-primary" />
              <h3 className="font-semibold text-foreground">Profile</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Jordan Davis"
                  className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="jordan.davis@hospital.com"
                  className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Department</label>
                <select className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Administration</option>
                  <option>ER</option>
                  <option>ICU</option>
                  <option>Surgery</option>
                  <option>Pediatrics</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <Lock size={20} className="text-primary" />
              <h3 className="font-semibold text-foreground">Security</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 text-sm font-medium border border-border rounded-lg text-foreground hover:bg-muted transition-colors">
                Change Password
              </button>
              <button className="w-full px-4 py-2 text-sm font-medium border border-border rounded-lg text-foreground hover:bg-muted transition-colors">
                Two-Factor Authentication
              </button>
            </div>
          </div>

          {/* Data Management */}
          <div className="border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <Database size={20} className="text-primary" />
              <h3 className="font-semibold text-foreground">Data</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 text-sm font-medium border border-border rounded-lg text-foreground hover:bg-muted transition-colors">
                Export My Data
              </button>
              <button className="w-full px-4 py-2 text-sm font-medium border border-destructive text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                Delete Account
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border-2 border-destructive/30 bg-destructive/5 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  These actions cannot be undone. Please proceed with caution.
                </p>
                <button className="px-4 py-2 text-sm font-medium border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-colors">
                  Deactivate Account
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              Save Changes
            </button>
            <button className="flex-1 px-4 py-2.5 text-sm font-semibold border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
