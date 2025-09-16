import React from 'react';

import { cn } from '@/lib/utils';

import { Label } from '../ui/label';

export const InputLabel = ({
  className,
  htmlFor,
  required,
  children
}: {
  htmlFor: string;
  required?: boolean;
  className?: string;
  children: string;
}) => {
  return (
    <Label htmlFor={htmlFor} className={cn('mb-2 font-normal', className)}>
      {children} {required && <span className="required-asterix">*</span>}
    </Label>
  );
};
