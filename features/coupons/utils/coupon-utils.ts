import { Coupon, CouponFormData } from '@/features/coupons/types/coupon';

export const INITIAL_FORM_DATA: CouponFormData = {
  evenementId: '',
  code: '',
  description: '',
  valeur: 0,
  dateFin: new Date(),
  utilisationMax: 1,
  type: null
};

export const formatCurrentDate = (): string => {
  return new Date().toLocaleString('fr-FR');
};

export const validateCouponForm = (formData: CouponFormData): boolean => {
  return Boolean(
    formData.code.trim() &&
      formData.description.trim() &&
      formData.valeur > 0 &&
      formData.type &&
      formData.evenementId.trim()
  );
};

export const getCouponTypeLabel = (type: string | null): string => {
  switch (type) {
    case 'POURCENTAGE':
      return 'Pourcentage';
    case 'FIXE':
      return 'Montant fixe';
    default:
      return 'Non défini';
  }
};

export const formatCouponValue = (coupon: Coupon): string => {
  if (coupon.type === 'POURCENTAGE') {
    return `${coupon.valeur}%`;
  } else if (coupon.type === 'FIXE') {
    return `${coupon.valeur} F CFA`;
  }
  return `${coupon.valeur}`;
};
