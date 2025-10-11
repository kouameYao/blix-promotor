import { useParams } from 'next/navigation';
import { useState } from 'react';
// import toast from 'react-hot-toast';

import {
  useGetCoupons,
  useDeleteCoupon,
  useCreateCoupon
} from '@/features/coupons/api';
import { Coupon, CouponFormData } from '@/features/coupons/types/coupon';
import { CouponFormSchema } from '@/features/coupons/utils/coupon-form-schema';

export function useCoupons() {
  const params = useParams();
  const eventId = params.id as string;

  const { data: couponsData, isLoading, error } = useGetCoupons({ eventId });
  const deleteCouponMutation = useDeleteCoupon();
  const createCouponMutation = useCreateCoupon();

  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

  console.log('couponsData', couponsData);

  const coupons = couponsData?.data || [];

  const resetForm = () => {
    // Le formulaire est maintenant géré par React Hook Form
    // Pas besoin de reset manuel
  };

  const handleAddCoupon = () => {
    resetForm();
    setShowFormModal(true);
  };

  const handleViewCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setShowDetailsModal(true);
  };

  const handleDeleteCoupon = (id: string) => {
    const coupon = coupons.find((c) => c.id === id);
    if (coupon) {
      setCouponToDelete(coupon);
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = () => {
    if (couponToDelete) {
      deleteCouponMutation.mutate({
        eventId,
        couponId: couponToDelete.id
      });
      setShowDeleteModal(false);
      setCouponToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCouponToDelete(null);
  };

  const handleSaveCoupon = (data: CouponFormSchema) => {
    const couponData: CouponFormData = {
      evenementId: eventId,
      code: data.code,
      description: data.description,
      valeur: data.valeur,
      dateFin: data.dateFin,
      utilisationMax: data.utilisationMax,
      type: data.type
    };

    createCouponMutation.mutate(
      {
        eventId,
        couponData
      },
      {
        onSuccess: () => {
          setShowFormModal(false);
        },
        onError: (error) => {
          console.log('error - create coupon', error);
          // toast.error(error.message, {
          //   className: errorToastClasses
          // });
          window.alert(error.message);
        }
      }
    );
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    resetForm();
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedCoupon(null);
  };

  return {
    coupons,
    selectedCoupon,
    showFormModal,
    showDetailsModal,
    showDeleteModal,
    couponToDelete,
    isLoading,
    error,
    isDeleting: deleteCouponMutation.isPending,
    isCreating: createCouponMutation.isPending,
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
