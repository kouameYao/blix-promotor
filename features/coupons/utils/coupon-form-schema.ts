import { z } from 'zod';

export const couponFormSchema = z.object({
  code: z
    .string()
    .min(1, 'Le code du coupon est obligatoire')
    .min(3, 'Le code doit contenir au moins 3 caractères')
    .max(50, 'Le code ne peut pas dépasser 50 caractères'),
  description: z
    .string()
    .min(1, 'La description est obligatoire')
    .min(5, 'La description doit contenir au moins 5 caractères')
    .max(200, 'La description ne peut pas dépasser 200 caractères'),

  type: z.enum(['POURCENTAGE', 'FIXE'], {
    required_error: 'Le type de coupon est obligatoire'
  }),

  valeur: z
    .number()
    .min(0.01, 'La valeur doit être supérieure à 0')
    .max(1000000, 'La valeur ne peut pas dépasser 1 000 000'),

  utilisationMax: z
    .number()
    .int("Le nombre d'utilisations doit être un entier")
    .min(1, "Le nombre d'utilisations doit être au moins 1")
    .max(1000000, "Le nombre d'utilisations ne peut pas dépasser 1 000 000"),

  dateFin: z
    .date({
      required_error: 'La date de fin est obligatoire'
    })
    .refine((date) => date > new Date(), {
      message: 'La date de fin doit être dans le futur'
    })
});

export type CouponFormSchema = z.infer<typeof couponFormSchema>;
