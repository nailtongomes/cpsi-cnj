import React, { useState } from 'react';
import { User, Scale, Building, ArrowRight } from 'lucide-react';
import { UserProfile } from '../../../types';

interface ProfileSelectorProps {
  onProfileSelect: (profile: UserProfile) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onProfileSelect }) => {
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleProfileSelect = (profile: UserProfile) => {
    setSelectedProfile(profile);
    setIsLoading(true);
    setTimeout(() => {
      onProfileSelect(profile);
    }, 2000);
  };

  const profiles = [
    {
      id: 'cidadao' as UserProfile,
      title: '👤 CIDADÃO',
      icon: User,
      color: 'green',
      description: 'Consultar processos, intimações e orientações',
      features: ['✅ Consultar meus processos', '📬 Ver intimações', '🎥 Balcão virtual', '❓ Ajuda simplificada']
    },
    {
      id: 'advogado' as UserProfile,
      title: '⚖️ ADVOGADO/PROCURADOR/PROMOTOR',
      icon: Scale,
      color: 'blue',
      description: 'Protocolar petições, consultar processos de clientes',
      features: ['📄 Protocolar petições', '👥 Consultar clientes', '📅 Agendar audiências', '🛠️ Suporte técnico']
    },
    {
      id: 'servidor' as UserProfile,
      title: '🏛️ SERVIDOR DA JUSTIÇA',
      icon: Building,
      color: 'orange',
      description: 'Painel gerencial, escalações, base de conhecimento',
      features: ['📊 Dashboard gerencial', '🚨 Escalações', '📚 Base conhecimento', '📈 Métricas tempo real']
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100';
      case 'blue':
        return 'border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100';
      case 'orange':
        return 'border-orange-500 bg-orange-50 text-orange-700 hover:bg-orange-100';
      default:
        return 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100';
    }
  };

  if (isLoading && selectedProfile) {
    const profile = profiles.find(p => p.id === selectedProfile);
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            🔧 Configurando interface para {profile?.title}
          </h2>
          <p className="text-gray-600 mb-4">
            Personalizando funcionalidades...
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-3">
              <strong>Carregando funcionalidades:</strong>
            </p>
            <div className="space-y-1 text-left">
              {profile?.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🏛️ Qual o seu perfil?
        </h2>
        <p className="text-gray-600">
          Vou personalizar a experiência para você
        </p>
      </div>

      <div className="space-y-4">
        {profiles.map((profile) => {
          const Icon = profile.icon;
          return (
            <button
              key={profile.id}
              onClick={() => handleProfileSelect(profile.id)}
              className={`w-full p-6 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-lg ${getColorClasses(profile.color)}`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Icon size={40} />
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-lg mb-1">
                    {profile.title}
                  </div>
                  <div className="text-sm opacity-80 mb-2">
                    {profile.description}
                  </div>
                  <div className="text-xs opacity-70">
                    {profile.features.slice(0, 2).join(' • ')}
                  </div>
                </div>
                <ArrowRight size={24} className="flex-shrink-0 opacity-60" />
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm text-center">
          💡 <strong>Dica:</strong> Cada perfil tem funcionalidades específicas para suas necessidades
        </p>
      </div>
    </div>
  );
};

export default ProfileSelector;