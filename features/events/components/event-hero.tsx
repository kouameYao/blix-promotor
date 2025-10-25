'use client';

import { DollarSign, TrendingUp, Users, Ticket } from 'lucide-react';
import Image from 'next/image';

import { Card } from '@/components/ui/card';
import { TEvent } from '@/types/event';

interface EventHeroProps {
  event: TEvent;
}

export function EventHero({ event }: EventHeroProps) {
  const billetsVendus = event?.statistique?.billetsVendus;
  const totalRevenue = event?.statistique?.montantTotal;
  const panierMoyen = event?.statistique?.panierMoyen;
  const tauxRemplissage = event?.statistique?.tauxRemplissage;

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        <div className="relative">
          <Image
            src={
              event.imagePrincipale ||
              'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
            }
            alt={event.description}
            width={1920}
            height={600}
            className="w-full h-[500px] object-cover"
            priority
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Revenus générés</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalRevenue?.toLocaleString()} FCFA
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Potentiel restant</p>
              <p className="text-2xl font-bold text-gray-900">
                {panierMoyen?.toFixed(2)} FCFA
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Participants</p>
              <p className="text-2xl font-bold text-gray-900">
                {billetsVendus}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Ticket className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Taux de remplissage</p>
              <p className="text-2xl font-bold text-gray-900">
                {(tauxRemplissage || 0) * 100}%
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
