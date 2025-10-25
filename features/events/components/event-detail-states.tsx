'use client';

import { Button } from '@/components/ui/button';

interface EventDetailLoadingStateProps {
  message?: string;
}

export function EventDetailLoadingState({
  message = "Chargement de l'événement..."
}: EventDetailLoadingStateProps) {
  return (
    <div className="min-h-[80vh] rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
}

interface EventDetailErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function EventDetailErrorState({
  title = 'Erreur de chargement',
  message = "Impossible de charger l'événement",
  onRetry
}: EventDetailErrorStateProps) {
  return (
    <div className="min-h-[80vh] rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100">
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
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
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
    </div>
  );
}

interface EventDetailNotFoundStateProps {
  onBack?: () => void;
}

export function EventDetailNotFoundState({
  onBack
}: EventDetailNotFoundStateProps) {
  return (
    <div className="min-h-[80vh] rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-24 h-24 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-1.45.833-1.45.833L12 16l1.45-.167A7.962 7.962 0 0116 14.291M12 15a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Événement introuvable
          </h2>
          <p className="text-gray-600 mb-4">
            Cet événement n'existe pas ou a été supprimé.
          </p>
          {onBack && (
            <Button
              onClick={onBack}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Retour
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
