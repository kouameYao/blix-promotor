'use client';

import { Button } from '@/components/ui/button';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Chargement...' }: LoadingStateProps) {
  return (
    <div className="bg-white">
      <main className="mx-auto max-w-[1400px] px-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4 animate-spin"></div>
            <p className="text-gray-600">{message}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Erreur de chargement',
  message = 'Une erreur est survenue',
  onRetry
}: ErrorStateProps) {
  return (
    <div className="bg-white">
      <main className="mx-auto max-w-[1400px] px-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            {onRetry && (
              <Button
                onClick={onRetry}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Réessayer
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

