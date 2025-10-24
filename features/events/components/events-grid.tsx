'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { TEvent } from '@/types/event';

import { EventCard } from './event-card';

interface EventsGridProps {
  events: TEvent[];
  onCreateEvent?: () => void;
}

export function EventsGrid({ events, onCreateEvent }: EventsGridProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-24 h-24 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Aucun événement trouvé
        </h3>
        <p className="text-gray-600 mb-6">
          Vous n'avez pas encore créé d'événements.
        </p>
        <Button
          className="bg-primary hover:bg-primary/90 text-white"
          onClick={onCreateEvent}
        >
          <Plus className="h-4 w-4 mr-2" />
          Créer votre premier événement
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
