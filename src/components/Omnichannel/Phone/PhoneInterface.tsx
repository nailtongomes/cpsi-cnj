import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, Volume2, VolumeX, Mic, MicOff, Users, Clock } from 'lucide-react';
import AIAgents from '../../AI/AIAgents';
import { UserProfile } from '../../../types';

interface PhoneInterfaceProps {
  userProfile: UserProfile;
  onAction: (action: string, data?: any) => void;
}

interface CallState {
  status: 'dialing' | 'ringing' | 'connected' | 'ended' | 'menu';
  duration: number;
  currentMenu: string;
  selectedAgent: any;
}

const PhoneInterface: React.FC<PhoneInterfaceProps> = ({ userProfile, onAction }) => {
  const [callState, setCallState] = useState<CallState>({
    status: 'dialing',
    duration: 0,
    currentMenu: 'main',
    selectedAgent: null
  });
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentMessage, setCurrentMessage] = useState('');
  const [callHistory, setCallHistory] = useState<string[]>([]);
  const [queuePosition, setQueuePosition] = useState(0);

  useEffect(() => {
    if (callState.status === 'connected') {
      const timer = setInterval(() => {
        setCallState(prev => ({
          ...prev,
          duration: prev.duration + 1
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [callState.status]);

  // Simulate call flow
  useEffect(() => {
    const simulateCall = async () => {
      // Dialing
      setCurrentMessage('Discando para Central CNJ...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Ringing
      setCallState(prev => ({ ...prev, status: 'ringing' }));
      setCurrentMessage('Chamada sendo conectada...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Connected
      setCallState(prev => ({ ...prev, status: 'connected' }));
      setCurrentMessage('🤖 Olá! Bem-vindo à Central de Atendimento CNJ. Aguarde enquanto direcionamos sua ligação...');
      
      // Add initial message to history
      setCallHistory(['📞 Ligação conectada com sucesso']);
      
      // Show main menu after greeting
      setTimeout(() => {
        setCallState(prev => ({ ...prev, status: 'menu' }));
        setCurrentMessage('🎯 Menu Principal - Escolha uma opção');
      }, 3000);
    };

    if (callState.status === 'dialing') {
      simulateCall();
    }
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMenuOption = async (option: string) => {
    const menuActions: { [key: string]: () => void } = {
      '1': () => {
        setCurrentMessage('🤖 Conectando com especialista em consultas processuais...');
        setCallHistory(prev => [...prev, '👤 Você: Opção 1 - Consultar processo']);
        setTimeout(() => {
          setCurrentMessage('📋 Por favor, informe o número do seu processo ou CPF após o bip.');
          setCallHistory(prev => [...prev, '🤖 Sistema: Aguardando dados do processo...']);
        }, 2000);
      },
      '2': () => {
        setCurrentMessage('🔧 Direcionando para suporte técnico...');
        setCallHistory(prev => [...prev, '👤 Você: Opção 2 - Problemas técnicos']);
        setQueuePosition(3);
        setTimeout(() => {
          setCurrentMessage('⏰ Você está na posição 3 da fila. Tempo estimado: 5 minutos.');
          setCallHistory(prev => [...prev, '📞 Sistema: Posição 3 na fila de suporte']);
        }, 1500);
      },
      '3': () => {
        setCurrentMessage('🎥 Preparando conexão para balcão virtual...');
        setCallHistory(prev => [...prev, '👤 Você: Opção 3 - Balcão virtual']);
        setTimeout(() => {
          setCurrentMessage('💻 Link de acesso enviado por SMS. Código: #BV2024');
          setCallHistory(prev => [...prev, '📱 Sistema: Link do balcão virtual enviado']);
        }, 2000);
      },
      '4': () => {
        setCurrentMessage('🆘 Conectando com atendimento de emergência...');
        setCallHistory(prev => [...prev, '👤 Você: Opção 4 - Atendimento emergencial']);
        setTimeout(() => {
          setCurrentMessage('🚨 Transferindo para atendente humano prioritário...');
          setCallHistory(prev => [...prev, '⚡ Sistema: Prioridade alta ativada']);
        }, 1000);
      },
      '9': () => {
        setCallState(prev => ({ ...prev, currentMenu: 'main' }));
        setCurrentMessage('🔄 Retornando ao menu principal...');
        setCallHistory(prev => [...prev, '↩️ Você: Voltou ao menu principal']);
      },
      '0': () => {
        setCurrentMessage('👨‍💼 Conectando com atendente humano...');
        setCallHistory(prev => [...prev, '👤 Você: Opção 0 - Falar com atendente']);
        setQueuePosition(2);
        setTimeout(() => {
          setCurrentMessage('⏱️ Posição na fila: 2. Tempo estimado: 3 minutos.');
          setCallHistory(prev => [...prev, '🎧 Sistema: Na fila para atendente humano']);
        }, 1500);
      }
    };

    if (menuActions[option]) {
      menuActions[option]();
    }
  };

  const handleEndCall = () => {
    setCallState(prev => ({ ...prev, status: 'ended' }));
    setCurrentMessage('📞 Ligação encerrada. Obrigado por usar a Central CNJ!');
    setCallHistory(prev => [...prev, '📞 Ligação finalizada pelo usuário']);
    
    setTimeout(() => {
      onAction('call_ended', {
        duration: callState.duration,
        menu_interactions: callHistory.length,
        agent_used: callState.selectedAgent?.name || 'URA Padrão'
      });
    }, 2000);
  };

  const handleAgentSelect = (agent: any) => {
    setCallState(prev => ({ ...prev, selectedAgent: agent }));
    setCurrentMessage(`🤖 ${agent.greeting}`);
    setCallHistory(prev => [...prev, `🤖 ${agent.name}: Assumindo o atendimento`]);
  };

  const renderCallScreen = () => {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Phone size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold">Central CNJ</h1>
                <p className="text-sm opacity-90">0800-123-4567</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono">{formatDuration(callState.duration)}</div>
              <div className="text-sm opacity-75">
                {callState.status === 'connected' ? '🟢 Conectado' : 
                 callState.status === 'ringing' ? '🟡 Chamando...' :
                 callState.status === 'dialing' ? '🔵 Discando...' :
                 callState.status === 'menu' ? '🎯 Menu Ativo' : '🔴 Encerrado'}
              </div>
            </div>
          </div>
        </div>

        {/* AI Agent Selector */}
        {callState.status === 'connected' && (
          <div className="p-4">
            <AIAgents
              userProfile={userProfile}
              onAgentSelect={handleAgentSelect}
              currentChannel="phone"
            />
          </div>
        )}

        {/* Current Message */}
        <div className="flex-1 p-6">
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                {callState.status === 'menu' ? '🎯' : '🤖'}
              </div>
              <div className="flex-1">
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-lg">{currentMessage}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Options */}
          {callState.status === 'menu' && (
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-center">📋 Menu de Opções</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { key: '1', label: '📋 Consultar Processo', desc: 'Ver andamento dos seus casos' },
                  { key: '2', label: '🔧 Problemas Técnicos', desc: 'Dificuldades com sistemas' },
                  { key: '3', label: '🎥 Balcão Virtual', desc: 'Videoconferência com tribunal' },
                  { key: '4', label: '🆘 Emergência', desc: 'Atendimento urgente' },
                  { key: '0', label: '👨‍💼 Falar com Atendente', desc: 'Atendimento humano' },
                  { key: '9', label: '🔄 Repetir Menu', desc: 'Ouvir opções novamente' }
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleMenuOption(option.key)}
                    className="bg-blue-600 hover:bg-blue-700 p-4 rounded-lg text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center font-bold">
                        {option.key}
                      </div>
                      <div>
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm opacity-75">{option.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Queue Status */}
          {queuePosition > 0 && (
            <div className="bg-yellow-600 bg-opacity-20 border border-yellow-500 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <Users className="text-yellow-400" size={24} />
                <div>
                  <div className="font-bold">Posição na Fila: {queuePosition}</div>
                  <div className="text-sm opacity-75">Tempo estimado: {queuePosition * 2} minutos</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call History */}
        <div className="bg-gray-800 border-t border-gray-700 p-4">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <Clock size={16} />
            Histórico da Ligação
          </h4>
          <div className="max-h-32 overflow-y-auto space-y-1 text-sm">
            {callHistory.map((entry, index) => (
              <div key={index} className="opacity-75">
                {entry}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 p-6 border-t border-gray-700">
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-colors ${
                isMuted ? 'bg-red-600' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            >
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>

            <button
              onClick={handleEndCall}
              className="bg-red-600 hover:bg-red-700 p-4 rounded-full transition-colors"
            >
              <PhoneCall size={24} />
            </button>

            <button
              onClick={() => setVolume(volume > 0 ? 0 : 80)}
              className="p-4 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors"
            >
              {volume > 0 ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Volume2 size={16} />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm w-12">{volume}%</span>
          </div>
        </div>
      </div>
    );
  };

  const renderEndScreen = () => {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg text-center">
          <div className="text-6xl mb-4">📞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ligação Encerrada</h2>
          <p className="text-gray-600 mb-6">Obrigado por usar a Central CNJ</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-bold mb-2">📊 Resumo da Ligação</h3>
            <div className="space-y-1 text-sm">
              <div>⏱️ Duração: {formatDuration(callState.duration)}</div>
              <div>🤖 Agente: {callState.selectedAgent?.name || 'URA Padrão'}</div>
              <div>📱 Interações: {callHistory.length}</div>
              <div>⭐ Avaliação: Pendente</div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              📞 Nova Ligação
            </button>
            <button
              onClick={() => onAction('switch_channel', 'widget')}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300"
            >
              💬 Continuar no Chat Web
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (callState.status === 'ended') {
    return renderEndScreen();
  }

  return renderCallScreen();
};

export default PhoneInterface;