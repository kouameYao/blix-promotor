'use client';

import { Card } from '@/components/ui/card';
import { TEvent } from '@/types/event';

interface EventTicketsDistributionProps {
  event: TEvent;
}

export function EventTicketsDistribution({
  event
}: EventTicketsDistributionProps) {
  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold mb-4">
        Répartition par type de ticket
      </h2>
      <div className="space-y-4">
        {event.tarifications.map((ticket) => {
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
  );
}
