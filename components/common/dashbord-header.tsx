import { Grid3X3, User } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="text-gray-700 bg-transparent">
            Aller sur le site
          </Button>
          <Button variant="ghost" size="icon">
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
