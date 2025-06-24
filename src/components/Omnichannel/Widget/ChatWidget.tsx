import React, { useState } from 'react';
import { MessageCircle, X, Minimize2 } from 'lucide-react';
import ModeSelector from './ModeSelector';
import ProfileSelector from './ProfileSelector';
import { UserProfile, InteractionMode } from '../../../types';

interface ChatWidgetProps {
  children: React.ReactNode;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [showProfileSelector, setShowProfileSelector] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [, setUserMode] = useState<InteractionMode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleWidgetOpen = () => {
    setIsOpen(true);
    if (!isInitialized) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowModeSelector(true);
      }, 3000);
    }
  };

  const handleModeSelect = (mode: InteractionMode) => {
    setUserMode(mode);
    setShowModeSelector(false);
    setShowProfileSelector(true);
  };

  const handleProfileSelect = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowProfileSelector(false);
    setIsInitialized(true);
  };

  const getProfileName = (profile: UserProfile) => {
    switch (profile) {
      case 'cidadao': return 'Cidadão';
      case 'advogado': return 'Advogado/Procurador/Promotor';
      case 'servidor': return 'Servidor da Justiça';
    }
  };

  return (
    <>
      <div className="floating-widget">
        {!isOpen && (
          <button
            onClick={handleWidgetOpen}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-full shadow-xl hover:from-blue-700 hover:to-blue-900 transition-all animate-pulse-slow transform hover:scale-110"
          >
            <MessageCircle size={28} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full"></div>
          </button>
        )}

        {isOpen && (
          <div className="fixed inset-4 md:inset-8 lg:inset-12 bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 z-50 max-w-6xl max-h-[90vh] mx-auto my-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <span className="font-bold text-xl">Assistente Digital CNJ</span>
                  <p className="text-sm opacity-90">Central de Atendimento Jus.BR</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  title="Minimizar"
                >
                  <Minimize2 size={20} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  title="Fechar"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {isLoading && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      Assistente Digital CNJ
                    </h3>
                    <p className="text-lg text-gray-600 mb-2">
                      Conectando você ao sistema unificado...
                    </p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>🔍 Identificando melhor agente para você...</p>
                      <p>🤖 Carregando base de conhecimento jurídico...</p>
                      <p>⚡ Estabelecendo conexão segura...</p>
                    </div>
                  </div>
                </div>
              )}

              {showModeSelector && (
                <div className="flex-1 p-8 overflow-y-auto">
                  <ModeSelector
                    onModeSelect={handleModeSelect}
                    onSavePreference={() => {}}
                  />
                </div>
              )}

              {showProfileSelector && (
                <div className="flex-1 p-8 overflow-y-auto">
                  <ProfileSelector onProfileSelect={handleProfileSelect} />
                </div>
              )}

              {isInitialized && userProfile && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          Olá, <strong>{getProfileName(userProfile)}</strong>!
                        </p>
                        <p className="text-sm text-gray-600">
                          Sistema conectado • Agente IA especializado disponível
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {children}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showModeSelector && !isOpen && (
        <ModeSelector
          onModeSelect={handleModeSelect}
          onSavePreference={() => {}}
        />
      )}
    </>
  );
};

export default ChatWidget;