import React, { useState, useRef, useEffect } from 'react';
import { Trash, CaretRight, Check } from '@phosphor-icons/react';
import { ShiftCell } from './ShiftCell';
import { HeaderCell } from './cells/HeaderCell';
import { ShiftRowHeaderCell } from './cells/ShiftRowHeaderCell';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ShiftType {
  id: string;
  label: string;
  timeRange: string;
}

interface ShiftPlanTableProps {
  onDelete?: () => void;
}

const shiftTypes: ShiftType[] = [
  { id: 'morning', label: 'Morning shift', timeRange: '9:05 AM\n05:05 PM' },
  { id: 'afternoon', label: 'Afternoon shift', timeRange: '9:05 AM\n05:05 PM' },
  { id: 'night', label: 'Night shift', timeRange: '9:05 AM\n05:05 PM' },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * ShiftPlanTable Component
 * 
 * Displays a matrix of shifts vs days.
 * Features:
 * - Horizontal scrolling with a custom right scroll button
 * - Sticky first column with shadow indication on scroll
 * - Dynamic cell rendering based on assignments
 */
export function ShiftPlanTable({ onDelete }: ShiftPlanTableProps) {
  const [showShadow, setShowShadow] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowShadow(scrollLeft > 0);
        // Show right scroll button if not at the end
        // Use a small buffer (1px) to handle fractional pixel rendering
        setShowRightScroll(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      // Initial check
      handleScroll();
      container.addEventListener('scroll', handleScroll, { passive: true });
      
      const resizeObserver = new ResizeObserver(() => {
        handleScroll();
      });
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, []);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Mock data for assigned cells
  const isAssigned = (shiftId: string, dayIndex: number) => {
    // Just some random pattern to match screenshot roughly
    if (shiftId === 'morning' && dayIndex === 4) return 16;
    if (shiftId === 'afternoon' && (dayIndex === 1 || dayIndex === 5)) return 16;
    return 0;
  };

  return (
    <div className="mb-8 relative group/table">
      {/* Right Scroll Overlay */}
      {showRightScroll && (
        <div 
          onClick={scrollRight}
          className="absolute right-0 top-0 bottom-0 w-8 flex items-center justify-center bg-gray-900/5 hover:bg-gray-900/10 cursor-pointer z-30 transition-colors"
        >
          <CaretRight size={16} weight="bold" className="text-gray-600" />
        </div>
      )}
      
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto hide-scrollbar relative"
        >

          {/* Table Header */}
          <div className="grid h-14 grid-cols-[140px_repeat(7,minmax(140px,1fr))] border-b border-slate-200 bg-slate-100 min-w-300">
            <HeaderCell 
              className="bg-slate-100 border-r border-gray-200"
              sticky={true}
              left="left-0"
              showShadow={showShadow}
            >
            </HeaderCell>
            {days.map((day) => (
              <HeaderCell key={day} className="bg-slate-100 justify-center">
                {day}
              </HeaderCell>
            ))}
          </div>

          {/* Table Body */}
          <div className="min-w-300">
            {shiftTypes.map((shift, shiftIndex) => (
              <div key={shift.id} className="grid grid-cols-[140px_repeat(7,minmax(140px,1fr))] transition-colors">
                {/* Row Header (Shift Info) */}
                <ShiftRowHeaderCell
                  label={shift.label}
                  timeRange={shift.timeRange}
                  sticky={true}
                  showShadow={showShadow}
                  className={cn(
                    shiftIndex !== shiftTypes.length - 1 && "border-b border-slate-200"
                  )}
                />

                {/* Cells */}
                {days.map((_, index) => {
                  const count = isAssigned(shift.id, index);
                  return (
                    <div key={index} className={cn(
                      "last:border-r-0 flex flex-col justify-center bg-white",
                      shiftIndex !== shiftTypes.length - 1 && "border-b border-slate-200"
                    )}>
                      <ShiftCell 
                        count={count} 
                        isAssigned={count > 0} 
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-gray-50/50 relative z-30">
          <Button 
            onClick={onDelete}
            variant="outline-destructive"
          >
            <Trash size={16} className="shrink-0" />
            <span className="truncate">Delete this shift table</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
