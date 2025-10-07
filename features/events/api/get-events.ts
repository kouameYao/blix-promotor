import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { EVENTS_QUERY_KEY } from '@/constants/query-keys';
import { api } from '@/lib/api-client';
import { ApiListResponse } from '@/types/api-response';
import { TEvent } from '@/types/event';

interface GetEventsParams {
  token: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export const getEvents = async ({
  page,
  size,
  sort,
  token
}: GetEventsParams): Promise<ApiListResponse<TEvent>> => {
  const response = await api.get(`/evenements?page=${page}&size=${size}`, {
    token
  });

  return response as ApiListResponse<TEvent>;
};

export const useGetEvents = ({
  page,
  size,
  sort
}: Omit<GetEventsParams, 'token'>) => {
  const { data: session } = useSession();
  const token = (session?.user as any)?.token;

  return useQuery({
    queryKey: [EVENTS_QUERY_KEY, page, size, sort, token],
    queryFn: () => getEvents({ page, size, sort, token }),
    enabled: !!token
  });
};
