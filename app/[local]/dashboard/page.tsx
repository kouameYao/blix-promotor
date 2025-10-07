import { Plus, UserPen, Play, Send, TicketPlus } from 'lucide-react';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { ActionButton } from '@/components/common/action-button';
import { PromotionCard } from '@/components/common/promotion-card';
import { Statistic } from '@/components/common/Statistic';
import { IUser } from '@/types/user';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/fr/login');
  }

  const user = session?.user as IUser;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 text-balance">
          Bon après-midi {user?.nom || ''} {user?.prenom || ''} ! 👋
        </h1>
        <p className="text-gray-600">
          Votre audience est active - partagez quelque chose d'excitant !
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <ActionButton icon={Plus} title="Ajouter un évenement" />
        <ActionButton icon={TicketPlus} title="Gérer mes tickets" />
        <ActionButton icon={UserPen} title="Modifier mon profil" />
      </div>

      <div className="grid grid-cols-3 grid-rows-2 md:grid-cols-3 md:grid-rows-1 md:gap-5 gap-2 md:my-10 my-6 chariow-0">
        <Statistic title="Événements en cours" value="2" subtitle="" />
        <Statistic title="Tickets vendus" value="1800" subtitle="" />
        <Statistic title="Tickets achetés" value="2908" subtitle="" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PromotionCard
          icon={<Play className="w-8 h-8 text-gray-600" />}
          title="Rejoignez-nous sur Youtube"
          description="Découvrez des vidéos pratiques pour apprendre à utiliser Chariow"
          buttonText="Accéder maintenant"
          buttonVariant="default"
        />
        <PromotionCard
          icon={<Send className="w-8 h-8 text-gray-600" />}
          title="Rejoignez notre Telegram"
          description="Rejoignez la communauté d'entraide des créateurs Chariow"
          buttonText="Rejoindre maintenant"
          buttonVariant="secondary"
        />
      </div>
    </div>
  );
}
