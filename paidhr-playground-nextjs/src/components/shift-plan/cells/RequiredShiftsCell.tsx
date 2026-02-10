import React from 'react';
import { Minus, Plus } from '@phosphor-icons/react';
import { cn, triggerCellAction } from '@/lib/utils';

interface RequiredShiftsCellProps {
  requiredShifts: number;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
}

export function RequiredShiftsCell({ 
  requiredShifts, 
  onIncrement, 
  onDecrement, 
  className 
}: RequiredShiftsCellProps) {
  return (
    <div
      className={cn(
        "table-cell-content group/cell flex items-center px-6 group-hover:bg-slate-50 cursor-pointer bg-white",
        className
      )}
      onClick={(event) => triggerCellAction(event, "button")}
    >
      <div className="flex items-center gap-3">
        <button  
          onClick={onDecrement}
          className="w-10 h-10 flex items-center justify-center rounded-md border border-slate-300 bg-white text-gray-500 group-hover/cell:bg-gray-50 group-hover/cell:text-gray-900 transition-colors shadow-sm cursor-pointer"
        >
          <Minus size={14} weight="bold" />
        </button>
        <span className="text-sm font-bold text-gray-900 w-4 text-center">
          {requiredShifts}
        </span>
        <button
          onClick={onIncrement}
          className="w-10 h-10 flex items-center justify-center rounded-md border border-slate-300 bg-white text-gray-500 group-hover/cell:bg-gray-50 group-hover/cell:text-gray-900 transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={14} weight="bold" />
        </button>
      </div>
    </div>
  );
}
