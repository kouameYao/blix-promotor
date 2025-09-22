import { Info } from 'lucide-react';
import * as React from 'react';

import { Card, CardContent } from '../ui/card';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
}

export const StatisticsCard = ({ title, value, subtitle }: StatsCardProps) => {
  return (
    <Card className="md:p-6 p-4 bg-[#f8f8f8] md:space-y-8 space-y-4 w-full col-span-3 md:col-span-1 rounded-3xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-500">{subtitle}</div>
      </CardContent>
    </Card>
  );
};
