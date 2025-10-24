'use client';

import {
  Activity,
  Calendar,
  MapPin,
  Mic,
  Globe,
  Hash,
  Building2,
  Phone
} from 'lucide-react';

import { Card } from '@/components/ui/card';
import { TEvent } from '@/types/event';

interface EventDetailsInfoProps {
  event: TEvent;
}

export function EventDetailsInfo({ event }: EventDetailsInfoProps) {
  const formatDateTime = (dateString: string) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');

    return `${day}/${month}/${year} ${timePart}`;
  };

  const getStatutLabel = (statut: string) => {
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
    <Card className="bg-white border-0">
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <Activity className="w-6 h-6 mr-3 text-primary" />
          Informations détaillées
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Date et heure</p>
              <p className="font-semibold text-gray-900">
                {formatDateTime(event.dateheureDebut)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#6b7280] rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Lieu</p>
              <p className="font-semibold text-gray-900">
                {event.adresse}, {event.ville}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Mic className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Catégorie</p>
              <p className="font-semibold text-gray-900">
                {event.categorie.libelle}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Portée</p>
              <p className="font-semibold text-gray-900">{event.portee}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Hash className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Code événement</p>
              <p className="font-semibold text-gray-900">{event.code}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Statut</p>
              <p className="font-semibold text-gray-900">
                {getStatutLabel(event.statut)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Type de lieu</p>
              <p className="font-semibold text-gray-900">PRESENTIEL</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <span className="text-gray-700">Contact</span>
              </p>
              <p className="font-semibold text-gray-900">
                <span className="text-gray-700">{event.infoline}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
