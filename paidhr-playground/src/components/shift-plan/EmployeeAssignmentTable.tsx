import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash, Check, CaretRight } from '@phosphor-icons/react';
import { cn, triggerCellAction } from '@/lib/utils';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CheckboxCell } from './cells/CheckboxCell';
import { HeaderCell } from './cells/HeaderCell';
import { EmployeeNameCell } from './cells/EmployeeNameCell';
import { EligibleShiftsCell } from './cells/EligibleShiftsCell';
import { RequiredShiftsCell } from './cells/RequiredShiftsCell';

interface Employee {
  id: string;
  name: string;
  initials: string;
  avatarColor: string; // just for variety if needed
  eligibleShifts?: number; // if undefined, show "Select eligible shifts" button
  requiredShifts: number;
  isChecked: boolean;
}

const initialEmployees: Employee[] = [
  { id: '1', name: 'Tracy Lakin', initials: 'AJ', avatarColor: 'bg-gray-100', eligibleShifts: undefined, requiredShifts: 6, isChecked: false },
  { id: '2', name: 'Tracy Lakin', initials: 'TL', avatarColor: 'bg-gray-100', eligibleShifts: undefined, requiredShifts: 6, isChecked: true },
  { id: '3', name: 'Tracy Lakin', initials: 'AJ', avatarColor: 'bg-gray-100', eligibleShifts: 6, requiredShifts: 6, isChecked: false },
  { id: '4', name: 'Tracy Lakin', initials: 'AJ', avatarColor: 'bg-gray-100', eligibleShifts: undefined, requiredShifts: 6, isChecked: true },
  { id: '5', name: 'Tracy Lakin', initials: 'AJ', avatarColor: 'bg-gray-100', eligibleShifts: 6, requiredShifts: 6, isChecked: true },
];

/**
 * EmployeeAssignmentTable Component
 * 
 * Manages employee assignments and their shift requirements.
 * Features:
 * - Horizontal scrolling for small screens
 * - Checkbox selection for employees
 * - Inline editing for shift requirements
 */
export function EmployeeAssignmentTable() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [showShadow, setShowShadow] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowShadow(scrollLeft > 0);
        setShowRightScroll(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
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

  const toggleEmployee = (id: string) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, isChecked: !emp.isChecked } : emp
    ));
  };

  const updateRequiredShifts = (id: string, delta: number) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, requiredShifts: Math.max(0, emp.requiredShifts + delta) } : emp
    ));
  };

  const toggleSelectAll = () => {
    const allSelected = employees.every(e => e.isChecked);
    setEmployees(prev => prev.map(e => ({ ...e, isChecked: !allSelected })));
  };

  const isAllSelected = employees.every(e => e.isChecked);

  return (
    <div className="relative">
      {showRightScroll && (
        <div 
          onClick={scrollRight}
          className="absolute right-0 top-0 bottom-0 w-8 flex items-center justify-center bg-gray-900/5 hover:bg-gray-900/10 cursor-pointer z-30 transition-colors"
        >
          <CaretRight size={16} weight="bold" className="text-gray-600" />
        </div>
      )}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto hide-scrollbar relative"
        >
          <div className="w-full bg-white min-w-max">
            {/* Top Controls */}
            <div className="grid grid-cols-[56px_250px_minmax(200px,1fr)_200px] border-b border-slate-200">
            <div className={cn(
              "col-span-2 p-4 flex items-center bg-white sticky left-0 z-10 transition-shadow duration-200",
              showShadow && "after:absolute after:top-0 after:right-0 after:bottom-0 after:w-4 after:translate-x-full after:bg-linear-to-r after:from-black/5 after:to-transparent after:pointer-events-none overflow-visible"
            )}>
              <div className="w-full">
                <button className="flex w-full items-center justify-center gap-2 h-10 px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors shadow-sm whitespace-nowrap">
                  <span className="truncate">Add employee</span>
                  <Plus size={16} weight="bold" className="shrink-0" />
                </button>
              </div>
            </div>

            <div className="p-4 flex items-center">
              <Select 
                className="w-full" 
                placeholder="Select eligible shifts for selection"
                options={[]} 
              />
            </div>

            <div className="p-4 flex items-center pr-6">
              <Select 
                className="w-full" 
                placeholder="Shifts required"
                options={[]} 
              />
            </div>
          </div>

          {/* Table Header */}
          <div className="grid h-12 grid-cols-[56px_250px_minmax(200px,1fr)_200px] border-b border-slate-200 bg-gray-50/50">
            <CheckboxCell
              checked={isAllSelected}
              onChange={toggleSelectAll}
              className="bg-gray-50 hover:bg-gray-50 z-20"
              sticky={true}
              zIndex={20}
            />
            <HeaderCell
              sticky={true}
              left="left-14"
              showShadow={showShadow}
              className="bg-gray-50"
            >
              Name
            </HeaderCell>
            <HeaderCell className="bg-gray-50">Eligible shifts</HeaderCell>
            <HeaderCell className="bg-gray-50 pr-8">Shifts required / week</HeaderCell>
          </div>



          {/* Rows */}
          <div>
            {employees.map((employee, index) => (
              <div key={employee.id} className="group grid h-20 grid-cols-[56px_250px_minmax(200px,1fr)_200px] transition-colors min-w-max">
                {/* Checkbox Column */}
                <CheckboxCell
                  checked={employee.isChecked}
                  onChange={() => toggleEmployee(employee.id)}
                  sticky={true}
                  className={cn(
                    index !== employees.length - 1 && "border-b border-slate-200"
                  )}
                />

                {/* Name Column */}
                <EmployeeNameCell
                  initials={employee.initials}
                  name={employee.name}
                  sticky={true}
                  showShadow={showShadow}
                  className={cn(
                    index !== employees.length - 1 && "border-b border-slate-200"
                  )}
                />

                {/* Eligible Shifts Column */}
                <EligibleShiftsCell
                  eligibleShifts={employee.eligibleShifts}
                  className={cn(
                    index !== employees.length - 1 && "border-b border-slate-200"
                  )}
                />

                {/* Shifts Required Column */}
                <RequiredShiftsCell
                  requiredShifts={employee.requiredShifts}
                  onIncrement={() => updateRequiredShifts(employee.id, 1)}
                  onDecrement={() => updateRequiredShifts(employee.id, -1)}
                  className={cn(
                    index !== employees.length - 1 && "border-b border-slate-200"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-gray-50/50 relative z-30">
          <Button variant="outline-destructive">
            <Trash size={16} className="shrink-0" />
            <span className="truncate">Delete this shift table</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

