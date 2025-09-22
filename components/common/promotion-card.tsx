'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PromotionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?: 'default' | 'secondary';
  onButtonClick?: () => void;
}

export function PromotionCard({
  icon,
  title,
  description,
  buttonText,
  buttonVariant = 'default',
  onButtonClick
}: PromotionCardProps) {
  return (
    <Card className="bg-[#f8f8f8] rounded-3xl">
      <CardContent className="p-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <Button
          variant={buttonVariant}
          className={
            buttonVariant === 'default'
              ? 'bg-yellow-400 hover:bg-yellow-500 text-black'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
