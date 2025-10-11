export type CouponType = 'POURCENTAGE' | 'FIXE' | null;

export type Coupon = {
  id: string;
  code: string;
  description: string;
  valeur: number;
  utilisationMax: number;
  utilisationUtilise: number;
  active: boolean;
  type: CouponType;
  dateCreation: Date;
};

export type CouponFormData = {
  evenementId: string;
  code: string;
  description: string;
  valeur: number;
  dateFin: Date;
  utilisationMax: number;
  type: CouponType;
};

export interface CouponActionHandlers {
  onView: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
}
