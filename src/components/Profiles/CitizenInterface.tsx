import React, { useState } from 'react';
import { FileText, Bell, HelpCircle, Search, CheckCircle, Video } from 'lucide-react';
import { mockProcesses } from '../../data/mockData';
import HelpCenter from '../Help/HelpCenter';
import AIAgents from '../AI/AIAgents';

interface CitizenInterfaceProps {
  onAction: (action: string, data?: any) => void;
}

const CitizenInterface: React.FC<CitizenInterfaceProps> = ({ onAction }) => {
  const [showProcessConsultation, setShowProcessConsultation] = useState(false);
  const [showIntimations, setShowIntimations] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [cpf, setCpf] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [processResult, setProcessResult] = useState<any>(null);
  const [lastAction, setLastAction] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  const handleProcessConsultation = async () => {
    setIsLoading(true);
    setLastAction('consulta de processo');
    
    // Simular processamento de IA mais realístico
    setTimeout(() => {
      const userProcesses = mockProcesses.filter(p => p.owner_cpf === '123.456.789-00');
      
      // Adicionar análise de IA aos processos
      const processesWithAI = userProcesses.map(process => ({
        ...process,
        ai_analysis: {
          priority: process.intimations?.some(i => i.action_required) ? 'high' : 'normal',
          next_action: process.intimations?.some(i => i.action_required) 
            ? 'Você precisa enviar documentos até ' + new Date(process.intimations![0].deadline!).toLocaleDateString('pt-BR')
            : 'Aguarde a próxima movimentação do processo',
          estimated_completion: process.status === 'Deferido' ? 'Processo finalizado' : 
            process.type === 'Aposentadoria por Idade' ? '2-4 meses' : '1-3 meses',
          confidence: '94%'
        }
      }));
      
      setProcessResult({
        found: true,
        processes: processesWithAI,
        ai_summary: {
          total_processes: processesWithAI.length,
          urgent_actions: processesWithAI.filter(p => p.ai_analysis.priority === 'high').length,
          completed: processesWithAI.filter(p => p.status === 'Deferido').length,
          recommendation: processesWithAI.some(p => p.ai_analysis.priority === 'high') 
            ? 'Você tem ações urgentes pendentes. Recomendo cuidar das intimações primeiro.'
            : 'Seus processos estão andando normalmente. Continue acompanhando.'
        }
      });
      setIsLoading(false);
      // Mostrar avaliação após a ação
      setTimeout(() => setShowEvaluation(true), 3000);
    }, 2000);
  };

  const handleConnect = () => {
    setIsLoading(true);
    setTimeout(() => {
      onAction('protocol', {
        type: 'consulta_processual',
        protocol: `JUS-${new Date().toISOString().slice(0,19).replace(/[-:]/g, '').replace('T', '-')}-001`,
        responseTime: '2min 30s'
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleIntimations = () => {
    setLastAction('consulta de intimações');
    setShowIntimations(true);
    setTimeout(() => setShowEvaluation(true), 2000);
  };

  const handleVirtualCounter = () => {
    setLastAction('balcão virtual');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('🎥 Conectando com o Balcão Virtual da 1ª Vara Previdenciária...\n\nEm breve você será direcionado para a videochamada!');
      setShowEvaluation(true);
    }, 2000);
  };

  const mainButtons = [
    {
      icon: FileText,
      title: '📋 Meus Processos',
      description: 'Ver como está meu caso na Justiça',
      color: 'bg-green-500 hover:bg-green-600',
      action: () => setShowProcessConsultation(true)
    },
    {
      icon: Bell,
      title: '📬 Minhas Intimações',
      description: 'Ver avisos e prazos importantes',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: handleIntimations
    },
    {
      icon: Video,
      title: '🎥 Falar por Vídeo',
      description: 'Conversar com funcionário do fórum',
      color: 'bg-purple-500 hover:bg-purple-600',
      action: handleVirtualCounter
    },
    {
      icon: HelpCircle,
      title: '❓ Preciso de Ajuda',
      description: 'Não entendo nada de processo',
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => setShowHelp(true)
    }
  ];

  if (showProcessConsultation) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            📋 Meus Processos na Justiça
          </h2>
          <p className="text-lg text-gray-600">Digite seu CPF para ver seus casos</p>
        </div>

        {!processResult && (
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                💳 Digite seu CPF:
              </label>
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={handleProcessConsultation}
              disabled={!cpf || isLoading}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-lg">🤖 IA analisando seus dados...</span>
                  </div>
                  <div className="text-center space-y-1 text-sm opacity-90">
                    <p>🔍 Buscando processos no sistema nacional...</p>
                    <p>📊 Analisando status e movimentações...</p>
                    <p>🎯 Gerando recomendações personalizadas...</p>
                  </div>
                </div>
              ) : (
                <>
                  <Search className="inline mr-2" size={24} />
                  <span className="text-lg">🔍 BUSCAR MEUS PROCESSOS</span>
                </>
              )}
            </button>
          </div>
        )}

        {processResult && (
          <div className="space-y-4">
            {/* Resumo da IA */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">🤖</span>
                <span className="font-bold text-lg text-blue-800">
                  Análise Inteligente dos seus Processos
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>📊 Total de processos:</strong> {processResult.ai_summary.total_processes}</p>
                <p><strong>🚨 Ações urgentes:</strong> {processResult.ai_summary.urgent_actions}</p>
                <p><strong>✅ Finalizados:</strong> {processResult.ai_summary.completed}</p>
                <div className="bg-blue-100 p-3 rounded mt-3">
                  <p className="text-blue-800 font-medium">
                    <strong>🎯 Recomendação da IA:</strong><br/>
                    {processResult.ai_summary.recommendation}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="text-green-600" size={24} />
                <span className="font-bold text-lg text-green-800">
                  ✅ Encontrei {processResult.processes.length} processos seus!
                </span>
              </div>
              
              {processResult.processes.map((process: any, index: number) => (
                <div key={index} className="bg-white rounded-lg p-4 border-2 border-green-200 mb-4">
                  <h3 className="font-bold text-xl text-gray-800 mb-3">
                    📋 {process.type}
                  </h3>
                  <div className="space-y-3 text-base">
                    <p><strong>🔍 Situação:</strong> {process.status}</p>
                    <p><strong>📅 Última atualização:</strong> {new Date(process.last_movement.date).toLocaleDateString('pt-BR')}</p>
                    <p><strong>🏛️ Fórum:</strong> {process.court}</p>
                    <div className="bg-blue-50 p-4 rounded-lg mt-3">
                      <p className="text-blue-800 text-lg">
                        <strong>💬 Explicação simples:</strong><br/>
                        {process.last_movement.simple_explanation}
                      </p>
                    </div>
                    
                    {/* Análise de IA por processo */}
                    <div className="bg-purple-50 p-4 rounded-lg mt-3 border border-purple-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">🤖</span>
                        <span className="font-semibold text-purple-800">Análise Inteligente</span>
                        <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                          {process.ai_analysis.confidence} confiança
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p><strong>🎯 Próxima ação:</strong> {process.ai_analysis.next_action}</p>
                        <p><strong>⏱️ Previsão:</strong> {process.ai_analysis.estimated_completion}</p>
                        <p><strong>📈 Prioridade:</strong> 
                          <span className={`ml-1 px-2 py-1 rounded text-xs ${
                            process.ai_analysis.priority === 'high' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {process.ai_analysis.priority === 'high' ? '🚨 ALTA' : '📋 NORMAL'}
                          </span>
                        </p>
                      </div>
                    </div>
                    {process.intimations && process.intimations.length > 0 && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-3">
                        <h4 className="font-bold text-yellow-800 mb-2">⚠️ ATENÇÃO - Você tem intimação!</h4>
                        {process.intimations.map((intimation: any, idx: number) => (
                          <div key={idx} className="mb-2">
                            <p className="text-yellow-800">
                              <strong>{intimation.type}:</strong> {intimation.simple_explanation}
                            </p>
                            {intimation.deadline && (
                              <p className="text-red-600 font-bold">
                                ⏰ Prazo até: {new Date(intimation.deadline).toLocaleDateString('pt-BR')}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={handleConnect}
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Conectando...</span>
                  </div>
                ) : (
                  <>
                    <Video className="inline mr-2" size={24} />
                    🎥 FALAR COM O FÓRUM POR VÍDEO
                  </>
                )}
              </button>
              
              <button
                onClick={() => onAction('encerrar')}
                className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600"
              >
                🏁 ENCERRAR ATENDIMENTO
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowProcessConsultation(false)}
          className="w-full bg-gray-200 text-gray-700 py-3 text-lg rounded-lg hover:bg-gray-300"
        >
          ← Voltar ao Menu
        </button>
      </div>
    );
  }

  if (showIntimations) {
    const allIntimations = mockProcesses
      .filter(p => p.owner_cpf === '123.456.789-00')
      .flatMap(p => p.intimations || [])
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            📬 Suas Intimações
          </h2>
          <p className="text-lg text-gray-600">Avisos importantes sobre seus processos</p>
        </div>

        {allIntimations.length > 0 ? (
          <div className="space-y-4">
            {allIntimations.map((intimation, index) => (
              <div 
                key={index} 
                className={`rounded-lg p-4 border-l-4 ${
                  intimation.action_required 
                    ? 'bg-red-50 border-red-400' 
                    : 'bg-green-50 border-green-400'
                }`}
              >
                <div className="flex items-center mb-3">
                  <Bell className={intimation.action_required ? 'text-red-600' : 'text-green-600'} size={24} />
                  <h3 className="ml-2 font-bold text-lg">
                    {intimation.action_required ? '🚨 URGENTE' : '✅ INFORMATIVO'}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  <p className="text-base">
                    <strong>📅 Data:</strong> {new Date(intimation.date).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-base">
                    <strong>📋 Tipo:</strong> {intimation.type}
                  </p>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-lg font-medium text-gray-800">
                      💬 <strong>O que significa:</strong><br/>
                      {intimation.simple_explanation}
                    </p>
                  </div>
                  
                  {intimation.deadline && (
                    <div className="bg-yellow-100 p-3 rounded-lg border border-yellow-300">
                      <p className="text-red-600 font-bold text-lg">
                        ⏰ PRAZO: até {new Date(intimation.deadline).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Bell className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-lg text-gray-600">Você não tem intimações pendentes</p>
          </div>
        )}

        <button
          onClick={() => setShowIntimations(false)}
          className="w-full bg-gray-200 text-gray-700 py-3 text-lg rounded-lg hover:bg-gray-300"
        >
          ← Voltar ao Menu
        </button>
      </div>
    );
  }

  if (showEvaluation) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">
            ⭐ Como foi nosso atendimento?
          </h2>
          <p className="text-lg text-gray-600">
            Você fez: <strong>{lastAction}</strong>
          </p>
          <p className="text-base text-gray-500 mt-2">
            Sua opinião nos ajuda a melhorar!
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 text-center">
            🌟 O atendimento foi bom para você?
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                alert('😊 Obrigado! Ficamos felizes que tenha gostado!');
                setShowEvaluation(false);
              }}
              className="bg-green-500 text-white py-4 px-6 rounded-lg text-lg font-bold hover:bg-green-600"
            >
              😊 SIM, GOSTEI
            </button>
            
            <button
              onClick={() => {
                alert('😔 Obrigado pelo feedback! Vamos melhorar para você!');
                setShowEvaluation(false);
              }}
              className="bg-red-500 text-white py-4 px-6 rounded-lg text-lg font-bold hover:bg-red-600"
            >
              😔 NÃO GOSTEI
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-3">Ou dê uma nota de 1 a 5:</p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    alert(`⭐ Obrigado pela nota ${star}! Sua opinião é importante!`);
                    setShowEvaluation(false);
                  }}
                  className="text-3xl hover:scale-110 transition-transform"
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowEvaluation(false)}
          className="w-full bg-gray-200 text-gray-700 py-3 text-lg rounded-lg hover:bg-gray-300"
        >
          ✖️ Pular Avaliação
        </button>
      </div>
    );
  }

  if (showHelp) {
    return (
      <HelpCenter
        userProfile="cidadao"
        onClose={() => setShowHelp(false)}
        onAction={onAction}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* AI Agent Selector */}
      <AIAgents
        userProfile="cidadao"
        onAgentSelect={setSelectedAgent}
        currentChannel="widget"
      />
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-700 mb-3">
          👤 Olá! Eu sou seu Assistente da Justiça
        </h2>
        <p className="text-lg text-gray-600">O que você precisa fazer hoje?</p>
        {selectedAgent && (
          <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              🤖 <strong>{selectedAgent.name}</strong> está te atendendo com estilo {selectedAgent.personality.toLowerCase()}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mainButtons.map((button, index) => {
          const Icon = button.icon;
          return (
            <button
              key={index}
              onClick={button.action}
              className={`${button.color} text-white p-4 rounded-xl text-left transition-all hover:shadow-lg`}
            >
              <div className="flex items-center space-x-3">
                <Icon size={32} />
                <div>
                  <h3 className="font-semibold text-lg">{button.title}</h3>
                  <p className="text-sm opacity-90">{button.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CitizenInterface;