'use client';

import { Ticket, Users, CheckCircle2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useGetEvent } from '@/features/events/api/get-event';

interface EventTarificationsPageProps {
  params: { id: string };
}

export default function EventTarificationsPage({
  params
}: EventTarificationsPageProps) {
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
            <p className="text-gray-600">Chargement des tarifications...</p>
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
              Impossible de charger les tarifications de l'événement
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
          Gestion des tarifications
        </h1>
        <p className="text-gray-600">
          Types de billets disponibles pour "{eventData.description}"
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {eventData.tarifications.map((ticket, index) => (
          <Card key={ticket.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {ticket.libelle}
                  </h3>
                  {ticket.description && (
                    <p className="text-gray-600">{ticket.description}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {ticket.prix.toLocaleString()} FCFA
                </p>
                <p className="text-sm text-gray-600">par billet</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Total disponibles:
                </span>
                <span className="font-semibold">{ticket.qteTotale}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">Restants:</span>
                <span className="font-semibold text-green-600">
                  {ticket.qteRestante}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Disponibilité</span>
                <span className="text-sm font-medium">
                  {(
                    ((ticket.qteTotale - ticket.qteRestante) /
                      ticket.qteTotale) *
                    100
                  ).toFixed(0)}
                  % vendus
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((ticket.qteTotale - ticket.qteRestante) /
                        ticket.qteTotale) *
                      100
                    }%`
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge
                variant={ticket.qteRestante > 0 ? 'default' : 'destructive'}
                className={
                  ticket.qteRestante > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }
              >
                {ticket.qteRestante > 0 ? 'Disponible' : 'Épuisé'}
              </Badge>
              <div className="text-sm text-gray-500">ID: {ticket.id}</div>
            </div>
          </Card>
        ))}
      </div>

      {eventData.tarifications.length === 0 && (
        <Card className="p-8 text-center">
          <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucune tarification disponible
          </h3>
          <p className="text-gray-600">
            Aucun type de tarification n'a été configuré pour cet événement.
          </p>
        </Card>
      )}
    </div>
  );
}
