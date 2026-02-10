import React from 'react';
import { ChevronRight, Home, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function TopNav() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Home size={16} className="text-gray-400" />
        <ChevronRight size={14} className="text-gray-300" />
        <span className="hover:text-gray-900 cursor-pointer">Time & Attendance</span>
        <ChevronRight size={14} className="text-gray-300" />
        <span className="font-medium text-gray-900">Rostered Assignment Table</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-blue-500 w-64"
          />
        </div>
        <Button variant="ghost" className="rounded-full p-2 h-auto w-auto relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </Button>
      </div>
    </header>
  );
}
