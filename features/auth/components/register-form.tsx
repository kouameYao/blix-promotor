'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const loginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .regex(
      /[^A-Za-z0-9]/,
      'Le mot de passe doit contenir au moins un caractère spécial'
    )
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Login data:', data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-yellow-400 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300/30 rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-yellow-300/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300/40 rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-yellow-300/50 rounded-full"></div>
        </div>

        <div className="flex items-center justify-center p-12 relative z-10">
          <Card className="max-w-md bg-white shadow-none">
            <CardContent className="p-6">
              <p className="text-gray-800 mb-6 leading-relaxed">
                Ce qui me passionne chez E-Billeterie, c’est de voir des
                organisateurs et créateurs d’événements transformer leurs idées
                en expériences inoubliables tout en générant des revenus. Notre
                équipe se consacre à rendre la billetterie simple, fluide et
                rentable, pour que votre succès devienne notre priorité
                quotidienne.
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src="https://avatar.iran.liara.run/public/50"
                    alt="A. Pepino"
                  />
                  <AvatarFallback>LD</AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-semibold text-gray-900">
                    Diomandé Léandre
                  </p>
                  <p className="text-sm text-gray-600">
                    Sénior Dev Backend/JAVA
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-gray-900">
                E-Billeterie
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Créer un compte
            </h1>
            <p className="text-gray-600">
              J'ai déjà un compte ?{' '}
              <Button
                variant="link"
                onClick={() => router.back()}
                className="text-yellow-600 hover:text-yellow-700"
              >
                Connectez-vous
              </Button>
            </p>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Ou</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Adresse email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  className="pl-10 h-12 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mot de passe *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder=""
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium"
            >
              {isLoading ? 'Connexion...' : 'Créer un compte'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
