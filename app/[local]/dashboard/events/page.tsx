import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { getEvents } from '@/features/events/api/get-events';

import EventsListClient from './events-list-client';

export default async function EventsListPage() {
  const session = await auth();

  if (!session || !session.user) {
    return redirect('/fr/login');
  }

  const token = (session.user as any)?.token;

  if (!token) {
    return redirect('/fr/login');
  }

  console.log('token', token);

  try {
    const eventsResponse = await getEvents({
      page: 0,
      size: 10,
      token
    });

    console.log('eventsResponse', eventsResponse);

    return (
      <div className="bg-white">
        <main className="mx-auto max-w-[1400px] p-8">
          <EventsListClient
            initialEvents={eventsResponse?.data || []}
            user={session.user}
          />
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error fetching events:', error);
    return (
      <div className="bg-white">
        <main className="mx-auto max-w-[1400px] p-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Erreur de chargement
              </h2>
              <p className="text-gray-600">
                Impossible de charger les événements
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
