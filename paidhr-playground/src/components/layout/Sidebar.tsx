import React from 'react';
import { LayoutDashboard, Users, Calendar, Settings, ChevronRight, ChevronDown, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  hasSubmenu?: boolean;
  expanded?: boolean;
}

const NavItem = ({ icon: Icon, label, active, hasSubmenu, expanded }: NavItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer group transition-colors",
        active 
          ? "bg-blue-600 text-white" 
          : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {hasSubmenu && (
        <div className="text-slate-500">
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
      )}
    </div>
  );
};

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 h-screen flex flex-col border-r border-slate-800 shrink-0">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
             P
           </div>
           <span>PaidHR</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
        
        {/* Main Menu */}
        <div className="space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" />
        </div>

        {/* Group: People */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            People
          </h3>
          <div className="space-y-1">
             <NavItem icon={Users} label="Employees" />
             <NavItem icon={Clock} label="Time & Attendance" active />
          </div>
        </div>

        {/* Group: Settings */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            System
          </h3>
          <div className="space-y-1">
             <NavItem icon={Settings} label="Settings" />
          </div>
        </div>

      </div>

      {/* Footer / User Profile could go here */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-slate-700"></div>
           <div className="text-sm">
             <div className="text-white font-medium">Admin User</div>
             <div className="text-slate-500 text-xs">admin@paidhr.com</div>
           </div>
        </div>
      </div>
    </aside>
  );
}
