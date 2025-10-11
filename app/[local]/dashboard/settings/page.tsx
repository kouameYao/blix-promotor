'use client';

import { Settings, User, Bell, Shield, Palette } from 'lucide-react';

import { Card } from '@/components/ui/card';

export default function SettingsPage() {
  const settingsCategories = [
    {
      title: 'Profil',
      description: 'Gérez vos informations personnelles',
      icon: User,
      items: [
        'Informations personnelles',
        'Photo de profil',
        'Préférences de langue',
        'Fuseau horaire'
      ]
    },
    {
      title: 'Notifications',
      description: 'Configurez vos préférences de notification',
      icon: Bell,
      items: [
        'Notifications par email',
        'Notifications push',
        'Notifications SMS',
        "Rappels d'événements"
      ]
    },
    {
      title: 'Sécurité',
      description: 'Protégez votre compte',
      icon: Shield,
      items: [
        'Mot de passe',
        'Authentification à deux facteurs',
        'Sessions actives',
        'Historique de connexion'
      ]
    },
    {
      title: 'Apparence',
      description: "Personnalisez l'interface",
      icon: Palette,
      items: [
        'Thème (clair/sombre)',
        'Couleurs',
        "Densité d'affichage",
        'Sidebar'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Paramètres</h1>
        <p className="text-gray-600">Gérez vos préférences et configurations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsCategories.map((category) => (
          <Card key={category.title} className="p-6 cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <category.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                <ul className="space-y-1">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-gray-500 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Placeholder pour les paramètres avancés */}
      <Card className="p-8 text-center">
        <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Paramètres avancés
        </h3>
        <p className="text-gray-600">
          Les paramètres avancés et les configurations personnalisées seront
          bientôt disponibles.
        </p>
      </Card>
    </div>
  );
}
