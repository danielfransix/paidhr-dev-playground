import React, { useState, useRef, useEffect } from 'react';
import { Check, X, CaretUp, CaretDown, ArrowsOutSimple, DotsThree, CaretRight } from '@phosphor-icons/react';
import { cn, triggerCellAction } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { CheckboxCell } from './cells/CheckboxCell';
import { HeaderCell } from './cells/HeaderCell';
import { TextCell } from './cells/TextCell';
import { EmployeeNameCell } from './cells/EmployeeNameCell';
import { FlagsCell } from './cells/FlagsCell';
import { ReasonCell } from './cells/ReasonCell';
import { StatusCell } from './cells/StatusCell';
import { DepartmentCollapseCell } from './cells/DepartmentCollapseCell';

interface AttendanceRecord {
  id: string;
  name: string;
  initials: string;
  clockIn: string;
  clockOut: string;
  method: string;
  flags: string[];
  reason: string;
  approved: boolean | null;
  expanded: boolean;
  department: string;
  isChecked: boolean;
}

const initialRecords: AttendanceRecord[] = [
  { id: '1', name: 'Tracy Lakin', initials: 'AJ', clockIn: '02:55:40', clockOut: '02:55:40', method: 'Mobile App', flags: ['Manual entry', 'Outside geofence'], reason: 'Dog bit my grandma, then trailer jammed her, next thing trumpet sound and then I shouteddddd who goes there.', approved: true, expanded: false, department: 'Product Department', isChecked: false },
  { id: '2', name: 'Tracy Lakin', initials: 'TL', clockIn: '02:55:40', clockOut: '02:55:40', method: 'Web App', flags: ['Manual entry', 'Overtime'], reason: 'Faucibus donec volutpat sed enim. Augue diam.', approved: null, expanded: true, department: 'Product Department', isChecked: true },
  { id: '3', name: 'Tracy Lakin', initials: 'TL', clockIn: '02:55:40', clockOut: '02:55:40', method: 'Web App', flags: ['Manual entry', 'Outside geofence'], reason: 'Faucibus donec volutpat sed enim. Augue diam.', approved: null, expanded: true, department: 'Product Department', isChecked: false },
  { id: '4', name: 'Tracy Lakin', initials: 'AJ', clockIn: '02:55:40', clockOut: '02:55:40', method: 'Hardware device', flags: ['Outside geofence', 'Late arrival'], reason: 'Maecenas egestas varius scelerisque. Nisl ultricies diam magna rhoncus, lectus.', approved: true, expanded: false, department: 'Marketing Departme...', isChecked: true },
];

/**
 * AttendanceRecordsTable Component
 * 
 * Displays attendance records grouped by department.
 * Features:
 * - Collapsible department sections
 * - Expandable record details
 * - Horizontal scrolling
 */
export function AttendanceRecordsTable() {
  const [records, setRecords] = useState(initialRecords);
  const [collapsedDepartments, setCollapsedDepartments] = useState<string[]>([]);
  const [animatingDepartments, setAnimatingDepartments] = useState<string[]>([]);
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

  const toggleExpand = (id: string) => {
    setRecords(prev => prev.map(rec =>
      rec.id === id ? { ...rec, expanded: !rec.expanded } : rec
    ));
  };

  const toggleRecord = (id: string) => {
    setRecords(prev => prev.map(rec =>
      rec.id === id ? { ...rec, isChecked: !rec.isChecked } : rec
    ));
  };

  const toggleDepartment = (department: string) => {
    const deptRecords = records.filter(r => r.department === department);
    const allSelected = deptRecords.every(r => r.isChecked);
    setRecords(prev => prev.map(rec =>
      rec.department === department ? { ...rec, isChecked: !allSelected } : rec
    ));
  };

  const toggleSelectAll = () => {
    const allSelected = records.every(r => r.isChecked);
    setRecords(prev => prev.map(rec => ({ ...rec, isChecked: !allSelected })));
  };

  const toggleDepartmentCollapse = (department: string) => {
    setCollapsedDepartments(prev => {
      const isCurrentlyCollapsed = prev.includes(department);
      if (isCurrentlyCollapsed) {
        // Expanding
        setAnimatingDepartments(current => [...current, department]);
        setTimeout(() => {
          setAnimatingDepartments(current => current.filter(d => d !== department));
        }, 300); // Match duration-300
        return prev.filter(d => d !== department);
      } else {
        // Collapsing
        return [...prev, department];
      }
    });
  };

  const isAllSelected = records.length > 0 && records.every(r => r.isChecked);

  const recordsByDepartment = React.useMemo(() => records.reduce((acc, record) => {
    if (!acc[record.department]) {
      acc[record.department] = [];
    }
    acc[record.department].push(record);
    return acc;
  }, {} as Record<string, AttendanceRecord[]>), [records]);

  const triggerCellAction = (event: React.MouseEvent<HTMLElement>, selector: string) => {
    const target = event.target as HTMLElement;
    if (target.closest(selector) || target.closest('label')) {
      return;
    }
    const action = (event.currentTarget as HTMLElement).querySelector<HTMLElement>(selector);
    action?.click();
  };

  return (
    <div className="relative group/table">
      {/* Right Scroll Button - Appears when content overflows */}
      {showRightScroll && (
        <div 
          onClick={scrollRight}
          className="absolute right-0 top-0 bottom-0 w-8 flex items-center justify-center bg-gray-900/5 hover:bg-gray-900/10 cursor-pointer z-30 transition-colors"
        >
          <CaretRight size={16} weight="bold" className="text-gray-600" />
        </div>
      )}
      
      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto rounded-lg border border-slate-200 hide-scrollbar relative"
      >
      <div className="min-w-max">
      {/* Table Header */}
      <div className="grid h-12 grid-cols-[56px_250px_minmax(120px,140px)_minmax(120px,140px)_minmax(140px,180px)_minmax(160px,220px)_minmax(200px,300px)_minmax(160px,180px)] border-b border-slate-200 bg-slate-50 min-w-max">
          <CheckboxCell
            checked={isAllSelected}
            onChange={toggleSelectAll}
            className="bg-slate-50 hover:bg-slate-50 z-20"
            sticky={true}
            zIndex={20}
          />
          {["Name", "Clock-in", "Clock-out", "Method", "Flags", "Reason", "Actions"].map((header, index) => (
            <HeaderCell
              key={header}
              sticky={index === 0}
              left={index === 0 ? "left-14" : undefined}
              showShadow={index === 0 && showShadow}
              zIndex={index === 0 ? 20 : undefined}
              className="bg-slate-50"
            >
              {header}
            </HeaderCell>
          ))}
        </div>

      {/* Table Body */}
      <div className="">
        {Object.entries(recordsByDepartment).map(([department, records], deptIndex, deptArray) => (
          <React.Fragment key={department}>
            <div className="grid grid-cols-[56px_250px_minmax(120px,140px)_minmax(120px,140px)_minmax(140px,180px)_minmax(160px,220px)_minmax(200px,300px)_minmax(160px,180px)] bg-white group min-w-max">
              <CheckboxCell
                checked={records.filter(r => r.department === department).every(r => r.isChecked)}
                onChange={() => toggleDepartment(department)}
                sticky={true}
                className={cn(
                  "py-4",
                  (deptIndex !== deptArray.length - 1 || records.length > 0 || collapsedDepartments.includes(department)) && "border-b border-slate-200"
                )}
              />
              <TextCell
                sticky={true}
                left="left-14"
                showShadow={showShadow}
                className={cn(
                  "col-span-1 py-4",
                  (deptIndex !== deptArray.length - 1 || records.length > 0 || collapsedDepartments.includes(department)) && "border-b border-slate-200"
                )}
              >
                {department}
              </TextCell>
              <div className={cn("table-cell-content col-span-5 bg-white group-hover:bg-slate-50", (deptIndex !== deptArray.length - 1 || records.length > 0 || collapsedDepartments.includes(department)) && "border-b border-slate-200")}></div>
              <DepartmentCollapseCell
                collapsed={collapsedDepartments.includes(department)}
                onToggle={() => toggleDepartmentCollapse(department)}
                className={cn(
                  (deptIndex !== deptArray.length - 1 || records.length > 0 || collapsedDepartments.includes(department)) && "border-b border-slate-200"
                )}
              />
            </div>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${!collapsedDepartments.includes(department) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className={cn(
                "overflow-hidden",
                !collapsedDepartments.includes(department) && !animatingDepartments.includes(department) && "overflow-visible"
              )}>
                {records.map((record, recordIndex) => (
                  <div key={record.id} className="group grid grid-cols-[56px_250px_minmax(120px,140px)_minmax(120px,140px)_minmax(140px,180px)_minmax(160px,220px)_minmax(200px,300px)_minmax(160px,180px)] transition-colors bg-white min-w-max">
                    <CheckboxCell
                      checked={record.isChecked}
                      onChange={() => toggleRecord(record.id)}
                      sticky={true}
                      className={cn(
                        "py-4",
                        (deptIndex !== deptArray.length - 1 || recordIndex !== records.length - 1) && "border-b border-slate-200"
                      )}
                    />
                    <EmployeeNameCell
                      initials={record.initials}
                      name={record.name}
                      sticky={true}
                      showShadow={showShadow}
                      className={cn(
                        "py-4",
                        (deptIndex !== deptArray.length - 1 || recordIndex !== records.length - 1) && "border-b border-slate-200"
                      )}
                    >
                      {null}
                    </EmployeeNameCell>
                    <TextCell className={cn((deptIndex !== deptArray.length - 1 || recordIndex !== records.length - 1) && "border-b border-slate-200")}>
                      {record.clockIn}
                    </TextCell>
                    <TextCell className={cn((deptIndex !== deptArray.length - 1 || recordIndex !== records.length - 1) && "border-b border-slate-200")}>
                      {record.clockOut}
                    </TextCell>
                    <TextCell className={cn((deptIndex !== deptArray.length - 1 || recordIndex !== records.length - 1) && "border-b border-slate-200")}>
                      {record.method}
                    </TextCell>
                    <FlagsCell 
                      flags={record.flags} 
                      className={cn((deptIndex !== deptArray.length - 1 || recordIndex !== records.length - 1) && "border-b border-slate-200")}
                    />
                    <ReasonCell
                      reason={record.reason}
                      expanded={record.expanded}
                      onExpand={() => toggleExpand(record.id)}
                      className={cn((deptIndex !== deptArray.length - 1 || recordIndex !== records.length - 1) && "border-b border-slate-200")}
                    />
                    <StatusCell
                      approved={record.approved}
                      className={cn((deptIndex !== deptArray.length - 1 || recordIndex !== records.length - 1) && "border-b border-slate-200")}
                    />
                  </div>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      </div>
      </div>
    </div>
  );
}
