import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import { COUPONS_QUERY_KEY } from '@/constants/query-keys';
import { ApiError, api } from '@/lib/api-client';
import { errorClx, successClx } from '@/styles/toast';

interface DeleteCouponParams {
  eventId: string;
  couponId: string;
  token: string;
}

export const deleteCoupon = async ({
  eventId,
  couponId,
  token
}: DeleteCouponParams): Promise<void> => {
  await api.delete(`/evenements/${eventId}/coupons/${couponId}`, { token });
};

export const useDeleteCoupon = () => {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string })?.token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, couponId }: Omit<DeleteCouponParams, 'token'>) =>
      deleteCoupon({ eventId, couponId, token }),
    onSuccess: (_, { eventId }) => {
      toast.success('Coupon supprimé avec succès', {
        className: successClx
      });
      queryClient.invalidateQueries({
        queryKey: [COUPONS_QUERY_KEY, eventId]
      });
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Erreur lors de la suppression du coupon';
      toast.error(errorMessage, {
        className: errorClx
      });
    }
  });
};
