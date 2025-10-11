import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { COUPONS_QUERY_KEY } from '@/constants/query-keys';
import { Coupon } from '@/features/coupons/types/coupon';
import { api } from '@/lib/api-client';
import { ApiListResponse } from '@/types/api-response';

interface GetCouponsParams {
  eventId: string;
  token: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export const getCoupons = async ({
  eventId,
  page,
  size,
  sort,
  token
}: GetCouponsParams): Promise<ApiListResponse<Coupon>> => {
  const response = await api.get(
    `/evenements/${eventId}/coupons?page=${page}&size=${size}`,
    { token }
  );

  return response as ApiListResponse<Coupon>;
};

export const useGetCoupons = ({
  eventId,
  page,
  size,
  sort
}: Omit<GetCouponsParams, 'token'>) => {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string })?.token;

  return useQuery({
    queryKey: [COUPONS_QUERY_KEY, eventId, page, size, sort, token],
    queryFn: () => getCoupons({ eventId, page, size, sort, token }),
    enabled: !!token && !!eventId
  });
};
