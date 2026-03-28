import React, { useState, useRef, useEffect } from 'react';
import { CaretDown, Check } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}

export function Select({ value: controlledValue, defaultValue, onChange, options, placeholder = "Select...", className }: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => {
          // Small delay to allow click events on options to fire before closing
          setTimeout(() => setIsOpen(false), 200);
        }}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-colors h-10 whitespace-nowrap",
          "hover:bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
          isOpen && "border-blue-500 ring-1 ring-blue-500",
          className
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <CaretDown size={14} className="text-gray-500 shrink-0" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full z-50 rounded-lg border border-gray-200 bg-white p-1 shadow-lg animate-in fade-in zoom-in-95">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleValueChange(option.value)}
              className={cn(
                "relative flex w-full select-none items-center rounded-md py-2 pl-2 pr-8 text-xs outline-none transition-colors cursor-pointer hover:bg-blue-50 hover:text-blue-900",
                value === option.value && "bg-blue-50 text-blue-900"
              )}
            >
              <span>{option.label}</span>
              {value === option.value && (
                <div className="absolute right-2 flex items-center justify-center text-blue-600">
                  <Check size={14} weight="bold" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
