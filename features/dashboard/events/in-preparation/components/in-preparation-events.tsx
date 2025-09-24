'use client';

import { CalendarClock } from 'lucide-react';
import React from 'react';

import { EmptyState } from '@/components/common/empty-state';

export const InPreparationEventsList = () => {
  return (
    <EmptyState
      icon={<CalendarClock className="text-gray-600" />}
      message="Aucun événement en préparation trouvé"
      buttonText="Ajouter un événement"
      onButtonClick={() => console.log('Add event clicked')}
    />
  );
};
