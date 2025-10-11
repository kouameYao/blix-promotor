import { Eye, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Coupon, CouponActionHandlers } from '@/features/coupons/types/coupon';
import {
  getCouponTypeLabel,
  formatCouponValue
} from '@/features/coupons/utils/coupon-utils';

interface CouponRowProps {
  coupon: Coupon;
  handlers: CouponActionHandlers;
}

export function CouponRow({ coupon, handlers }: CouponRowProps) {
  const getStatusVariant = (active: boolean) => {
    return active ? 'default' : 'secondary';
  };

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium">
        <div>
          <p className="text-sm font-medium">{coupon.code}</p>
          <p className="text-xs text-muted-foreground">{coupon.description}</p>
        </div>
      </TableCell>
      <TableCell className="font-medium">{formatCouponValue(coupon)}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="text-sm">{getCouponTypeLabel(coupon.type)}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          {coupon.utilisationUtilise} / {coupon.utilisationMax}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={getStatusVariant(coupon.active)}>
          {coupon.active ? 'Actif' : 'Inactif'}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlers.onView(coupon)}
            title="Voir le détail"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlers.onDelete(coupon.id)}
            title="Supprimer"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
