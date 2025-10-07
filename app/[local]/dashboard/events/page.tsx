'use client';

import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  MoreVertical,
  MapPin,
  Calendar,
  Users,
  Star,
  Plus,
  ChevronRight,
  Home,
  DollarSign
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { useGetEvents } from '@/features/events/api/get-events';
import { TEvent } from '@/types/event';

// Types pour les événements

export default function EventsListPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const {
    data: eventsResponse,
    isLoading,
    error
  } = useGetEvents({
    page: 0,
    size: 10
  });

  // Récupération des événements depuis la réponse API
  console.log('Events response:', eventsResponse);
  const events: TEvent[] = eventsResponse?.data || [];

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'PUBLIE':
        return 'bg-green-500 text-white';
      case 'BROUILLON':
        return 'bg-secondary text-white';
      case 'TERMINE':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case 'PUBLIE':
        return 'Publié';
      case 'BROUILLON':
        return 'Brouillon';
      case 'TERMINE':
        return 'Terminé';
      default:
        return statut;
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/fr/dashboard', icon: Home },
    { label: 'Evénements', href: '/fr/dashboard/events' },
    { label: 'Liste', active: true }
  ];

  // Gestion des états de chargement et d'erreur
  const renderLoadingState = (message: string) => (
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

  const renderErrorState = () => (
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
              Erreur de chargement
            </h2>
            <p className="text-gray-600 mb-4">
              Impossible de charger les événements
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Réessayer
            </Button>
          </div>
        </div>
      </main>
    </div>
  );

  if (isLoading) {
    return renderLoadingState('Chargement des événements...');
  }

  if (error) {
    return renderErrorState();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="mx-auto max-w-[1400px] px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
              List
            </h1>
            <nav className="flex items-center gap-2">
              {breadcrumbItems.map((item, index) => (
                <Fragment key={index}>
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
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
          <Button className="gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Ajouter un événement
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 border-gray-200 bg-white"
            />
          </div>
          <div className="flex items-center gap-3">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 border-gray-200 bg-white text-gray-700"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader className="px-6 pt-6">
                  <SheetTitle className="text-2xl font-bold">
                    Filtres
                  </SheetTitle>
                  <SheetDescription className="text-base">
                    Affinez votre recherche d'événements avec les filtres
                    ci-dessous
                  </SheetDescription>
                </SheetHeader>

                <div className="px-6 py-6 space-y-8">
                  {/* Location Filter */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold text-gray-900">
                      Localisation
                    </Label>
                    <div className="space-y-3">
                      {[
                        'United States',
                        'Canada',
                        'United Kingdom',
                        'Kenya',
                        'Japan'
                      ].map((location) => (
                        <div
                          key={location}
                          className="flex items-center space-x-3"
                        >
                          <Checkbox id={location} />
                          <label
                            htmlFor={location}
                            className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold text-gray-900">
                      Fourchette de prix
                    </Label>
                    <div className="space-y-4 pt-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between">
                        <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium">
                          ${priceRange[0]}
                        </div>
                        <span className="text-gray-400">—</span>
                        <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium">
                          ${priceRange[1]}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold text-gray-900">
                      Note minimale
                    </Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Button
                          key={rating}
                          variant={
                            ratingFilter >= rating ? 'default' : 'outline'
                          }
                          size="sm"
                          onClick={() => setRatingFilter(rating)}
                          className={`gap-1 ${
                            ratingFilter >= rating
                              ? 'bg-gray-900 hover:bg-gray-800'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              ratingFilter >= rating
                                ? 'fill-white text-white'
                                : 'fill-yellow-400 text-yellow-400'
                            }`}
                          />
                          {rating}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Date Range Filter */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold text-gray-900">
                      Période
                    </Label>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="date-from"
                          className="text-sm text-gray-600"
                        >
                          Du
                        </Label>
                        <Input
                          id="date-from"
                          type="date"
                          className="border-gray-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="date-to"
                          className="text-sm text-gray-600"
                        >
                          Au
                        </Label>
                        <Input
                          id="date-to"
                          type="date"
                          className="border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Booking Status Filter */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold text-gray-900">
                      Statut des réservations
                    </Label>
                    <div className="space-y-3">
                      {['Disponible', 'Presque complet', 'Complet'].map(
                        (status) => (
                          <div
                            key={status}
                            className="flex items-center space-x-3"
                          >
                            <Checkbox id={status} />
                            <label
                              htmlFor={status}
                              className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {status}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-200 hover:bg-gray-50 bg-transparent"
                    onClick={() => {
                      setPriceRange([0, 100]);
                      setRatingFilter(0);
                    }}
                  >
                    Réinitialiser
                  </Button>
                  <Button
                    className="flex-1 bg-gray-900 hover:bg-gray-800"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Appliquer les filtres
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 border-gray-200 bg-white text-gray-700"
                >
                  Sort by: <span className="font-semibold">Latest</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Latest</DropdownMenuItem>
                <DropdownMenuItem>Oldest</DropdownMenuItem>
                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem>Rating</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-12">
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun événement trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Vous n'avez pas encore créé d'événements.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Créer votre premier événement
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link key={event.id} href={`/fr/dashboard/events/${event.id}`}>
                <Card className="group overflow-hidden border border-gray-200 bg-white">
                  {/* Image Section */}
                  <div className="relative p-3">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                      <Image
                        src={event.imagePrincipale || '/placeholder.svg'}
                        alt={event.description}
                        fill
                        className="object-cover"
                      />
                      {/* Status Badge */}
                      <div
                        className={`absolute left-3 top-3 rounded px-2 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(event.statut)}`}
                      >
                        {getStatusLabel(event.statut)}
                      </div>
                      {/* Tickets Badge */}
                      <div className="absolute right-3 top-3 flex items-center gap-1 rounded bg-secondary px-2 py-1 text-xs font-semibold text-white">
                        <DollarSign className="h-3 w-3" />
                        {event.tarifications.length > 0
                          ? Math.min(
                              ...event.tarifications.map((t) => t.prix)
                            ).toLocaleString()
                          : 'N/A'}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="space-y-3 p-4 pt-2">
                    <div className="text-xs text-gray-500">
                      Créé le: {event.createdAt}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                      {event.description}
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-red-500" />
                        {event.ville} - {event.adresse}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        {event.dateheureDebut}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                            {event.categorie.libelle}
                          </span>
                          <span className="px-2 py-1 bg-secondary-light/20 text-secondary rounded text-xs font-medium">
                            {event.portee}
                          </span>
                        </div>
                        {event.tarifications.length > 0 && (
                          <>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <DollarSign className="h-4 w-4 text-green-500" />
                              Prix:{' '}
                              {Math.min(
                                ...event.tarifications.map((t) => t.prix)
                              ).toLocaleString()}{' '}
                              FCFA
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users className="h-4 w-4 text-blue-500" />
                              Places disponibles:{' '}
                              {event.tarifications.reduce(
                                (acc, ticket) => acc + ticket.qteRestante,
                                0
                              )}
                            </div>
                          </>
                        )}
                        <div className="flex items-center justify-between">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
