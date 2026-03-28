import React from 'react';
import { CaretUp, CaretDown } from '@phosphor-icons/react';
import { cn, triggerCellAction } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface DepartmentCollapseCellProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export function DepartmentCollapseCell({ collapsed, onToggle, className }: DepartmentCollapseCellProps) {
  return (
    <div
      className={cn(
        "table-cell-content group/cell flex flex-row justify-start items-center px-6 py-3 gap-2 h-15 bg-white group-hover:bg-slate-50 transition-colors cursor-pointer",
        className
      )}
      onClick={(event) => triggerCellAction(event, "button")}
    >
      <Button variant="link" onClick={onToggle} className="flex flex-row items-center px-0 py-2 gap-1 text-sm font-medium text-slate-900 max-w-full hover:no-underline hover:text-blue-600 group-hover/cell:text-blue-600 focus:ring-0 focus:ring-offset-0 focus:outline-none">
        <span className="truncate">{collapsed ? 'Expand' : 'Collapse'}</span>
        {collapsed ? <CaretDown size={16} /> : <CaretUp size={16} />}
      </Button>
    </div>
  );
}
