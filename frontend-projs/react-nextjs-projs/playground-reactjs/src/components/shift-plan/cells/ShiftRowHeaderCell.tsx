import React from 'react';
import { cn } from '@/lib/utils';

interface ShiftRowHeaderCellProps {
  label: string;
  timeRange: string;
  className?: string;
  sticky?: boolean;
  showShadow?: boolean;
}

export function ShiftRowHeaderCell({
  label,
  timeRange,
  className,
  sticky = false,
  showShadow = false
}: ShiftRowHeaderCellProps) {
  return (
    <div className={cn(
      "p-4 border-r border-gray-100 flex flex-col justify-center bg-white transition-shadow duration-200",
      sticky && "sticky left-0 z-10",
      showShadow && "after:absolute after:top-0 after:right-0 after:bottom-0 after:w-4 after:translate-x-full after:bg-linear-to-r after:from-black/5 after:to-transparent after:pointer-events-none overflow-visible",
      className
    )}>
      <div className="font-bold text-gray-900 text-sm leading-tight mb-2">{label}</div>
      <div className="border-l-2 border-slate-300 pl-3">
        <div className="text-sm text-slate-400 font-medium whitespace-pre-line leading-normal">
          {timeRange}
        </div>
      </div>
    </div>
  );
}
