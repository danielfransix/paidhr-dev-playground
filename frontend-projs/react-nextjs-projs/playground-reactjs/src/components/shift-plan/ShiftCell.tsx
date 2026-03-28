import React from 'react';
import { Plus, PencilSimple } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui/Tooltip';

interface ShiftCellProps {
  count?: number;
  onClick?: () => void;
  className?: string;
  isAssigned?: boolean;
}

export function ShiftCell({ count, onClick, className, isAssigned }: ShiftCellProps) {
  if (isAssigned) {
    return (
      <Tooltip content="view/add/remove staff">
        <button
          type="button"
          className={cn(
            "h-full w-full min-h-18 flex items-center justify-center transition-all group relative hover:bg-slate-100 cursor-pointer table-cell-content outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500",
            className
          )}
          onClick={() => onClick?.()}
        >
          <div className="flex flex-col items-start gap-1">
            <span className="font-bold text-gray-900 text-sm leading-tight select-none">
              {count} staff
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold opacity-100">
              <span className="text-gray-900 text-sm leading-tight font-bold select-none cursor-default">
                added
              </span>
              <div 
                className="text-slate-400 group-hover:text-blue-600 transition-colors rounded"
              >
                <PencilSimple size={12} weight="bold" />
              </div>
            </div>
          </div>
        </button>
      </Tooltip>
    );
  }

  return (
    <Tooltip content="add staff">
      <button
        type="button"
        className={cn(
          "h-full w-full min-h-18 flex items-center justify-center group hover:bg-slate-100 transition-colors cursor-pointer table-cell-content outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500",
          className
        )}
        onClick={() => onClick?.()}
      >
        <div 
          className={cn(
            "w-10 h-10 rounded-md border border-slate-300 flex items-center justify-center text-gray-400 transition-all bg-white shadow-sm",
            "group-hover:border-blue-400 group-hover:text-blue-500 group-hover:bg-blue-50"
          )}
        >
          <Plus size={18} weight="bold" />
        </div>
      </button>
    </Tooltip>
  );
}
