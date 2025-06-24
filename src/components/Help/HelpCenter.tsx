import React, { useState } from 'react';
import { Video, MessageSquare, ArrowLeft, Search, ExternalLink } from 'lucide-react';
import { mockKnowledgeBase } from '../../data/mockData';
import { UserProfile } from '../../types';

interface HelpCenterProps {
  userProfile: UserProfile;
  onClose: () => void;
  onAction: (action: string, data?: any) => void;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ userProfile, onClose, onAction }) => {
  const [activeSection, setActiveSection] = useState<string>('main');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const getProfileConfig = () => {
    switch (userProfile) {
      case 'cidadao':
        return {
          title: '👤 Ajuda para Cidadão',
          color: 'green',
          topics: [
            { id: 'processes', title: '📋 Como consultar meus processos', icon: '📋' },
            { id: 'intimations', title: '📬 O que são intimações', icon: '📬' },
            { id: 'deadlines', title: '⏰ Entender prazos', icon: '⏰' },
            { id: 'virtual', title: '🎥 Usar o balcão virtual', icon: '🎥' },
            { id: 'documents', title: '📄 Documentos necessários', icon: '📄' }
          ]
        };
      case 'advogado':
        return {
          title: '⚖️ Ajuda para Advogado',
          color: 'blue',
          topics: [
            { id: 'petition', title: '📄 Como protocolar petições', icon: '📄' },
            { id: 'clients', title: '👥 Consultar processos de clientes', icon: '👥' },
            { id: 'schedule', title: '📅 Agendar audiências', icon: '📅' },
            { id: 'systems', title: '🖥️ Problemas técnicos', icon: '🖥️' },
            { id: 'deadlines', title: '⏰ Prazos processuais', icon: '⏰' }
          ]
        };
      case 'servidor':
        return {
          title: '🏛️ Ajuda para Servidor',
          color: 'orange',
          topics: [
            { id: 'dashboard', title: '📊 Usar o dashboard', icon: '📊' },
            { id: 'escalations', title: '🚨 Gerenciar escalações', icon: '🚨' },
            { id: 'knowledge', title: '📚 Base de conhecimento', icon: '📚' },
            { id: 'metrics', title: '📈 Interpretar métricas', icon: '📈' },
            { id: 'backlog', title: '📝 Gerenciar backlog', icon: '📝' }
          ]
        };
    }
  };

  const config = getProfileConfig();

  const handleSearch = () => {
    if (!searchTerm) return;
    
    setIsSearching(true);
    setTimeout(() => {
      const results = mockKnowledgeBase.filter(item => 
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.related_terms.some(term => term.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSearchResults(results);
      setIsSearching(false);
      setActiveSection('search');
    }, 1500);
  };

  const handleWatchVideo = (topic: string) => {
    onAction('protocol', {
      type: 'tutorial_video',
      protocol: `JUS-${new Date().toISOString().slice(0,19).replace(/[-:]/g, '').replace('T', '-')}-TUT`,
      responseTime: '10s'
    });
    alert(`🎥 Abrindo vídeo tutorial sobre "${topic}"...\n\n📱 O vídeo será reproduzido em uma nova janela.\n🎯 Duração estimada: 2-3 minutos`);
  };

  const handleContactSupport = () => {
    onAction('protocol', {
      type: 'suporte_humano',
      protocol: `JUS-${new Date().toISOString().slice(0,19).replace(/[-:]/g, '').replace('T', '-')}-SUP`,
      responseTime: '30s'
    });
    alert('💬 Conectando com suporte humano...\n\n👨‍💼 Você será direcionado para um atendente especializado.\n⏱️ Tempo médio de espera: 2-3 minutos');
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-50 border-green-200 text-green-800';
      case 'blue': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'orange': return 'bg-orange-50 border-orange-200 text-orange-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const renderTopicDetails = (topicId: string) => {
    const topicData = {
      processes: {
        title: '📋 Como consultar meus processos',
        content: [
          '1️⃣ Digite seu CPF no campo indicado',
          '2️⃣ Clique em "Buscar meus processos"', 
          '3️⃣ Aguarde a busca ser concluída',
          '4️⃣ Veja os resultados em linguagem simples',
          '5️⃣ Use o botão "Falar por vídeo" se precisar de ajuda'
        ],
        tips: 'Mantenha seus documentos em mãos para eventuais confirmações.'
      },
      intimations: {
        title: '📬 O que são intimações',
        content: [
          '📨 São avisos oficiais do tribunal sobre seu processo',
          '⚖️ Informam sobre decisões, prazos e ações necessárias',
          '🚨 Algumas requerem ação sua dentro de um prazo',
          '✅ Outras são apenas informativas',
          '📅 Sempre verifique os prazos indicados'
        ],
        tips: 'Intimações com prazo são URGENTES. Não ignore!'
      },
      petition: {
        title: '📄 Como protocolar petições',
        content: [
          '📁 Prepare o arquivo PDF da petição',
          '🔐 Certifique-se que está assinado digitalmente',
          '📤 Faça upload do arquivo no sistema',
          '⏳ Aguarde a validação automática',
          '✅ Confirme o protocolo se tudo estiver correto'
        ],
        tips: 'Documentos mal formatados podem ser rejeitados automaticamente.'
      },
      clients: {
        title: '👥 Consultar processos de clientes',
        content: [
          '🔒 Sistema verifica suas credenciais OAB',
          '📝 Digite o CPF do cliente autorizado',
          '🔍 Sistema busca processos vinculados',
          '📊 Visualize status e movimentações',
          '⚠️ Verifique intimações pendentes do cliente'
        ],
        tips: 'Só é possível consultar clientes com procuração ativa.'
      }
    };

    const topic = topicData[topicId as keyof typeof topicData] || topicData.processes;

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{topic.title}</h3>
        </div>
        
        <div className={`rounded-lg p-4 border ${getColorClasses(config.color)}`}>
          <h4 className="font-semibold mb-3">📝 Passo a passo:</h4>
          <div className="space-y-2">
            {topic.content.map((step, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Dica importante:</h4>
          <p className="text-yellow-700 text-sm">{topic.tips}</p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => handleWatchVideo(topic.title)}
            className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            <Video className="inline mr-2" size={16} />
            🎥 VER VÍDEO TUTORIAL
          </button>
          
          <button
            onClick={handleContactSupport}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            <MessageSquare className="inline mr-2" size={16} />
            💬 FALAR COM HUMANO
          </button>
        </div>
      </div>
    );
  };

  if (activeSection === 'search') {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveSection('main')}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-gray-800">
            🔍 Resultados da busca por "{searchTerm}"
          </h2>
        </div>

        {searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((result) => (
              <div key={result.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{result.term}</h3>
                <p className="text-gray-600 text-sm mb-3">{result.content}</p>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-blue-800 text-sm">
                    <strong>💬 Explicação simples:</strong><br/>
                    {result.simple_explanation}
                  </p>
                </div>
                {result.video_url && (
                  <button
                    onClick={() => handleWatchVideo(result.term)}
                    className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    <Video className="inline mr-1" size={16} />
                    Ver vídeo explicativo
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Search className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">Nenhum resultado encontrado para "{searchTerm}"</p>
            <button
              onClick={handleContactSupport}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              💬 Falar com atendente
            </button>
          </div>
        )}
      </div>
    );
  }

  if (activeSection !== 'main') {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveSection('main')}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Ajuda Detalhada</h2>
        </div>
        {renderTopicDetails(activeSection)}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">{config.title}</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800"
        >
          ✖️
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Digite sua dúvida..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={!searchTerm || isSearching}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            {isSearching ? '⏳' : '🔍'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {config.topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveSection(topic.id)}
              className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{topic.icon}</span>
                <span className="font-medium text-gray-800">{topic.title}</span>
                <ExternalLink size={16} className="text-gray-400 ml-auto" />
              </div>
            </button>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">🆘 Precisa de ajuda imediata?</h3>
          <div className="space-y-2">
            <button
              onClick={handleContactSupport}
              className="w-full bg-green-500 text-white py-2 rounded font-medium hover:bg-green-600"
            >
              💬 Falar com atendente humano
            </button>
            <p className="text-yellow-700 text-xs text-center">
              Disponível 24h • Tempo médio de resposta: 2-3 minutos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;