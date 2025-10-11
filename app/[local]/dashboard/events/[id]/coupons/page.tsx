'use client';

import { Dialog } from '@/components/ui/dialog';
import {
  CouponsTable,
  CouponForm,
  CouponDetails,
  DeleteCouponModal
} from '@/features/coupons/components';
import { useCoupons } from '@/features/coupons/hooks/use-coupons';

export default function CouponsPage() {
  const {
    coupons,
    selectedCoupon,
    showFormModal,
    showDetailsModal,
    showDeleteModal,
    couponToDelete,
    isLoading,
    error,
    isDeleting,
    isCreating,
    handleAddCoupon,
    handleViewCoupon,
    handleDeleteCoupon,
    handleConfirmDelete,
    handleCancelDelete,
    handleSaveCoupon,
    handleCloseFormModal,
    handleCloseDetailsModal
  } = useCoupons();

  const actionHandlers = {
    onView: handleViewCoupon,
    onDelete: handleDeleteCoupon
  };

  return (
    <div className="container mx-auto py-6">
      <CouponsTable
        coupons={coupons}
        handlers={actionHandlers}
        onAddCoupon={handleAddCoupon}
        isLoading={isLoading}
        error={error}
      />

      <Dialog open={showFormModal} onOpenChange={handleCloseFormModal}>
        <CouponForm
          onSubmit={handleSaveCoupon}
          onCancel={handleCloseFormModal}
          isLoading={isCreating}
        />
      </Dialog>

      <Dialog open={showDetailsModal} onOpenChange={handleCloseDetailsModal}>
        {selectedCoupon && (
          <CouponDetails
            coupon={selectedCoupon}
            onClose={handleCloseDetailsModal}
          />
        )}
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={handleCancelDelete}>
        {couponToDelete && (
          <DeleteCouponModal
            couponCode={couponToDelete.code}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            isDeleting={isDeleting}
          />
        )}
      </Dialog>
    </div>
  );
}
