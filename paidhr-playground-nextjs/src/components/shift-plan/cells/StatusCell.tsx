import React from 'react';
import { Check, X, DotsThree } from '@phosphor-icons/react';
import { cn, triggerCellAction } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface StatusCellProps {
  approved: boolean | null;
  className?: string;
}

export function StatusCell({ approved, className }: StatusCellProps) {
  return (
    <div
      className={cn(
        "table-cell-content group/cell flex items-center min-w-0 group-hover:bg-slate-50 px-6 py-4 cursor-pointer bg-white",
        className
      )}
      onClick={(event) => triggerCellAction(event, "button")}
    >
      {approved === true && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-green-600 font-bold">Approved</span>
          <div className="relative shrink-0">
            <Button variant="ghost" size="icon-sm" className="text-slate-500 group-hover/cell:bg-slate-100 group-hover/cell:text-slate-900">
              <DotsThree size={16} weight="bold" />
            </Button>
          </div>
        </div>
      )}
      {approved === false && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-red-600 font-bold">Rejected</span>
          <div className="relative shrink-0">
            <Button variant="ghost" size="icon-sm" className="text-slate-500 group-hover/cell:bg-slate-100 group-hover/cell:text-slate-900">
              <DotsThree size={16} weight="bold" />
            </Button>
          </div>
        </div>
      )}
      {approved === null && (
          <div className="flex gap-2">
            <Button variant="outline" size="icon-lg" className="text-slate-500 group-hover/cell:bg-slate-50 group-hover/cell:text-slate-900 group-hover:border-green-500">
              <Check size={16} weight="bold" />
            </Button>
            <Button variant="outline" size="icon-lg" className="text-slate-500 group-hover/cell:bg-slate-50 group-hover/cell:text-slate-900 group-hover:border-red-500">
              <X size={16} weight="bold" />
            </Button>
          </div>
        )}
    </div>
  );
}
