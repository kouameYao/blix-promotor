'use client';

import { Card } from '@/components/ui/card';
import { useGetEvent } from '@/features/events/api/get-event';

interface EventDetailsPageProps {
  params: { id: string };
}

export default function EventDetailsPage({ params }: EventDetailsPageProps) {
  const {
    data: eventResponse,
    isLoading,
    error
  } = useGetEvent({
    eventId: params.id
  });

  const eventData = eventResponse?.data;

  if (isLoading) {
    return (
      <div className="min-h-[80vh] rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des détails...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !eventData) {
    return (
      <div className="min-h-[80vh] rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Erreur de chargement
            </h2>
            <p className="text-gray-600">
              Impossible de charger les détails de l'événement
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Détails de l'événement
        </h1>
        <p className="text-gray-600">
          Informations complètes sur l'événement "{eventData.description}"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Informations générales</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Titre</label>
              <p className="text-gray-900">{eventData.description}</p>
            </div>
            {eventData.sousTitre && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Sous-titre
                </label>
                <p className="text-gray-900">{eventData.sousTitre}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-500">
                Code événement
              </label>
              <p className="text-gray-900 font-mono">{eventData.code}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Statut
              </label>
              <p className="text-gray-900">{eventData.statut}</p>
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
              <p className="text-gray-900">{eventData.adresse}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Ville</label>
              <p className="text-gray-900">{eventData.ville}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Date de début
              </label>
              <p className="text-gray-900">{eventData.dateheureDebut}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Portée
              </label>
              <p className="text-gray-900">{eventData.portee}</p>
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
              <p className="text-gray-900">{eventData.categorie.libelle}</p>
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
              <p className="text-gray-900">{eventData.infoline}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
