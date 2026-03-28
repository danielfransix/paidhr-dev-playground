import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface AddShiftCellProps {
  onClick?: () => void;
  className?: string;
}

export function AddShiftCell({ onClick, className }: AddShiftCellProps) {
  return (
    <Button 
      variant="dashed"
      onClick={onClick}
      className={cn(
        "w-full h-full min-h-20",
        className
      )}
    >
      <Plus size={20} />
    </Button>
  );
}
