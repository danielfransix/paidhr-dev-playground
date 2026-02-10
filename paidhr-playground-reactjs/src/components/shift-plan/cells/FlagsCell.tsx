import React from 'react';
import { cn } from '@/lib/utils';

interface FlagsCellProps {
  flags: string[];
  className?: string;
}

export function FlagsCell({ flags, className }: FlagsCellProps) {
  return (
    <div className={cn("table-cell-content flex items-center min-w-0 group-hover:bg-slate-50 px-6 py-4 bg-white", className)}>
      <div className="flex flex-col gap-1 min-w-0">
        {flags.map(flag => (
          <div key={flag} className="box-border inline-flex items-center px-3 pt-2.5 pb-1.5 gap-1 h-8 w-fit max-w-full bg-white border border-slate-300 rounded-full self-start">
            <span className="text-xs font-normal text-slate-900 truncate">{flag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
