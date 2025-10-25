'use server';

import { fetchData } from '@/lib/api';
import { ApiListResponse } from '@/types/api-response';
import { TEvent } from '@/types/event';

interface GetEventsParams {
  token: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export async function getEvents({
  page,
  size,
  sort,
  token
}: GetEventsParams): Promise<ApiListResponse<TEvent>> {
  const response = await fetchData(
    `/evenements?page=${page}&size=${size}`,
    'GET',
    null,
    token
  );

  return response;
}
