import React from 'react';
import { cn } from '@/lib/utils';

interface TextCellProps {
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
  left?: string;
  zIndex?: number;
  showShadow?: boolean;
}

export function TextCell({ 
  children, 
  className,
  sticky = false,
  left,
  zIndex = 10,
  showShadow = false
}: TextCellProps) {
  return (
    <div className={cn(
      "table-cell-content flex items-center min-w-0 group-hover:bg-slate-50 px-6 py-4 bg-white",
      sticky && "sticky transition-shadow duration-200",
      sticky && left,
      showShadow && "after:absolute after:top-0 after:right-0 after:bottom-0 after:w-4 after:translate-x-full after:bg-linear-to-r after:from-black/5 after:to-transparent after:pointer-events-none overflow-visible",
      className
    )}
    style={{ zIndex: sticky ? zIndex : undefined }}
    >
      <span className="text-sm font-medium text-slate-900 truncate">{children}</span>
    </div>
  );
}
