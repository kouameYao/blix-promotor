'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { EVENT_QUERY_KEY, EVENTS_QUERY_KEY } from '@/constants/query-keys';

import { getEvent } from '../api/get-event';
import { getEvents } from '../api/get-events';

interface UseEventsProps {
  page?: number;
  size?: number;
  sort?: string[];
}

export function useEvents({ page = 0, size = 10, sort }: UseEventsProps) {
  const { data: session } = useSession();
  const token = (session?.user as any)?.token;

  return useQuery({
    queryKey: [EVENTS_QUERY_KEY, page, size, sort, token],
    queryFn: () => getEvents({ page, size, sort, token }),
    enabled: !!token
  });
}

export function useGetEvent({ eventId }: { eventId: string }) {
  const { data: session } = useSession();
  const token = (session?.user as any)?.token;

  return useQuery({
    queryKey: [EVENT_QUERY_KEY, eventId, token],
    queryFn: () => getEvent({ eventId, token }),
    enabled: !!eventId && !!token
  });
}
