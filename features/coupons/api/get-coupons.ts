'use server';

import { Coupon } from '@/features/coupons/types/coupon';
import { fetchData } from '@/lib/api';
import { ApiListResponse } from '@/types/api-response';

interface GetCouponsParams {
  eventId: string;
  token: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export async function getCoupons({
  eventId,
  page = 0,
  size = 10,
  sort,
  token
}: GetCouponsParams): Promise<ApiListResponse<Coupon>> {
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('size', size.toString());
  if (sort) sort.forEach((s) => queryParams.append('sort', s));

  const response = await fetchData(
    `/evenements/${eventId}/coupons?${queryParams.toString()}`,
    'GET',
    null,
    token
  );

  return response;
}
