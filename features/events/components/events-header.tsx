'use client';

import { ChevronRight, Home, Plus } from 'lucide-react';
import Link from 'next/link';
import { Fragment, useState } from 'react';

import { Button } from '@/components/ui/button';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: any;
  active?: boolean;
}

interface EventsHeaderProps {
  title?: string;
  breadcrumbItems?: BreadcrumbItem[];
  onAddEvent?: () => void;
}

export function EventsHeader({
  title = 'List',
  breadcrumbItems = [
    { label: 'Dashboard', href: '/fr/dashboard', icon: Home },
    { label: 'Evénements', href: '/fr/dashboard/events' },
    { label: 'Liste', active: true }
  ],
  onAddEvent
}: EventsHeaderProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
          {title}
        </h1>
        <nav className="flex items-center gap-2">
          {breadcrumbItems.map((item, index) => (
            <Fragment key={index}>
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
              <Link
                href={item.href || '#'}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                  item.active
                    ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/80'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span className="font-medium">{item.label}</span>
                {hoveredIndex === index && !item.active && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
                )}
              </Link>
            </Fragment>
          ))}
        </nav>
      </div>
      <Button
        className="gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
        onClick={onAddEvent}
      >
        <Plus className="h-4 w-4" />
        Ajouter un événement
      </Button>
    </div>
  );
}

