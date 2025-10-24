'use server';

import { fetchData } from '@/lib/api';

interface DeleteCouponParams {
  eventId: string;
  couponId: string;
  token: string;
}

export async function deleteCoupon({
  eventId,
  couponId,
  token
}: DeleteCouponParams): Promise<void> {
  await fetchData(
    `/evenements/${eventId}/coupons/${couponId}`,
    'DELETE',
    null,
    token
  );
}
