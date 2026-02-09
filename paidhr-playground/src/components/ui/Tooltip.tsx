import React, { useState } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delay?: number;
}

export function Tooltip({ content, children, side = 'top', align = 'center', delay = 0 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  // Simplified positioning logic for this playground version
  // In a real app, we'd use something like floating-ui for precise positioning
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block w-full h-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="cursor-default w-full h-full block">
        {children}
      </div>
      
      {isVisible && (
        <div className={`absolute z-50 ${positionClasses[side]} whitespace-nowrap`}>
          <div className="rounded bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-md animate-in fade-in zoom-in-95">
            {content}
            {/* Simple arrow implementation */}
            <div className="absolute w-2 h-2 bg-gray-900 rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
          </div>
        </div>
      )}
    </div>
  );
}
