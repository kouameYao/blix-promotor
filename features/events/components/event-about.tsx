'use client';

import { Card } from '@/components/ui/card';
import { TEvent } from '@/types/event';

interface EventAboutProps {
  event: TEvent;
}

export function EventAbout({ event }: EventAboutProps) {
  return (
    <Card className="bg-white border-0">
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          À propos de l'événement
        </h2>

        <p className="text-gray-700 leading-relaxed text-wrap">
          {event.description}
        </p>
      </div>
    </Card>
  );
}
