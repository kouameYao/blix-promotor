import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import { COUPONS_QUERY_KEY } from '@/constants/query-keys';
import { CouponFormData } from '@/features/coupons/types/coupon';
import { api } from '@/lib/api-client';
import { successClx } from '@/styles/toast';

interface CreateCouponParams {
  eventId: string;
  couponData: CouponFormData;
  token: string;
}

export const createCoupon = async ({
  eventId,
  couponData,
  token
}: CreateCouponParams): Promise<void> => {
  await api.post(`/evenements/coupons`, couponData, { token });
};

export const useCreateCoupon = () => {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string })?.token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, couponData }: Omit<CreateCouponParams, 'token'>) =>
      createCoupon({ eventId, couponData, token }),
    onSuccess: (_, { eventId }) => {
      toast.success('Coupon créé avec succès', {
        className: successClx
      });
      queryClient.invalidateQueries({
        queryKey: [COUPONS_QUERY_KEY, eventId]
      });
    }
  });
};
