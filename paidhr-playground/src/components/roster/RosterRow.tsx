import React from 'react';
import { Employee, Shift } from './types';
import { ShiftCard } from './ShiftCard';
import { AddShiftCell } from './AddShiftCell';
import { DotsThree } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';

interface RosterRowProps {
  employee: Employee;
  shifts: Shift[];
  dates: Date[];
}

export function RosterRow({ employee, shifts, dates }: RosterRowProps) {
  const getShiftsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return shifts.filter(s => s.date === dateStr);
  };

  return (
    <div className="flex border-b border-gray-200 hover:bg-gray-50/50 transition-colors group">
      {/* Employee Info Cell - Sticky Left */}
      <div className="w-64 min-w-62.5 table-cell-content border-r border-gray-200 bg-white group-hover:bg-gray-50/50 sticky left-0 z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
          {employee.avatar ? (
            <img src={employee.avatar} alt={employee.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            employee.name.charAt(0)
          )}
        </div>
        <div>
          <div className="font-medium text-gray-900 text-sm">{employee.name}</div>
          <div className="text-xs text-gray-500">{employee.role}</div>
        </div>
        <div className="relative ml-auto">
          <Button variant="ghost" size="icon-sm" className="text-slate-500 hover:bg-slate-100 hover:text-slate-900">
            <DotsThree size={16} weight="bold" />
          </Button>
        </div>
      </div>

      {/* Date Cells */}
      <div className="flex-1 flex">
        {dates.map((date, index) => {
          const dayShifts = getShiftsForDate(date);
          return (
            <div key={index} className="flex-1 min-w-35 table-cell-content-sm border-r border-gray-200 last:border-r-0 min-h-25 flex flex-col gap-2">
              {dayShifts.length > 0 ? (
                dayShifts.map(shift => (
                  <ShiftCard 
                    key={shift.id}
                    startTime={shift.startTime}
                    endTime={shift.endTime}
                    role={shift.role}
                    location={shift.location}
                    variant={shift.variant}
                  />
                ))
              ) : (
                <AddShiftCell className="opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
