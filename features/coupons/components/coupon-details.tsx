import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Coupon } from '@/features/coupons/types/coupon';
import {
  getCouponTypeLabel,
  formatCouponValue
} from '@/features/coupons/utils/coupon-utils';

interface CouponDetailsProps {
  coupon: Coupon;
  onClose: () => void;
}

export function CouponDetails({ coupon, onClose }: CouponDetailsProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Détail du coupon</DialogTitle>
        <DialogDescription>
          Informations complètes sur le coupon sélectionné.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <p className="text-sm font-medium text-muted-foreground">Code</p>
          <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
            {coupon.code}
          </p>
        </div>

        <div className="grid gap-2">
          <p className="text-sm font-medium text-muted-foreground">
            Description
          </p>
          <p className="text-sm">{coupon.description}</p>
        </div>

        <div className="grid gap-2">
          <p className="text-sm font-medium text-muted-foreground">Type</p>
          <p className="text-sm">{getCouponTypeLabel(coupon.type)}</p>
        </div>

        <div className="grid gap-2">
          <p className="text-sm font-medium text-muted-foreground">Valeur</p>
          <p className="text-sm font-medium">{formatCouponValue(coupon)}</p>
        </div>

        <div className="grid gap-2">
          <p className="text-sm font-medium text-muted-foreground">
            Utilisation
          </p>
          <p className="text-sm">
            {coupon.utilisationUtilise} / {coupon.utilisationMax} utilisations
          </p>
        </div>

        <div className="grid gap-2">
          <p className="text-sm font-medium text-muted-foreground">
            Date de création
          </p>
          <p className="text-sm">{formatDate(coupon.dateCreation)}</p>
        </div>

        <div className="grid gap-2">
          <p className="text-sm font-medium text-muted-foreground">Statut</p>
          <Badge variant={coupon.active ? 'default' : 'secondary'}>
            {coupon.active ? 'Actif' : 'Inactif'}
          </Badge>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Fermer
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
