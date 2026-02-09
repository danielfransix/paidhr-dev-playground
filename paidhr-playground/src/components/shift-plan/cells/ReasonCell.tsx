import React from 'react';
import { ArrowsOutSimple } from '@phosphor-icons/react';
import { cn, triggerCellAction } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ReasonCellProps {
  reason: string;
  expanded: boolean;
  onExpand: () => void;
  className?: string;
}

export function ReasonCell({ reason, expanded, onExpand, className }: ReasonCellProps) {
  return (
    <div
      className={cn(
        "table-cell-content group/cell flex flex-col items-start justify-center gap-3 min-w-0 group-hover:bg-slate-50 px-4 py-3 h-36 cursor-pointer bg-white",
        className
      )}
      onClick={(event) => triggerCellAction(event, "button")}
    >
      <span className={`text-xs font-medium text-slate-900 ${expanded ? '' : 'line-clamp-3'}`}>{reason}</span>
      <Button variant="secondary" onClick={onExpand} className="h-auto px-1.5 py-0.5 gap-1.5 rounded-md text-[10px] group-hover/cell:bg-slate-200">
        <span className="truncate">Expand</span>
        <ArrowsOutSimple size={12} />
      </Button>
    </div>
  );
}
