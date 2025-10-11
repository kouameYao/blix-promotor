'use client';

import { cn } from '@/lib/utils';

interface EventContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function EventContentWrapper({
  children,
  className
}: EventContentWrapperProps) {
  return (
    <div
      className={cn(
        'min-h-screen bg-gray-50 transition-all duration-300',
        'xl:ml-[240px]',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
