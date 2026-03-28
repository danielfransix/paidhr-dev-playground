import React from 'react';
import { CheckCircle, Circle } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface StepProps {
  label: string;
  status: 'completed' | 'active' | 'pending';
  isLast?: boolean;
}

const Step = ({ label, status, isLast }: StepProps) => {
  return (
    <div className="flex items-start gap-3 relative pb-8 last:pb-0">
      {!isLast && (
        <div className={cn(
          "absolute left-2.5 top-6 bottom-0 w-px hidden",
          status === 'completed' ? "bg-blue-600" : "bg-gray-200"
        )} />
      )}
      
      <div className="relative z-10 shrink-0 bg-white">
        {status === 'completed' && (
          <CheckCircle size={20} weight="fill" className="text-blue-600" />
        )}
        {status === 'active' && (
          <div className="w-5 h-5 rounded-full border-2 border-blue-600 bg-white" />
        )}
        {status === 'pending' && (
          <div className="w-5 h-5 rounded-full border-2 border-gray-200 bg-white" />
        )}
      </div>
      
      <div className={cn(
        "text-sm font-medium pt-0.5",
        status === 'completed' ? "text-gray-900" : 
        status === 'active' ? "text-gray-900 font-bold" : "text-gray-500"
      )}>
        {label}
      </div>
    </div>
  );
};

export function SetupSidebar() {
  return (
    <div className="w-64 bg-white p-6 shrink-0 h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Setup steps</h2>
      <div className="flex flex-col">
        <Step label="Workplace selection" status="completed" />
        <Step label="Duty locations" status="completed" />
        <Step label="Shift plans" status="active" />
        <Step label="Summary & publish" status="pending" isLast />
      </div>
    </div>
  );
}
