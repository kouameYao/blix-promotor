'use client';

import { BarChart3, TrendingUp, Users, Ticket, DollarSign } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { useGetEvent } from '@/features/events/api/get-event';

interface EventStatisticsPageProps {
  params: { id: string };
}

export default function EventStatisticsPage({
  params
}: EventStatisticsPageProps) {
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
            <p className="text-gray-600">Chargement des statistiques...</p>
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
              Impossible de charger les statistiques de l'événement
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculer les statistiques
  const totalTickets = eventData.tarifications.reduce(
    (sum, ticket) => sum + ticket.qteTotale,
    0
  );
  const soldTickets = eventData.tarifications.reduce(
    (sum, ticket) => sum + (ticket.qteTotale - ticket.qteRestante),
    0
  );
  const remainingTickets = totalTickets - soldTickets;
  const totalRevenue = eventData.tarifications.reduce(
    (sum, ticket) =>
      sum + ticket.prix * (ticket.qteTotale - ticket.qteRestante),
    0
  );
  const potentialRevenue = eventData.tarifications.reduce(
    (sum, ticket) => sum + ticket.prix * ticket.qteTotale,
    0
  );
  const conversionRate =
    totalTickets > 0 ? (soldTickets / totalTickets) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Statistiques</h1>
        <p className="text-gray-600">
          Analyse des performances pour "{eventData.description}"
        </p>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Participants</p>
              <p className="text-2xl font-bold text-gray-900">{soldTickets}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Ticket className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Taux de conversion</p>
              <p className="text-2xl font-bold text-gray-900">
                {conversionRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>

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
                {potentialRevenue?.toLocaleString()} FCFA
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Graphiques et analyses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary" />
            Répartition des ventes
          </h2>
          <div className="space-y-4">
            {eventData.tarifications.map((ticket) => {
              const sold = ticket.qteTotale - ticket.qteRestante;
              const percentage =
                ticket.qteTotale > 0 ? (sold / ticket.qteTotale) * 100 : 0;
              const revenue = sold * ticket.prix;

              return (
                <div key={ticket.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {ticket.libelle}
                      </p>
                      <p className="text-sm text-gray-600">
                        {ticket.prix.toLocaleString()} FCFA
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{sold} vendus</p>
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
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Revenus: {revenue.toLocaleString()} FCFA</span>
                    <span>{ticket.qteRestante} restants</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            Analyse des performances
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Capacité totale</span>
              <span className="font-semibold">{totalTickets} tickets</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-600">Tickets vendus</span>
              <span className="font-semibold text-green-700">
                {soldTickets} tickets
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-sm text-gray-600">Tickets restants</span>
              <span className="font-semibold text-orange-700">
                {remainingTickets} tickets
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-600">Taux de remplissage</span>
              <span className="font-semibold text-blue-700">
                {conversionRate.toFixed(1)}%
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Placeholder pour les graphiques avancés */}
      <Card className="p-8 text-center">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Graphiques avancés
        </h3>
        <p className="text-gray-600">
          Les graphiques détaillés et l'analyse temporelle seront bientôt
          disponibles.
        </p>
      </Card>
    </div>
  );
}
