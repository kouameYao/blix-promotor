import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  CouponFormSchema,
  couponFormSchema
} from '@/features/coupons/utils/coupon-form-schema';

interface CouponFormProps {
  onSubmit: (data: CouponFormSchema) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CouponForm({
  onSubmit,
  onCancel,
  isLoading = false
}: CouponFormProps) {
  const form = useForm<CouponFormSchema>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      code: '',
      description: '',
      type: undefined,
      valeur: 0,
      utilisationMax: 1,
      dateFin: new Date()
    }
  });

  const handleSubmit = (data: CouponFormSchema) => {
    onSubmit(data);
  };

  return (
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Ajouter un coupon</DialogTitle>
        <DialogDescription>
          Remplissez les informations pour créer un nouveau coupon.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code du coupon *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: PROMO2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Réduction pour les nouveaux clients"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de coupon *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="z-[99]">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-[70]">
                      <SelectItem value="POURCENTAGE">Pourcentage</SelectItem>
                      <SelectItem value="FIXE">Montant fixe</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="valeur"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valeur *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder={
                        form.watch('type') === 'POURCENTAGE'
                          ? 'Ex: 10'
                          : 'Ex: 5000'
                      }
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="utilisationMax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Utilisation maximale *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 100"
                      min="1"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateFin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de fin</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={
                        field.value
                          ? field.value.toISOString().split('T')[0]
                          : ''
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Création...' : 'Créer'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
