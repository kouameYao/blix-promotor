'use server';

import { fetchData } from '@/lib/api';
import { ApiResponse } from '@/types/api-response';
import { TEvent } from '@/types/event';

interface GetEventParams {
  eventId: string;
  token: string;
}

export async function getEvent({
  eventId,
  token
}: GetEventParams): Promise<ApiResponse<TEvent>> {
  const response = await fetchData(
    `/evenements/${eventId}`,
    'GET',
    null,
    token
  );

  return response;
}
