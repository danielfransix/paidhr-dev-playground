import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TableHeaderProps {
  dates: Date[];
}

export function TableHeader({ dates }: TableHeaderProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short' }).format(date);
  };

  const getDayName = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  };

  return (
    <div className="flex border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
      {/* Employee Column Header */}
      <div className="w-64 min-w-62.5 table-cell-content font-semibold text-xs text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50 sticky left-0 z-20 flex items-center justify-between">
        <span>Employee</span>
        <div className="flex gap-1">
          <Button variant="ghost" className="p-1 hover:bg-gray-200 rounded h-auto w-auto"><ChevronLeft size={14} /></Button>
          <Button variant="ghost" className="p-1 hover:bg-gray-200 rounded h-auto w-auto"><ChevronRight size={14} /></Button>
        </div>
      </div>

      {/* Date Columns */}
      <div className="flex-1 flex">
        {dates.map((date, index) => {
           const isToday = new Date().toDateString() === date.toDateString();
           return (
             <div key={index} className="flex-1 min-w-35 table-cell-content-md border-r border-gray-200 text-center last:border-r-0">
               <div className={`text-xs font-medium mb-1 uppercase ${isToday ? 'text-blue-600' : 'text-gray-500'}`}>
                 {getDayName(date)}
               </div>
               <div className={`text-sm font-bold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                 {formatDate(date)}
               </div>
             </div>
           );
        })}
      </div>
    </div>
  );
}
