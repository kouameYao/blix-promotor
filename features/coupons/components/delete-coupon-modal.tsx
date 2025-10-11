import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { AlertTriangle } from 'lucide-react';

interface DeleteCouponModalProps {
  couponCode: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export function DeleteCouponModal({
  couponCode,
  onConfirm,
  onCancel,
  isDeleting = false
}: DeleteCouponModalProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <DialogTitle>Supprimer le coupon</DialogTitle>
            <DialogDescription>
              Cette action est irréversible.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="py-4">
        <p className="text-sm text-muted-foreground">
          Êtes-vous sûr de vouloir supprimer le coupon{' '}
          <span className="font-mono font-medium text-foreground">
            {couponCode}
          </span>
          ?
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Toutes les données associées à ce coupon seront définitivement
          supprimées.
        </p>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
          Annuler
        </Button>
        <Button variant="destructive" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? 'Suppression...' : 'Supprimer'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
