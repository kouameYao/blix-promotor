'use client';

import {
  ArrowLeft,
  Calendar,
  MapPin,
  Share2,
  Edit,
  Activity,
  Globe,
  Mic,
  Ticket,
  Users,
  DollarSign,
  TrendingUp,
  Hash,
  Building2,
  Phone
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGetEvent } from '@/features/events/api/get-event';
import { useAuthStore } from '@/store/auth-store';
import { TEvent } from '@/types/event';

function EventDetailPage({ params }: { params: { id: string } }) {
  const { token } = useAuthStore();
  console.log('token', token);
  const {
    data: eventResponse,
    isLoading,
    error
  } = useGetEvent({
    eventId: params.id
  });

  const eventData: TEvent | null = eventResponse?.data || null;

  const formatDateTime = (dateString: string) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');

    // const options: Intl.DateTimeFormatOptions = {
    //   weekday: 'long',
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit'
    // };

    // Todo - return in to this format  "11/10/2025 10:00"
    return `${day}/${month}/${year} ${timePart}`;

    // return new Date(`${year}-${month}-${day}T${timePart}`).toLocaleDateString(
    //   'fr-FR',
    //   options
    // );
  };

  // const getStatutColor = (statut: string) => {
  //   switch (statut) {
  //     case 'PUBLIE':
  //       return 'bg-green-500 text-white';
  //     case 'BROUILLON':
  //       return 'bg-secondary text-white';
  //     case 'TERMINE':
  //       return 'bg-gray-500 text-white';
  //     default:
  //       return 'bg-gray-500 text-white';
  //   }
  // };

  const getStatutLabel = (statut: string) => {
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

  const billetsVendus = eventData?.statistique?.billetsVendus;
  const totalRevenue = eventData?.statistique?.montantTotal;
  const panierMoyen = eventData?.statistique?.panierMoyen;
  const tauxRemplissage = eventData?.statistique?.tauxRemplissage;

  if (isLoading) {
    return (
      <div className="min-h-[80vh] rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de l'événement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100">
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
              Impossible de charger l'événement
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Réessayer
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-[80vh] rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-1.45.833-1.45.833L12 16l1.45-.167A7.962 7.962 0 0116 14.291M12 15a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Événement introuvable
            </h2>
            <p className="text-gray-600 mb-4">
              Cet événement n'existe pas ou a été supprimé.
            </p>
            <Button
              onClick={() => window.history.back()}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Retour
            </Button>
          </div>
        </div>
      </div>
    );
  }

  console.log('eventData', eventData);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link
              href="/fr/dashboard/events"
              className="group flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Retour aux événements</span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Partager
            </Button>

            <Button
              size="sm"
              className="gap-2 bg-primary hover:bg-primary/90 text-white"
            >
              <Edit className="w-4 h-4" />
              Modifier
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          <div className="relative">
            <Image
              src={
                eventData.imagePrincipale ||
                'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
              }
              alt={eventData.description}
              width={1920}
              height={600}
              className="w-full h-[500px] object-cover"
              priority
            />

            {/* <div className="absolute inset-0 flex items-end p-8">
              <div className="max-w-4xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge
                    className={`${getStatutColor(eventData.statut)} px-3 py-1`}
                  >
                    <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                    {getStatutLabel(eventData.statut)}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-secondary/20 text-secondary bg-secondary/10"
                  >
                    <Mic className="w-3 h-3 mr-1" />
                    {eventData.categorie.libelle}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-green-200 text-green-700 bg-green-50"
                  >
                    <Globe className="w-3 h-3 mr-1" />
                    {eventData.portee}
                  </Badge>
                </div>

                <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                  {eventData.description}
                </h1>

                {eventData.sousTitre && (
                  <p className="text-xl text-gray-200 mb-6">
                    {eventData.sousTitre}
                  </p>
                )}

                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2 text-white">
                    <MapPin className="w-5 h-5 text-red-400" />
                    <span className="font-medium">
                      {eventData.ville} • {eventData.adresse}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">
                      {formatDateTime(eventData.dateheureDebut)}
                    </span>
                  </div>
                  {eventData.tarifications.length > 0 && (
                    <div className="flex items-center space-x-2 text-white">
                      <DollarSign className="w-5 h-5 text-yellow-400" />
                      <span className="font-bold">
                        À partir de{' '}
                        {Math.min(
                          ...eventData.tarifications.map((t) => t.prix)
                        ).toLocaleString()}{' '}
                        FCFA
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenus générés</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalRevenue?.toLocaleString()} FCFA
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Potentiel restant</p>
                <p className="text-2xl font-bold text-gray-900">
                  {panierMoyen?.toFixed(2)} FCFA
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Participants</p>
                <p className="text-2xl font-bold text-gray-900">
                  {billetsVendus}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Ticket className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Taux de remplissage</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(tauxRemplissage || 0) * 100}%
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-4">
                Répartition par type de ticket
              </h2>
              <div className="space-y-4">
                {eventData.tarifications.map((ticket) => {
                  const sold = ticket.qteTotale - ticket.qteRestante;
                  const percentage = (sold / ticket.qteTotale) * 100;

                  return (
                    <div key={ticket.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              {ticket.libelle.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {ticket.libelle}
                            </p>
                            <p className="text-sm text-gray-600">
                              {ticket.prix.toLocaleString()} FCFA
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {sold} / {ticket.qteTotale} vendus
                          </p>
                          <p className="text-xs text-gray-500">
                            {percentage.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="bg-white border-0">
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-primary" />
                  Informations détaillées
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date et heure</p>
                      <p className="font-semibold text-gray-900">
                        {formatDateTime(eventData.dateheureDebut)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#6b7280] rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Lieu</p>
                      <p className="font-semibold text-gray-900">
                        {eventData.adresse}, {eventData.ville}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Mic className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Catégorie</p>
                      <p className="font-semibold text-gray-900">
                        {eventData.categorie.libelle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Portée</p>
                      <p className="font-semibold text-gray-900">
                        {eventData.portee}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Hash className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Code événement</p>
                      <p className="font-semibold text-gray-900">
                        {eventData.code}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Activity className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Statut</p>
                      <p className="font-semibold text-gray-900">
                        {getStatutLabel(eventData.statut)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Type de lieu</p>
                      <p className="font-semibold text-gray-900">PRESENTIEL</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="text-gray-700">Contact</span>
                      </p>
                      <p className="font-semibold text-gray-900">
                        <span className="text-gray-700">
                          {eventData.infoline}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="bg-white border-0">
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  À propos de l'événement
                </h2>

                <p className="text-gray-700 leading-relaxed text-wrap">
                  {eventData.description}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
