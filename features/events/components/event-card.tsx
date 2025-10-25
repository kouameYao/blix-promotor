'use client';

import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  MoreVertical
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TEvent } from '@/types/event';

interface EventCardProps {
  event: TEvent;
}

export function EventCard({ event }: EventCardProps) {
  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'PUBLIE':
        return 'bg-green-500 text-white';
      case 'BROUILLON':
        return 'bg-secondary text-white';
      case 'TERMINE':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case 'PUBLIE':
        return 'Publié';
      case 'BROUILLON':
        return 'Brouillon';
      case 'TERMINE':
        return 'Terminé';
      default:
        return statut;
    }
  };

  return (
    <Link href={`/fr/dashboard/events/${event.id}`}>
      <Card className="group overflow-hidden border border-gray-200 bg-white">
        {/* Image Section */}
        <div className="relative p-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src={event.imagePrincipale || '/placeholder.svg'}
              alt={event.description}
              fill
              className="object-cover"
            />
            {/* Status Badge */}
            <div
              className={`absolute left-3 top-3 rounded px-2 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(event.statut)}`}
            >
              {getStatusLabel(event.statut)}
            </div>
            {/* Tickets Badge */}
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded bg-secondary px-2 py-1 text-xs font-semibold text-white">
              <DollarSign className="h-3 w-3" />
              {event.tarifications.length > 0
                ? Math.min(
                    ...event.tarifications.map((t) => t.prix)
                  ).toLocaleString()
                : 'N/A'}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-3 p-4 pt-2">
          <div className="text-xs text-gray-500">
            Créé le: {event.createdAt}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
            {event.description}
          </h3>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-red-500" />
              {event.ville} - {event.adresse}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-blue-500" />
              {event.dateheureDebut}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                  {event.categorie.libelle}
                </span>
                <span className="px-2 py-1 bg-secondary-light/20 text-secondary rounded text-xs font-medium">
                  {event.portee}
                </span>
              </div>
              {event.tarifications.length > 0 && (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    Prix:{' '}
                    {Math.min(
                      ...event.tarifications.map((t) => t.prix)
                    ).toLocaleString()}{' '}
                    FCFA
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-blue-500" />
                    Places disponibles:{' '}
                    {event.tarifications.reduce(
                      (acc, ticket) => acc + ticket.qteRestante,
                      0
                    )}
                  </div>
                </>
              )}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

