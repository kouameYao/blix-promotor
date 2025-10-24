'use client';

import { Search, SlidersHorizontal, ChevronDown, Star } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
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

interface SearchAndFiltersProps {
  onSearch?: (query: string) => void;
  onFiltersChange?: (filters: any) => void;
}

export function SearchAndFilters({
  onSearch,
  onFiltersChange
}: SearchAndFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const handleResetFilters = () => {
    setPriceRange([0, 100]);
    setRatingFilter(0);
  };

  const handleApplyFilters = () => {
    const filters = {
      priceRange,
      ratingFilter
    };
    onFiltersChange?.(filters);
    setIsFilterOpen(false);
  };

  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10 border-gray-200 bg-white"
          onChange={(e) => onSearch?.(e.target.value)}
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
              <SheetTitle className="text-2xl font-bold">Filtres</SheetTitle>
              <SheetDescription className="text-base">
                Affinez votre recherche d'événements avec les filtres ci-dessous
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
                    <div key={location} className="flex items-center space-x-3">
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
                      variant={ratingFilter >= rating ? 'default' : 'outline'}
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
                    <Label htmlFor="date-to" className="text-sm text-gray-600">
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
                      <div key={status} className="flex items-center space-x-3">
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
                onClick={handleResetFilters}
              >
                Réinitialiser
              </Button>
              <Button
                className="flex-1 bg-gray-900 hover:bg-gray-800"
                onClick={handleApplyFilters}
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
  );
}
