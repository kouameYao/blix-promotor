'use client';

import { CalendarDays } from 'lucide-react';
import React from 'react';

import { EmptyState } from '@/components/common/empty-state';

export const UpcomingEventsList = () => {
  return (
    <EmptyState
      icon={<CalendarDays className="text-gray-600" />}
      message="Aucun événement à venir trouvé"
      buttonText="Ajouter un événement"
      onButtonClick={() => console.log('Add event clicked')}
    />
  );
};
