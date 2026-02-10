import React from 'react';
import { DotsThree } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface EmployeeNameCellProps {
  initials: string;
  name: string;
  className?: string;
  sticky?: boolean;
  showShadow?: boolean;
  children?: React.ReactNode;
}

export function EmployeeNameCell({
  initials,
  name,
  className,
  sticky = false,
  showShadow = false,
  children
}: EmployeeNameCellProps) {
  return (
    <div className={cn(
      "table-cell-content group/cell flex items-center gap-3 min-w-0 group-hover:bg-slate-50 px-6 bg-white transition-shadow duration-200",
      sticky && "sticky left-14 z-10",
      showShadow && "after:absolute after:top-0 after:right-0 after:bottom-0 after:w-4 after:translate-x-full after:bg-linear-to-r after:from-black/5 after:to-transparent after:pointer-events-none overflow-visible",
      className
    )}>
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-700 border border-gray-200 shrink-0">
        {initials}
      </div>
      <span className="text-sm font-medium text-gray-900 truncate">{name}</span>
      {children !== undefined ? children : (
        <div className="relative">
          <Button variant="ghost" size="icon-sm" className="text-slate-500 hover:bg-slate-100 hover:text-slate-900">
            <DotsThree size={16} weight="bold" />
          </Button>
        </div>
      )}
    </div>
  );
}
