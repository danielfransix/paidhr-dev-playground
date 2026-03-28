import React from 'react';
import { PencilSimple, Plus } from '@phosphor-icons/react';
import { cn, triggerCellAction } from '@/lib/utils';

interface EligibleShiftsCellProps {
  eligibleShifts?: number;
  className?: string;
}

export function EligibleShiftsCell({ eligibleShifts, className }: EligibleShiftsCellProps) {
  return (
    <div
      className={cn(
        "table-cell-content group/cell flex items-center min-w-0 group-hover:bg-slate-50 px-6 bg-white",
        eligibleShifts === undefined && "cursor-pointer",
        className
      )}
      onClick={(event) => {
        if (eligibleShifts === undefined) {
          triggerCellAction(event, "button");
        }
      }}
    >
      {eligibleShifts !== undefined ? (
        <div className="flex items-center gap-2 cursor-pointer min-w-0">
          <span className="text-sm font-medium text-gray-900 truncate whitespace-nowrap">
            Eligible for {eligibleShifts} shifts
          </span>
          <PencilSimple size={14} className="text-slate-400 group-hover/cell:text-blue-600 shrink-0" />
        </div>
      ) : (
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-bold text-gray-700 group-hover/cell:bg-gray-50 transition-colors shadow-sm group-hover/cell:border-blue-500 group-hover/cell:text-blue-600 cursor-pointer">
          <Plus size={14} weight="bold" />
          <span className="whitespace-nowrap">Select eligible shifts</span>
        </button>
      )}
    </div>
  );
}
