import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHead as TableHeadComponent
} from '@/components/ui/table';
import { CouponRow } from '@/features/coupons/components/coupon-row';
import { Coupon, CouponActionHandlers } from '@/features/coupons/types/coupon';

interface CouponsTableProps {
  coupons: Coupon[];
  handlers: CouponActionHandlers;
  onAddCoupon: () => void;
  isLoading?: boolean;
  error?: Error | null;
}

export function CouponsTable({
  coupons,
  handlers,
  onAddCoupon,
  isLoading = false,
  error = null
}: CouponsTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Gestion des Coupons</CardTitle>
          <CardDescription>Gérez vos coupons et transactions</CardDescription>
        </div>
        <Button onClick={onAddCoupon} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Ajouter un coupon
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableHeadComponent>Code / Description</TableHeadComponent>
              <TableHeadComponent>Valeur</TableHeadComponent>
              <TableHeadComponent>Type</TableHeadComponent>
              <TableHeadComponent>Utilisation</TableHeadComponent>
              <TableHeadComponent>Statut</TableHeadComponent>
              <TableHeadComponent className="text-center">
                Actions
              </TableHeadComponent>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Chargement des coupons...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="h-24 text-center text-destructive">
                    Erreur lors du chargement des coupons: {error.message}
                  </td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Aucun coupon trouvé.
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <CouponRow
                    key={coupon.id}
                    coupon={coupon}
                    handlers={handlers}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
