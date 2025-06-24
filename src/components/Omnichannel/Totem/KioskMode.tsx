import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Home, Accessibility } from 'lucide-react';

interface KioskModeProps {
  children: React.ReactNode;
}

const KioskMode: React.FC<KioskModeProps> = ({ children }) => {
  const [isIdle, setIsIdle] = useState(false);
  const [idleTimer, setIdleTimer] = useState<number | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const resetIdleTimer = () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
      }
      
      setIsIdle(false);
      
      const newTimer = setTimeout(() => {
        setIsIdle(true);
      }, 120000); // 2 minutes
      
      setIdleTimer(newTimer);
    };

    const handleActivity = () => {
      resetIdleTimer();
    };

    // Add event listeners for user activity
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    // Initial timer
    resetIdleTimer();

    return () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
      }
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [idleTimer]);

  const handleWakeUp = () => {
    setIsIdle(false);
  };

  if (isIdle) {
    return (
      <div 
        className="fixed inset-0 bg-gradient-to-br from-jus-blue to-blue-800 flex flex-col items-center justify-center cursor-pointer"
        onClick={handleWakeUp}
      >
        <div className="text-center text-white animate-pulse">
          <div className="mb-8">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home size={64} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Assistente Digital Jus.BR
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Toque na tela para iniciar
            </p>
          </div>
          
          <div className="bg-white/10 rounded-xl p-6 max-w-md">
            <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
              <div className="text-center text-jus-blue">
                <div className="text-6xl mb-2">📱</div>
                <div className="text-sm font-medium">
                  QR Code<br />
                  App Mobile
                </div>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Escaneie para acessar pelo celular
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${highContrast ? 'bg-black text-white' : 'bg-gray-50'}`}>
      {/* Accessibility Toolbar */}
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        <button
          onClick={() => setAudioEnabled(!audioEnabled)}
          className={`p-3 rounded-full ${audioEnabled ? 'bg-green-500' : 'bg-red-500'} text-white hover:opacity-80 transition-opacity`}
          title={audioEnabled ? 'Desativar áudio' : 'Ativar áudio'}
        >
          {audioEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
        
        <button
          onClick={() => setHighContrast(!highContrast)}
          className={`p-3 rounded-full ${highContrast ? 'bg-yellow-500' : 'bg-gray-600'} text-white hover:opacity-80 transition-opacity`}
          title={highContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
        >
          <Accessibility size={24} />
        </button>
      </div>

      {/* Header */}
      <div className={`${highContrast ? 'bg-yellow-500' : 'bg-jus-blue'} text-white py-6 px-8`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Home size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Assistente Digital Jus.BR</h1>
              <p className="text-lg opacity-90">Totem de Atendimento - Toque na tela</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold">
              {new Date().toLocaleDateString('pt-BR')}
            </div>
            <div className="text-lg">
              {new Date().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-8 ${highContrast ? 'bg-black' : ''}`}>
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className={`fixed bottom-0 left-0 right-0 ${highContrast ? 'bg-gray-800' : 'bg-gray-200'} py-4 px-8`}>
        <div className="flex justify-between items-center">
          <div className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
            🕐 Timeout automático em 2 minutos de inatividade
          </div>
          <div className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
            ♿ Acessibilidade ativada - Toque nos ícones no canto superior direito
          </div>
        </div>
      </div>
    </div>
  );
};

export default KioskMode;