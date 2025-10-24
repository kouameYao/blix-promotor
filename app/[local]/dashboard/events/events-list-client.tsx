'use client';

import {
  EventsHeader,
  SearchAndFilters,
  EventsGrid
} from '@/features/events/components';
import { TEvent } from '@/types/event';

interface EventsListClientProps {
  initialEvents: TEvent[];
  user: any;
}

export default function EventsListClient({
  initialEvents,
  user
}: EventsListClientProps) {
  const handleAddEvent = () => {
    // TODO: Implémenter la logique d'ajout d'événement
    console.log('Ajouter un événement');
  };

  const handleSearch = (query: string) => {
    // TODO: Implémenter la logique de recherche
    console.log('Recherche:', query);
  };

  const handleFiltersChange = (filters: any) => {
    // TODO: Implémenter la logique de filtrage
    console.log('Filtres:', filters);
  };

  return (
    <>
      <EventsHeader onAddEvent={handleAddEvent} />

      <SearchAndFilters
        onSearch={handleSearch}
        onFiltersChange={handleFiltersChange}
      />

      <EventsGrid events={initialEvents} onCreateEvent={handleAddEvent} />
    </>
  );
}

