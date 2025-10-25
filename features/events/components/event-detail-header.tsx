'use client';

import { ArrowLeft, Share2, Edit } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface EventDetailHeaderProps {
  onShare?: () => void;
  onEdit?: () => void;
}

export function EventDetailHeader({ onShare, onEdit }: EventDetailHeaderProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Link
            href="/fr/dashboard/events"
            className="group flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Retour aux événements</span>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={onShare}
          >
            <Share2 className="w-4 h-4" />
            Partager
          </Button>

          <Button
            size="sm"
            className="gap-2 bg-primary hover:bg-primary/90 text-white"
            onClick={onEdit}
          >
            <Edit className="w-4 h-4" />
            Modifier
          </Button>
        </div>
      </div>
    </div>
  );
}
