"use client";

import React, { useState } from 'react';
import { 
  SquaresFour, 
  Users, 
  HandCoins, 
  Wallet, 
  ChartLineUp, 
  Clock, 
  CheckSquare, 
  FileText, 
  ChartPieSlice, 
  Buildings, 
  Question, 
  Headset, 
  Gear, 
  ShieldCheck,
  CaretDown,
  CaretRight
} from '@phosphor-icons/react';
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
        "flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer group transition-all duration-200",
        active 
          ? "bg-blue-600/20 text-white" 
          : "text-blue-100/70 hover:bg-white/10 hover:text-white"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} weight={active ? "fill" : "regular"} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {hasSubmenu && (
        <div className="text-blue-200/50">
          {expanded ? <CaretDown size={14} weight="bold" /> : <CaretRight size={14} weight="bold" />}
        </div>
      )}
    </div>
  );
};

const SidebarLogo = () => (
  <div className="p-6 mb-2">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
      </div>
      <span className="text-xl font-bold tracking-tight">PaidHR</span>
    </div>
  </div>
);

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState('Time & Attendance');

  return (
    <aside className="w-64 bg-[#0052EA] text-white flex flex-col h-screen fixed left-0 top-0 z-50 overflow-y-auto scrollbar-hide">
      {/* Logo Area */}
      <SidebarLogo />

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-6">
        
        {/* Main Dashboard */}
        <div>
          <NavItem icon={SquaresFour} label="Dashboard" />
        </div>

        {/* PEOPLE Section */}
        <div>
          <div className="px-4 mb-2 text-xs font-semibold text-blue-200/50 tracking-wider">PEOPLE</div>
          <div className="space-y-1">
            <NavItem icon={Users} label="People" hasSubmenu />
            <NavItem icon={Users} label="Hiring" hasSubmenu />
            <NavItem icon={FileText} label="Request" />
            <NavItem icon={HandCoins} label="Benefits" />
            <NavItem icon={FileText} label="Claims" />
          </div>
        </div>

        {/* COMPENSATION Section */}
        <div>
          <div className="px-4 mb-2 text-xs font-semibold text-blue-200/50 tracking-wider">COMPENSATION</div>
          <div className="space-y-1">
            <NavItem icon={HandCoins} label="Payroll" />
            <NavItem icon={Wallet} label="Wallets" />
            <NavItem icon={HandCoins} label="Earn wage access" hasSubmenu />
          </div>
        </div>

        {/* PRODUCTIVITY Section */}
        <div>
          <div className="px-4 mb-2 text-xs font-semibold text-blue-200/50 tracking-wider">PRODUCTIVITY</div>
          <div className="space-y-1">
            <NavItem icon={ChartLineUp} label="Performance" />
            <NavItem 
              icon={Clock} 
              label="Time & Attendance" 
              active={activeItem === 'Time & Attendance'} 
            />
            <NavItem icon={CheckSquare} label="Tasks" />
            <NavItem icon={ShieldCheck} label="Disciplinary" />
          </div>
        </div>

        {/* OTHERS Section */}
        <div>
          <div className="px-4 mb-2 text-xs font-semibold text-blue-200/50 tracking-wider">OTHERS</div>
          <div className="space-y-1">
            <NavItem icon={FileText} label="Documents" />
            <NavItem icon={ChartPieSlice} label="Reports" hasSubmenu />
            <NavItem icon={Buildings} label="Asset" hasSubmenu />
            <NavItem icon={Buildings} label="Company Details" />
          </div>
        </div>

        {/* EXTRAS Section */}
        <div>
          <div className="px-4 mb-2 text-xs font-semibold text-blue-200/50 tracking-wider">EXTRAS</div>
          <div className="space-y-1">
            <NavItem icon={Question} label="Help" />
            <NavItem icon={Headset} label="Support" />
            <NavItem icon={Gear} label="Settings" />
            <NavItem icon={ShieldCheck} label="Audits" />
          </div>
        </div>
      </nav>

      {/* Bottom Spacer */}
      <div className="h-6"></div>
    </aside>
  );
}
