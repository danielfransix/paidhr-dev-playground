import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderCellProps {
  children?: React.ReactNode;
  className?: string;
  sticky?: boolean;
  left?: string; // e.g. "left-14"
  zIndex?: number;
  showShadow?: boolean;
}

export function HeaderCell({
  children,
  className,
  sticky = false,
  left,
  zIndex = 20,
  showShadow = false
}: HeaderCellProps) {
  return (
    <div className={cn(
      "table-cell-content flex items-center px-6 truncate text-xs font-bold text-gray-500",
      sticky && "sticky transition-shadow duration-200",
      sticky && left,
      showShadow && "after:absolute after:top-0 after:right-0 after:bottom-0 after:w-4 after:translate-x-full after:bg-linear-to-r after:from-black/5 after:to-transparent after:pointer-events-none overflow-visible",
      className
    )}
    style={{ zIndex: sticky ? zIndex : undefined }}
    >
      {children}
    </div>
  );
}
