import type { LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ActionButtonProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
}

export function ActionButton({
  icon: Icon,
  title,
  onClick
}: ActionButtonProps) {
  return (
    <Button
      size="sm"
      variant="outline"
      className="flex items-center rounded-full space-x-2 py-3 h-auto bg-white hover:bg-gray-50 border-gray-200"
      onClick={onClick}
    >
      <Icon className="w-5 h-5 text-gray-600" />
      <span className="text-gray-700">{title}</span>
    </Button>
  );
}
