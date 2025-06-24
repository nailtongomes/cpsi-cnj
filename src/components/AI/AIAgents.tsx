import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../types';
import { Bot, Heart, Scale, Users, Clock, MessageCircle } from 'lucide-react';

interface AIAgent {
  id: string;
  name: string;
  personality: string;
  specialization: string;
  icon: string;
  description: string;
  response_style: string;
  suitable_for: UserProfile[];
  greeting: string;
  sample_responses: string[];
}

interface AIAgentsProps {
  userProfile: UserProfile;
  onAgentSelect: (agent: AIAgent) => void;
  currentChannel: string;
}

const aiAgents: AIAgent[] = [
  {
    id: 'sofia_empática',
    name: 'Sofia - Assistente Empática',
    personality: 'Calorosa, paciente e compreensiva',
    specialization: 'Atendimento a cidadãos em situação vulnerável',
    icon: '💙',
    description: 'Especializada em acolher pessoas em momentos difíceis, com linguagem simples e tom afetuoso.',
    response_style: 'Linguagem muito simples, tons carinhosos, explicações passo-a-passo',
    suitable_for: ['cidadao'],
    greeting: 'Olá, querido(a)! Eu sou a Sofia e estou aqui para te ajudar com muito carinho. Me conta o que você precisa?',
    sample_responses: [
      'Sei que pode ser difícil entender essas questões jurídicas, mas vou te explicar de forma bem simples...',
      'Não se preocupe, vamos resolver isso juntos. Você não está sozinho(a) nessa situação...',
      'Entendo sua preocupação. Vou te orientar passo a passo para que tudo fique mais claro...'
    ]
  },
  {
    id: 'carlos_técnico',
    name: 'Dr. Carlos - Consultor Jurídico',
    personality: 'Preciso, técnico e respeitoso',
    specialization: 'Atendimento a advogados e profissionais do direito',
    icon: '⚖️',
    description: 'Foco em questões técnicas, jurisprudência e procedimentos para profissionais da área.',
    response_style: 'Linguagem técnica apropriada, referências jurídicas, objetividade',
    suitable_for: ['advogado'],
    greeting: 'Bom dia, colega. Sou o Dr. Carlos, consultor jurídico especializado em procedimentos judiciais. Como posso auxiliá-lo?',
    sample_responses: [
      'Conforme o Art. 219 do CPC/2015, para a citação por mandado, observe os requisitos do Art. 250...',
      'A jurisprudência consolidada do STJ no REsp 1.xxx.xxx estabelece que...',
      'Para o protocolo eletrônico no PJe, recomendo verificar o Manual de Procedimentos da Resolução CNJ nº...'
    ]
  },
  {
    id: 'ana_administrativa',
    name: 'Ana - Especialista Processual',
    personality: 'Organizada, eficiente e didática',
    specialization: 'Apoio a servidores da justiça e gestão processual',
    icon: '🏛️',
    description: 'Focada em rotinas administrativas, fluxos processuais e organização judiciária.',
    response_style: 'Didática, com foco em processos e procedimentos internos',
    suitable_for: ['servidor'],
    greeting: 'Olá! Sou a Ana, especialista em gestão processual. Estou aqui para otimizar seus procedimentos administrativos.',
    sample_responses: [
      'Para agilizar o fluxo deste tipo de processo, recomendo seguir o protocolo estabelecido no Manual...',
      'Baseado nos indicadores de produtividade, sugiro priorizar os processos com prazo em...',
      'O sistema registra que você pode otimizar esse procedimento seguindo estas etapas...'
    ]
  },
  {
    id: 'roberto_senior',
    name: 'Sr. Roberto - Consultor Sênior',
    personality: 'Experiente, conselheiro e respeitoso',
    specialization: 'Casos complexos e orientação estratégica',
    icon: '👨‍⚖️',
    description: 'Para situações que exigem experiência e análise estratégica aprofundada.',
    response_style: 'Tom respeitoso, análises contextualizadas, visão estratégica',
    suitable_for: ['cidadao', 'advogado', 'servidor'],
    greeting: 'Boa tarde. Sou o Sr. Roberto, consultor sênior com 30 anos de experiência na Justiça. Vamos analisar sua situação com cuidado.',
    sample_responses: [
      'Com base na minha experiência, casos similares ao seu geralmente seguem este caminho...',
      'Considerando o contexto mais amplo, recomendo uma abordagem estratégica que contemple...',
      'Na minha análise, os precedentes indicam que a melhor estratégia seria...'
    ]
  },
  {
    id: 'marina_jovem',
    name: 'Marina - Assistente Digital',
    personality: 'Dinâmica, moderna e acessível',
    specialization: 'Tecnologia, inovação e atendimento ágil',
    icon: '🚀',
    description: 'Especializada em soluções digitais, linguagem moderna e atendimento rápido.',
    response_style: 'Linguagem atual, foco em eficiência, soluções digitais',
    suitable_for: ['cidadao', 'advogado'],
    greeting: 'Oi! 👋 Eu sou a Marina, sua assistente digital! Vamos resolver isso de forma rápida e moderna?',
    sample_responses: [
      'Posso te ajudar a resolver isso super rápido! Vou te mandar um link direto para...',
      'Que tal usarmos o app do tribunal? É muito mais prático e você acompanha tudo em tempo real...',
      'Criei um checklist personalizado para você. Quer que eu envie no seu WhatsApp?'
    ]
  }
];

const AIAgents: React.FC<AIAgentsProps> = ({ userProfile, onAgentSelect, currentChannel }) => {
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  // Auto-select best agent for profile
  useEffect(() => {
    const suitableAgents = aiAgents.filter(agent => 
      agent.suitable_for.includes(userProfile)
    );
    
    if (suitableAgents.length > 0 && !selectedAgent) {
      const defaultAgent = suitableAgents[0];
      setSelectedAgent(defaultAgent);
      onAgentSelect(defaultAgent);
    }
  }, [userProfile, selectedAgent, onAgentSelect]);

  const handleAgentChange = (agent: AIAgent) => {
    setSelectedAgent(agent);
    onAgentSelect(agent);
  };

  const getChannelContext = () => {
    switch (currentChannel) {
      case 'phone':
        return 'Ligação Telefônica';
      case 'whatsapp':
        return 'WhatsApp';
      case 'widget':
        return 'Chat Web';
      case 'totem':
        return 'Totem';
      default:
        return 'Chat';
    }
  };

  if (showComparison) {
    return (
      <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-purple-800 flex items-center gap-2">
            <Bot size={24} />
            Comparação de Agentes IA
          </h3>
          <button
            onClick={() => setShowComparison(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {aiAgents
            .filter(agent => agent.suitable_for.includes(userProfile))
            .map((agent) => (
              <div
                key={agent.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedAgent?.id === agent.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleAgentChange(agent)}
              >
                <div className="text-center mb-3">
                  <div className="text-3xl mb-2">{agent.icon}</div>
                  <h4 className="font-bold text-lg">{agent.name}</h4>
                  <p className="text-sm text-gray-600">{agent.personality}</p>
                </div>
                
                <div className="space-y-2 text-xs">
                  <p><strong>Especialização:</strong> {agent.specialization}</p>
                  <p><strong>Estilo:</strong> {agent.response_style}</p>
                </div>

                <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                  <p className="font-medium mb-1">Exemplo de resposta:</p>
                  <p className="italic text-gray-700">"{agent.sample_responses[0]}"</p>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setShowComparison(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Confirmar Seleção
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bot className="text-purple-600" size={20} />
          <span className="font-bold text-purple-800">Agente IA Selecionado</span>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
            {getChannelContext()}
          </span>
        </div>
        <button
          onClick={() => setShowComparison(true)}
          className="text-xs bg-white text-purple-600 px-3 py-1 rounded-full hover:bg-purple-50 border border-purple-200"
        >
          Trocar Agente
        </button>
      </div>

      {selectedAgent && (
        <div className="flex items-start gap-3">
          <div className="text-2xl">{selectedAgent.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-gray-800">{selectedAgent.name}</h4>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Recomendado para você
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{selectedAgent.description}</p>
            
            <div className="bg-white p-3 rounded-lg border border-purple-100">
              <p className="text-sm font-medium text-purple-800 mb-1">Mensagem de boas-vindas:</p>
              <p className="text-sm italic text-gray-700">"{selectedAgent.greeting}"</p>
            </div>

            <div className="flex gap-2 mt-2 text-xs">
              <span className="flex items-center gap-1 text-gray-600">
                <Heart size={12} />
                {selectedAgent.personality}
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <Scale size={12} />
                {selectedAgent.specialization.substring(0, 30)}...
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-purple-100">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Users size={12} />
              {aiAgents.filter(a => a.suitable_for.includes(userProfile)).length} agentes disponíveis
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              Resposta em ~2s
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={12} />
            IA Humanizada CNJ
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgents;