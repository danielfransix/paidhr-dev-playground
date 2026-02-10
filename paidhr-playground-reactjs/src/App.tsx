import React from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SetupSidebar } from '@/components/setup/SetupSidebar';
import { ShiftPlanTable } from '@/components/shift-plan/ShiftPlanTable';
import { EmployeeAssignmentTable } from '@/components/shift-plan/EmployeeAssignmentTable';
import { AttendanceRecordsTable } from '@/components/shift-plan/AttendanceRecordsTable';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { 
  SquaresFour,
  Bell, 
  CaretRight, 
  CaretLeft, 
  Plus,
  Link as LinkIcon,
  PencilSimple
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const DateInput = ({ 
  defaultValue, 
  maxLength, 
  placeholder, 
  className 
}: { 
  defaultValue: string, 
  maxLength: number, 
  placeholder: string, 
  className?: string 
}) => {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '');
    setValue(newValue);
  };

  return (
    <input 
      type="text" 
      value={value}
      onChange={handleChange}
      maxLength={maxLength}
      placeholder={placeholder}
      className={cn(
        "outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all",
        className
      )}
    />
  );
};

export default function App() {
  return (
    <div className="flex bg-slate-100 font-sans text-gray-900 items-stretch self-stretch h-screen overflow-hidden">
      <AppSidebar />
      
      <main className="flex-1 ml-64 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white px-6 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="p-1 rounded hover:bg-gray-100 cursor-pointer">
              <span className="sr-only">Menu</span>
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
              </div>
            </div>
            <span>Dashboard</span>
            <CaretRight size={14} />
            <span className="font-medium text-gray-900">Time and Attendance</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon-lg" className="rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 relative">
              <Bell size={20} />
              <div className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
            </Button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                 <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm">
                <div className="font-bold text-gray-900 leading-none">John Mark</div>
                <div className="text-gray-500 text-xs mt-1">Admin</div>
              </div>
              <CaretRight size={14} className="text-gray-400 rotate-90" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 self-stretch items-start p-2 overflow-hidden">
          {/* Inner Wrapper */}
          <div className="flex items-start gap-2 flex-1 self-stretch rounded overflow-hidden">
            {/* Setup Steps Sidebar */}
            <SetupSidebar />

            {/* Main Content Container */}
            <div className="flex px-6 py-6 flex-col items-start gap-6 self-stretch flex-1 overflow-y-auto w-full bg-white">
              
              {/* Back Button */}
              <Button variant="outline" className="w-fit">
                <CaretLeft size={16} />
                Go back
              </Button>

              <div className="w-full">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Shift plans</h1>
                <p className="text-gray-500">Choose how you want to schedule employees for this workplace. You can create multiple shift plans with different types later.</p>
              </div>

              {/* Shift Table Section */}
              <div className="space-y-8 w-full">
                {/* Active Table */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-900">Shift tables for</h2>
                      <div className="px-3 py-1 bg-gray-100 rounded-md text-gray-900 font-medium text-sm border border-gray-200">
                        January shift plan
                      </div>
                    </div>
                    <Button variant="outline-blue">
                      <Plus size={16} weight="bold" className="shrink-0" />
                      <span className="truncate">Add shift table</span>
                    </Button>
                  </div>

                  <div className="text-sm font-bold text-gray-900 mb-4">Jan 05</div>

                  {/* Filter Controls */}
                  <div className="flex flex-wrap items-end gap-4 mb-4">
                    <div className="flex items-end gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Duration start date:</label>
                        <div className="flex items-center gap-2">
                          <DateInput 
                            defaultValue="05" 
                            maxLength={2} 
                            placeholder="DD"
                            className="w-10 h-10 border border-slate-300 rounded-md bg-white text-center font-bold text-gray-900 text-sm p-2" 
                          />
                          <span className="text-gray-300">/</span>
                          <DateInput 
                            defaultValue="01" 
                            maxLength={2} 
                            placeholder="MM"
                            className="w-10 h-10 border border-slate-300 rounded-md bg-white text-center font-bold text-gray-900 text-sm p-2" 
                          />
                          <span className="text-gray-300">/</span>
                          <DateInput 
                            defaultValue="2026" 
                            maxLength={4} 
                            placeholder="YYYY"
                            className="w-20 h-10 border border-slate-300 rounded-md bg-white text-center font-bold text-gray-900 text-sm p-2" 
                          />
                        </div>
                      </div>
                      
                      <div className="pb-2.5 text-gray-400 font-medium">-</div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Duration end date:</label>
                        <div className="flex items-center gap-2">
                          <DateInput 
                            defaultValue="24" 
                            maxLength={2} 
                            placeholder="DD"
                            className="w-10 h-10 border border-slate-300 rounded-md bg-white text-center font-bold text-gray-900 text-sm p-2" 
                          />
                          <span className="text-gray-300">/</span>
                          <DateInput 
                            defaultValue="01" 
                            maxLength={2} 
                            placeholder="MM"
                            className="w-10 h-10 border border-slate-300 rounded-md bg-white text-center font-bold text-gray-900 text-sm p-2" 
                          />
                          <span className="text-gray-300">/</span>
                          <DateInput 
                            defaultValue="" 
                            maxLength={4} 
                            placeholder="YYYY"
                            className="w-20 h-10 border border-slate-300 rounded-md bg-white text-center font-bold text-gray-900 text-sm p-2 placeholder:text-gray-300" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>

                    <div className="flex items-end gap-4 flex-1 min-w-75">
                      <div className="w-64 flex-1">
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Location</label>
                        <Select 
                          className="w-full h-10"
                          defaultValue="vigilant"
                          options={[
                            { label: "Vigilant Guard Station", value: "vigilant" },
                            { label: "Main Office", value: "main" },
                            { label: "Warehouse A", value: "warehouse" },
                          ]}
                        />
                      </div>
                      <Button variant="outline" className="truncate">
                        Save
                      </Button>
                    </div>
                  </div>

                  <div className="py-4">
                    <ShiftPlanTable />
                  </div>

                  <div className="w-full border-t border-dashed border-gray-300 my-8"></div>

                  <div className="py-4">
                    <EmployeeAssignmentTable />
                  </div>

                  <div className="w-full border-t border-gray-200 my-8"></div>

                  <div className="py-4">
                    <AttendanceRecordsTable />
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex justify-end gap-3 mt-12 pb-12 w-full">
                 <Button variant="outline" className="truncate">
                   <span className="truncate">Save to drafts</span>
                 </Button>
                 <Button variant="default" className="px-6 py-2.5 truncate font-bold">
                   Next step
                 </Button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}