'use client';

import { CalendarCheck } from 'lucide-react';
import React from 'react';

import { EmptyState } from '@/components/common/empty-state';

export const PastEventsList = () => {
  return (
    <EmptyState
      icon={<CalendarCheck className="text-gray-600" />}
      message="Aucun événement passé trouvé"
      buttonText="Ajouter un événement"
      onButtonClick={() => console.log('Add event clicked')}
    />
  );
};
