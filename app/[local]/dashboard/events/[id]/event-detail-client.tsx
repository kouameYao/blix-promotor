'use client';

import {
  EventDetailHeader,
  EventHero,
  EventTicketsDistribution,
  EventDetailsInfo,
  EventAbout
} from '@/features/events/components';
import { TEvent } from '@/types/event';

interface EventDetailClientProps {
  event: TEvent;
  user: any;
}

export default function EventDetailClient({
  event,
  user
}: EventDetailClientProps) {
  const handleShare = () => {
    // TODO: Implémenter la logique de partage
    console.log("Partager l'événement");
  };

  const handleEdit = () => {
    // TODO: Implémenter la logique d'édition
    console.log("Modifier l'événement");
  };

  return (
    <div className="">
      <EventDetailHeader onShare={handleShare} onEdit={handleEdit} />

      <EventHero event={event} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <EventTicketsDistribution event={event} />
            <EventDetailsInfo event={event} />
          </div>

          <div className="space-y-8">
            <EventAbout event={event} />
          </div>
        </div>
      </div>
    </div>
  );
}
