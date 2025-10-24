'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import { COUPONS_QUERY_KEY } from '@/constants/query-keys';
import { CouponFormData, Coupon } from '@/features/coupons/types/coupon';
import { successClx, errorClx } from '@/styles/toast';

interface UseCouponsProps {
  eventId: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export function useCoupons({
  eventId,
  page = 0,
  size = 10,
  sort
}: UseCouponsProps) {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string })?.token;
  const queryClient = useQueryClient();

  // État local pour les modales
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

  const query = useQuery({
    queryKey: [COUPONS_QUERY_KEY, eventId, page, size, sort, token],
    queryFn: async () => {
      const { getCoupons } = await import('../api/get-coupons');
      return getCoupons({ eventId, page, size, sort, token: token || '' });
    },
    enabled: !!token && !!eventId
  });

  const createMutation = useMutation({
    mutationFn: async ({ couponData }: { couponData: CouponFormData }) => {
      const { createCoupon } = await import('../api/create-coupon');
      return createCoupon({ eventId, couponData, token: token || '' });
    },
    onSuccess: () => {
      toast.success('Coupon créé avec succès', {
        className: successClx
      });
      queryClient.invalidateQueries({
        queryKey: [COUPONS_QUERY_KEY, eventId]
      });
      setShowFormModal(false);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || 'Erreur lors de la création du coupon';
      toast.error(errorMessage, {
        className: errorClx
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ couponId }: { couponId: string }) => {
      const { deleteCoupon } = await import('../api/delete-coupon');
      return deleteCoupon({ eventId, couponId, token: token || '' });
    },
    onSuccess: () => {
      toast.success('Coupon supprimé avec succès', {
        className: successClx
      });
      queryClient.invalidateQueries({
        queryKey: [COUPONS_QUERY_KEY, eventId]
      });
      setShowDeleteModal(false);
      setCouponToDelete(null);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || 'Erreur lors de la suppression du coupon';
      toast.error(errorMessage, {
        className: errorClx
      });
    }
  });

  // Handlers pour les modales
  const handleAddCoupon = () => {
    setShowFormModal(true);
  };

  const handleViewCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setShowDetailsModal(true);
  };

  const handleDeleteCoupon = (coupon: Coupon) => {
    setCouponToDelete(coupon);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (couponToDelete) {
      deleteMutation.mutate({ couponId: couponToDelete.id });
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCouponToDelete(null);
  };

  const handleSaveCoupon = (couponData: CouponFormData) => {
    createMutation.mutate({ couponData });
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedCoupon(null);
  };

  return {
    coupons: query.data?.data || [],
    selectedCoupon,
    showFormModal,
    showDetailsModal,
    showDeleteModal,
    couponToDelete,
    isLoading: query.isLoading,
    error: query.error,
    isDeleting: deleteMutation.isPending,
    isCreating: createMutation.isPending,
    handleAddCoupon,
    handleViewCoupon,
    handleDeleteCoupon,
    handleConfirmDelete,
    handleCancelDelete,
    handleSaveCoupon,
    handleCloseFormModal,
    handleCloseDetailsModal
  };
}
