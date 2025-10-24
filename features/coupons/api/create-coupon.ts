'use server';

import { CouponFormData } from '@/features/coupons/types/coupon';
import { fetchData } from '@/lib/api';

interface CreateCouponParams {
  eventId: string;
  couponData: CouponFormData;
  token: string;
}

export async function createCoupon({
  eventId,
  couponData,
  token
}: CreateCouponParams): Promise<void> {
  await fetchData(`/evenements/${eventId}/coupons`, 'POST', couponData, token);
}
