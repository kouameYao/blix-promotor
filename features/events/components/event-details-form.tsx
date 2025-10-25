'use client';

import { Card } from '@/components/ui/card';
import { TEvent } from '@/types/event';

interface EventDetailsFormProps {
  event: TEvent;
}

export function EventDetailsForm({ event }: EventDetailsFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Détails de l'événement
        </h1>
        <p className="text-gray-600">
          Informations complètes sur l'événement "{event.description}"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Informations générales</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Titre</label>
              <p className="text-gray-900">{event.description}</p>
            </div>
            {event.sousTitre && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Sous-titre
                </label>
                <p className="text-gray-900">{event.sousTitre}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-500">
                Code événement
              </label>
              <p className="text-gray-900 font-mono">{event.code}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Statut
              </label>
              <p className="text-gray-900">{event.statut}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Lieu et date</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Adresse
              </label>
              <p className="text-gray-900">{event.adresse}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Ville</label>
              <p className="text-gray-900">{event.ville}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Date de début
              </label>
              <p className="text-gray-900">{event.dateheureDebut}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Portée
              </label>
              <p className="text-gray-900">{event.portee}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Catégorie</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Catégorie
              </label>
              <p className="text-gray-900">{event.categorie.libelle}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Contact</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Ligne d'information
              </label>
              <p className="text-gray-900">{event.infoline}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
