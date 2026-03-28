import React from 'react';
import { cn } from '@/lib/utils';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ShiftCardProps {
  startTime: string;
  endTime: string;
  role: string;
  location?: string;
  className?: string;
  variant?: 'default' | 'blue' | 'purple' | 'orange';
}

export function ShiftCard({ startTime, endTime, role, location, className, variant = 'blue' }: ShiftCardProps) {
  const variantStyles = {
    default: "bg-gray-100 border-gray-200 text-gray-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
  };

  return (
    <div className={cn(
      "rounded-lg border p-2 text-xs relative group cursor-pointer hover:shadow-sm transition-shadow",
      variantStyles[variant],
      className
    )}>
      <div className="flex justify-between items-start mb-1">
        <span className="font-bold">{startTime} - {endTime}</span>
        <Button variant="ghost" className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-black/5 rounded h-auto w-auto">
          <MoreHorizontal size={14} />
        </Button>
      </div>
      <div className="font-semibold truncate mb-0.5">{role}</div>
      {location && (
        <div className="opacity-80 truncate text-[10px]">{location}</div>
      )}
    </div>
  );
}
