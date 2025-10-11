'use client';

import { Users, UserCheck, UserX, Clock } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { useGetEvent } from '@/features/events/api/get-event';

interface EventParticipantsPageProps {
  params: { id: string };
}

export default function EventParticipantsPage({
  params
}: EventParticipantsPageProps) {
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
            <p className="text-gray-600">Chargement des participants...</p>
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
              Impossible de charger les participants de l'événement
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculer les statistiques des participants
  const totalTickets = eventData.tarifications.reduce(
    (sum, ticket) => sum + ticket.qteTotale,
    0
  );
  const soldTickets = eventData.tarifications.reduce(
    (sum, ticket) => sum + (ticket.qteTotale - ticket.qteRestante),
    0
  );
  const remainingTickets = totalTickets - soldTickets;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Participants</h1>
        <p className="text-gray-600">
          Gestion des participants pour "{eventData.description}"
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total participants</p>
              <p className="text-2xl font-bold text-gray-900">{soldTickets}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tickets vendus</p>
              <p className="text-2xl font-bold text-gray-900">{soldTickets}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <UserX className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tickets restants</p>
              <p className="text-2xl font-bold text-gray-900">
                {remainingTickets}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Répartition par type de ticket */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">
          Répartition par type de ticket
        </h2>
        <div className="space-y-4">
          {eventData.tarifications.map((ticket) => {
            const sold = ticket.qteTotale - ticket.qteRestante;
            const percentage = (sold / ticket.qteTotale) * 100;

            return (
              <div key={ticket.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {ticket.libelle.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {ticket.libelle}
                      </p>
                      <p className="text-sm text-gray-600">
                        {ticket.prix.toLocaleString()} FCFA
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {sold} / {ticket.qteTotale} vendus
                    </p>
                    <p className="text-xs text-gray-500">
                      {percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Placeholder pour la liste des participants */}
      <Card className="p-8 text-center">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Liste des participants
        </h3>
        <p className="text-gray-600">
          La fonctionnalité de gestion détaillée des participants sera bientôt
          disponible.
        </p>
      </Card>
    </div>
  );
}
