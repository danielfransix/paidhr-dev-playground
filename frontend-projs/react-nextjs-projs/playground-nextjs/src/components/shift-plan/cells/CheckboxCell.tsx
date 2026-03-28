import React from 'react';
import { Check } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface CheckboxCellProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
  sticky?: boolean;
  zIndex?: number;
  showShadow?: boolean;
}

export function CheckboxCell({ 
  checked, 
  onChange, 
  className, 
  sticky = false,
  zIndex = 10,
  showShadow = false
}: CheckboxCellProps) {
  const triggerCellAction = (event: React.MouseEvent<HTMLElement>, selector: string) => {
    const target = event.target as HTMLElement;
    if (target.closest(selector) || target.closest('label')) {
      return;
    }
    const action = (event.currentTarget as HTMLElement).querySelector<HTMLElement>(selector);
    action?.click();
  };

  return (
    <div
      className={cn(
        "table-cell-content flex items-center justify-center cursor-pointer bg-white transition-colors group-hover:bg-slate-50",
        sticky && "sticky left-0",
        showShadow && "after:absolute after:top-0 after:right-0 after:bottom-0 after:w-4 after:translate-x-full after:bg-linear-to-r after:from-black/5 after:to-transparent after:pointer-events-none overflow-visible",
        className
      )}
      style={{ zIndex: sticky ? zIndex : undefined }}
      onClick={(event) => triggerCellAction(event, 'input[type="checkbox"]')}
    >
      <label className="flex items-center justify-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={checked}
          onChange={onChange}
        />
        <div className="w-5 h-5 flex flex-col justify-center items-center rounded border border-slate-400 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors">
          <Check weight="bold" className="text-white w-3.5 h-3.5 block" />
        </div>
      </label>
    </div>
  );
}
