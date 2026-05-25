'use client';

import { Users, Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
}

interface StaffViewProps {
  staff: Staff[];
}

export function StaffView({ staff }: StaffViewProps) {
  const departments = Array.from(new Set(staff.map((s) => s.department)));

  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-card p-4 sm:p-6 min-h-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Users size={24} className="text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Staff Directory</h2>
          </div>
          <p className="text-sm text-muted-foreground">{staff.length} staff members</p>
        </div>

        {/* By Department */}
        <div className="space-y-8">
          {departments.map((dept) => {
            const deptStaff = staff.filter((s) => s.department === dept);
            return (
              <div key={dept}>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                  {dept} Department
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {deptStaff.map((person) => (
                    <div
                      key={person.id}
                      className="bg-muted/40 rounded-lg p-4 hover:shadow-md transition-shadow border border-border"
                    >
                      {/* Avatar */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-lg flex-shrink-0">
                          <span className="text-sm font-bold text-primary-foreground">
                            {person.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-foreground truncate">{person.name}</p>
                          <p className="text-xs text-muted-foreground">{person.role}</p>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin size={14} />
                          <span>{person.department}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar size={14} />
                          <span>View Schedule</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <button className="w-full mt-4 px-3 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
