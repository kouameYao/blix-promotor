'use client';

import React from 'react';

import { Button } from '@/components/ui/button';

type EmptyStateProps = {
  icon: React.ReactNode;
  message: string;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  message = 'No data found',
  buttonText,
  onButtonClick,
  className
}) => {
  return (
    <div
      className={`flex h-full min-h-[55vh] py-5 md:py-8 items-center justify-center rounded-2xl bg-[#f8f8f8] ${className}`}
    >
      <div className="inline-flex w-full flex-col items-center justify-center space-y-3">
        {/* Icon */}
        {icon && (
          <div className="flex size-24 items-center justify-center rounded-full bg-white md:size-20">
            {icon}
          </div>
        )}

        {/* Message + Button */}
        <div className="flex flex-col items-center leading-5">
          <span className="text-xs text-[#7d7d7d]">{message}</span>

          {buttonText && (
            <Button
              variant="default"
              onClick={onButtonClick}
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
