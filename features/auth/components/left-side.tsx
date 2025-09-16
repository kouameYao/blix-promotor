import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export function LeftSide() {
  return (
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
              organisateurs et créateurs d’événements transformer leurs idées en
              expériences inoubliables tout en générant des revenus. Notre
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
                <p className="font-semibold text-gray-900">Diomandé Léandre</p>
                <p className="text-sm text-gray-600">Sénior Dev Backend/JAVA</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
