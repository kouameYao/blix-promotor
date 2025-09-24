'use client';

import { RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { FallbackProps } from 'react-error-boundary';

import { Button } from '../ui/button';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.log('error - MainErrorFallback', error);

  const isProd = process.env.NODE_ENV === 'production';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 text-center text-gray-700">
      <div className="flex max-w-md flex-col items-center">
        <h1 className="mb-2 text-xl font-semibold text-gray-900">
          Oups, une erreur est survenue !
        </h1>

        {!isProd && (
          <p className="mb-2 text-xs text-red-200">{error.message}</p>
        )}

        <p className="mb-4 text-sm text-gray-500">
          Quelque chose n’a pas fonctionné comme prévu, mais pas d’inquiétude —
          notre équipe est là pour vous. Si vous avez besoin d’aide,{' '}
          <Link
            href="https://paynah.com/"
            target="_blank"
            className="text-black/60 underline hover:text-black/80"
          >
            contactez-nous
          </Link>{' '}
          et nous vous répondrons rapidement.
        </p>

        <Button
          variant="outline"
          className="mt-2"
          onClick={() => resetErrorBoundary()}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Réessayer
        </Button>
      </div>
    </div>
  );
};
