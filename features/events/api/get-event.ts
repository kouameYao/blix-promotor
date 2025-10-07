import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { EVENTS_QUERY_KEY } from '@/constants/query-keys';
import { api } from '@/lib/api-client';
import { ApiResponse } from '@/types/api-response';
import { TEvent } from '@/types/event';

interface GetEventParams {
  eventId: string;
  token: string;
}

export const getEvent = async ({
  eventId,
  token
}: GetEventParams): Promise<ApiResponse<TEvent>> => {
  const response = await api.get(`/evenements/${eventId}`, { token });
  return response as ApiResponse<TEvent>;
};

export const useGetEvent = ({ eventId }: Omit<GetEventParams, 'token'>) => {
  const { data: session } = useSession();
  const token = (session?.user as any)?.token;

  console.log('token-useGetEvent', token);

  return useQuery({
    queryKey: [EVENTS_QUERY_KEY, eventId],
    queryFn: () => getEvent({ eventId, token })
  });
};
