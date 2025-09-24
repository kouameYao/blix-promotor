import { Plus, Percent, Workflow, Play, Send } from 'lucide-react';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { ActionButton } from '@/components/common/action-button';
import { PromotionCard } from '@/components/common/promotion-card';
import { Statistic } from '@/components/common/Statistic';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/fr/login');
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 text-balance">
          Bon après-midi Souleymane ! 👋
        </h1>
        <p className="text-gray-600">
          Votre audience est active - partagez quelque chose d'excitant !
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <ActionButton icon={Plus} title="Ajouter un produit" />
        <ActionButton icon={Percent} title="Créer une réduction" />
        <ActionButton icon={Workflow} title="Créer un workflow" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 grid-rows-2 md:grid-cols-3 md:grid-rows-1 md:gap-5 gap-2 md:my-10 my-6 chariow-0">
        <Statistic title="Ventes totales" value="0 FCFA" subtitle="" />
        <Statistic title="7 derniers jours" value="0 FCFA" subtitle="" />
        <Statistic title="Produits" value="1" subtitle="" />
      </div>

      {/* Promotion Cards */}
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
