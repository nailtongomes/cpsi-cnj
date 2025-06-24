import { useState } from 'react';
import ChatWidget from './components/Omnichannel/Widget/ChatWidget';
import ChannelTabs from './components/Omnichannel/MultiChannel/ChannelTabs';
import KioskMode from './components/Omnichannel/Totem/KioskMode';
import CitizenInterface from './components/Profiles/CitizenInterface';
import LawyerInterface from './components/Profiles/LawyerInterface';
import ServerInterface from './components/Profiles/ServerInterface';
import ProtocolGenerator from './components/Features/ProtocolGenerator';
import RealTimeMetrics from './components/Metrics/RealTimeMetrics';
import PitchDemo from './components/Demo/PitchDemo';
import PhoneInterface from './components/Omnichannel/Phone/PhoneInterface';
import { Channel, UserProfile } from './types';

function App() {
  const [activeChannel, setActiveChannel] = useState<Channel>('widget');
  const [userProfile, setUserProfile] = useState<UserProfile>('cidadao');
  const [showProtocol, setShowProtocol] = useState(false);
  const [protocolData, setProtocolData] = useState<any>(null);
  const [showPitchDemo, setShowPitchDemo] = useState(false);

  const handleAction = (action: string, data?: any) => {
    if (action === 'protocol') {
      setProtocolData(data);
      setShowProtocol(true);
    } else if (action === 'switch_channel') {
      setActiveChannel(data);
    }
  };

  const renderChannelContent = () => {
    switch (userProfile) {
      case 'cidadao':
        return <CitizenInterface onAction={handleAction} />;
      case 'advogado':
        return <LawyerInterface onAction={handleAction} />;
      case 'servidor':
        return <ServerInterface onAction={handleAction} />;
      default:
        return <CitizenInterface onAction={handleAction} />;
    }
  };

  const renderSimulator = () => {
    const content = renderChannelContent();

    switch (activeChannel) {
      case 'widget':
        return (
          <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">CNJ</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                      Central de Atendimento Unificada
                    </h1>
                    <p className="text-blue-600 font-medium">Jus.br • Conselho Nacional de Justiça</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-800 font-semibold">Sistema Online</span>
                    </div>
                    <p className="text-sm text-green-700">Conectado aos 90 tribunais brasileiros</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-800 font-semibold">⚡ 78% Resolução IA</span>
                    </div>
                    <p className="text-sm text-blue-700">Média de 2.3 min por atendimento</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-purple-800 font-semibold">🎯 NPS 4.8/5</span>
                    </div>
                    <p className="text-sm text-purple-700">96% satisfação dos usuários</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2">💡 Demonstração Beta - Pitch CNJ</h2>
                      <p className="opacity-90">
                        Plataforma omnichannel com IA para <strong>reduzir custos de atendimento </strong> e 
                        <strong>aumentar acesso à Justiça</strong>. Integração nativa com PDPJ em tempo real.
                      </p>
                      <div className="mt-3 flex gap-4 text-sm">
                        <span className="bg-white bg-opacity-20 px-3 py-1 rounded">🤖 IA Jurídica</span>
                        <span className="bg-white bg-opacity-20 px-3 py-1 rounded">📱 9 Canais</span>
                        <span className="bg-white bg-opacity-20 px-3 py-1 rounded">♿ 100% Acessível</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPitchDemo(true)}
                      className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors ml-4 hidden"
                    >
                      🎯 VER PITCH
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h2 className="text-xl font-bold mb-4">💻 Portal Tribunal Simulado</h2>
                  <div className="space-y-4">
                    <div className="bg-blue-600 text-white p-4 rounded">
                      <h3 className="font-bold">🏛️ Portal CNJ</h3>
                      <p className="text-sm opacity-90">Sistema Unificado da Justiça Brasileira</p>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-gray-100 p-3 rounded">📋 Consultar Meus Processos</div>
                      <div className="bg-gray-100 p-3 rounded">📬 Ver Intimações</div>
                      <div className="bg-gray-100 p-3 rounded">📑 Protocolo Eletrônico</div>
                      <div className="bg-gray-100 p-3 rounded">🎥 Balcão Virtual</div>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                      <p className="text-yellow-800 text-sm">
                        💬 <strong>Widget do Assistente</strong> aparece no canto inferior direito →
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <RealTimeMetrics />
                </div>
              </div>
            </div>
            
            <ChatWidget>
              {content}
            </ChatWidget>
          </div>
        );

      case 'totem':
        return (
          <KioskMode>
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">CNJ</span>
                  </div>
                  <div className="text-left">
                    <h2 className="text-4xl font-bold text-gray-800">
                      Central de Atendimento
                    </h2>
                    <p className="text-2xl text-blue-600 font-medium">Totem Interativo • Jus.br</p>
                  </div>
                </div>
                
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-2xl text-green-800 font-bold">Sistema Online</span>
                  </div>
                  <p className="text-xl text-green-700">
                    Conectado a todos os 90 tribunais brasileiros
                  </p>
                </div>
                
                <p className="text-2xl text-gray-600">
                  👆 Toque nos botões grandes para começar
                </p>
                <p className="text-lg text-gray-500 mt-2">
                  💡 Demonstração da interface para fóruns e tribunais
                </p>
              </div>
              {content}
            </div>
          </KioskMode>
        );

      case 'whatsapp':
        return (
          <div className="min-h-screen bg-green-100 p-4">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-green-600 text-white p-4">
                <h2 className="font-bold">WhatsApp Business</h2>
                <p className="text-sm opacity-90">Assistente Digital Jus.BR</p>
              </div>
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg mb-2">
                    <p className="text-sm">🤖 Olá! Sou o Assistente Digital do Portal Jus.BR</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm">Como posso ajudar você hoje?</p>
                  </div>
                </div>
                {content}
              </div>
            </div>
          </div>
        );

      case 'telegram':
        return (
          <div className="min-h-screen bg-blue-100 p-4">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-500 text-white p-4">
                <h2 className="font-bold">Telegram Bot</h2>
                <p className="text-sm opacity-90">@JusBR_Bot</p>
              </div>
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg mb-2">
                    <p className="text-sm">🤖 Bot do Portal Jus.BR ativado!</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm">Use /help para ver comandos disponíveis</p>
                  </div>
                </div>
                {content}
              </div>
            </div>
          </div>
        );

      case 'mobile':
        return (
          <div className="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
            <div className="bg-black rounded-3xl p-2 shadow-2xl">
              <div className="bg-white rounded-2xl w-80 h-[600px] overflow-hidden">
                <div className="bg-jus-blue text-white p-4">
                  <h2 className="font-bold">App Jus.BR</h2>
                  <p className="text-sm opacity-90">Assistente Digital</p>
                </div>
                <div className="p-4 h-full overflow-y-auto">
                  {content}
                </div>
              </div>
            </div>
          </div>
        );

      case 'phone':
        return (
          <PhoneInterface 
            userProfile={userProfile} 
            onAction={handleAction}
          />
        );

      default:
        return content;
    }
  };

  return (
    <div className="min-h-screen">
      <ChannelTabs 
        activeChannel={activeChannel} 
        onChannelChange={setActiveChannel}
      />
      
      <div className="p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecionar Perfil para Demonstração:
          </label>
          <select
            value={userProfile}
            onChange={(e) => setUserProfile(e.target.value as UserProfile)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
          >
            <option value="cidadao">👤 Cidadão</option>
            <option value="advogado">⚖️ Advogado/Procurador/Promotor</option>
            <option value="servidor">🏛️ Servidor da Justiça</option>
          </select>
        </div>
      </div>

      {renderSimulator()}

      {showProtocol && protocolData && (
        <ProtocolGenerator
          actionType={protocolData.type}
          userProfile={userProfile}
          responseTime={protocolData.responseTime}
          onClose={() => setShowProtocol(false)}
        />
      )}
      
      {showPitchDemo && (
        <PitchDemo onClose={() => setShowPitchDemo(false)} />
      )}
    </div>
  );
}

export default App;
