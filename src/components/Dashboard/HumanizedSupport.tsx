import React, { useState, useEffect } from 'react';
import { mockEscalations } from '../../data/mockData';
import { Escalation } from '../../types';
import IntelligentTriage from '../AI/IntelligentTriage';
import EmailForwarding from '../Escalation/EmailForwarding';

interface SupportMetrics {
  totalEscalacoes: number;
  resolvidasHumano: number;
  escaladosTI: number;
  encaminhadosEmail: number;
  tempoMedioResolucao: string;
  satisfacaoMedia: number;
  filaAtual: number;
}

const HumanizedSupport: React.FC = () => {
  const [escalations] = useState<Escalation[]>(mockEscalations);
  const [selectedEscalation, setSelectedEscalation] = useState<Escalation | null>(null);
  const [showTriage, setShowTriage] = useState(false);
  const [showEmailForwarding, setShowEmailForwarding] = useState(false);
  const [triageQuery, setTriageQuery] = useState('');
  const [metrics, setMetrics] = useState<SupportMetrics>({
    totalEscalacoes: 0,
    resolvidasHumano: 0,
    escaladosTI: 0,
    encaminhadosEmail: 0,
    tempoMedioResolucao: '0min',
    satisfacaoMedia: 0,
    filaAtual: 0
  });

  useEffect(() => {
    const calculateMetrics = () => {
      const total = escalations.length;
      const resolvidasHumano = escalations.filter(e => e.status === 'resolvido_humano').length;
      const escaladosTI = escalations.filter(e => e.status === 'escalado_ti').length;
      const encaminhadosEmail = escalations.filter(e => e.status === 'convertido_email').length;
      const filaAtual = escalations.filter(e => !e.status || e.status === 'pendente').length;
      
      const satisfacoes = escalations.filter(e => e.satisfaction).map(e => e.satisfaction!);
      const satisfacaoMedia = satisfacoes.length > 0 
        ? satisfacoes.reduce((a, b) => a + b, 0) / satisfacoes.length 
        : 0;

      setMetrics({
        totalEscalacoes: total,
        resolvidasHumano,
        escaladosTI,
        encaminhadosEmail,
        tempoMedioResolucao: '18min',
        satisfacaoMedia,
        filaAtual
      });
    };

    calculateMetrics();
  }, [escalations]);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'resolvido_humano': return 'bg-green-100 text-green-800';
      case 'escalado_ti': return 'bg-blue-100 text-blue-800';
      case 'convertido_email': return 'bg-purple-100 text-purple-800';
      case 'em_atendimento': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'resolvido_humano': return '✅ Resolvido';
      case 'escalado_ti': return '⚙️ Escalado TI';
      case 'convertido_email': return '📧 Enc. Email';
      case 'em_atendimento': return '👤 Em Atendimento';
      default: return '⏳ Pendente';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'normal': return '🟡';
      default: return '🟢';
    }
  };

  const handleTriageComplete = (decision: any) => {
    console.log('Triagem concluída:', decision);
    setShowTriage(false);
  };

  const handleEmailSent = (emailData: any) => {
    console.log('Email enviado:', emailData);
    setShowEmailForwarding(false);
  };

  return (
    <div className="space-y-6">
      {/* Métricas do Atendimento Humanizado */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="bg-orange-100 p-2 rounded-full mr-3">👥</span>
          Dashboard de Atendimento Humanizado
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{metrics.totalEscalacoes}</div>
            <div className="text-sm text-blue-800">Total Escalações</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{metrics.resolvidasHumano}</div>
            <div className="text-sm text-green-800">Resolvidas Humano</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{metrics.encaminhadosEmail}</div>
            <div className="text-sm text-purple-800">Enc. por Email</div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{metrics.filaAtual}</div>
            <div className="text-sm text-orange-800">Na Fila</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-lg font-semibold text-gray-700">{metrics.tempoMedioResolucao}</div>
            <div className="text-sm text-gray-600">Tempo Médio</div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-lg font-semibold text-yellow-700">
              {metrics.satisfacaoMedia.toFixed(1)}/5.0
            </div>
            <div className="text-sm text-yellow-600">Satisfação</div>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg text-center">
            <div className="text-lg font-semibold text-indigo-700">{metrics.escaladosTI}</div>
            <div className="text-sm text-indigo-600">Escalados TI</div>
          </div>
        </div>
      </div>

      {/* Ferramenta de Triagem */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="bg-blue-100 p-2 rounded-full mr-3">🧠</span>
          Ferramenta de Triagem Inteligente
        </h3>
        
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Digite uma consulta para testar a triagem..."
            value={triageQuery}
            onChange={(e) => setTriageQuery(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={() => setShowTriage(true)}
            disabled={!triageQuery.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analisar
          </button>
        </div>
        
        <p className="text-sm text-gray-600">
          Teste como o sistema identifica automaticamente o tipo de suporte necessário
        </p>
      </div>

      {/* Lista de Escalações */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="bg-red-100 p-2 rounded-full mr-3">📋</span>
          Casos de Escalação Recentes
        </h3>

        <div className="space-y-4">
          {escalations.map((escalation) => (
            <div key={escalation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-800">
                      {escalation.id}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(escalation.status)}`}>
                      {getStatusLabel(escalation.status)}
                    </span>
                    <span className="text-lg">
                      {getPriorityIcon(escalation.priority)}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-gray-800 mb-1">{escalation.problem}</h4>
                  <p className="text-sm text-gray-600 mb-2">"{escalation.original_query}"</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>👤 {escalation.user.name}</span>
                    <span>⏱️ Fila: {escalation.queue_time}</span>
                    {escalation.resolution_time && (
                      <span>✅ Resolvido em: {escalation.resolution_time}</span>
                    )}
                    {escalation.satisfaction && (
                      <span>⭐ {escalation.satisfaction}/5</span>
                    )}
                  </div>

                  {escalation.resolution && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded text-sm">
                      <strong className="text-green-800">Resolução:</strong>
                      <p className="text-green-700 mt-1">{escalation.resolution}</p>
                    </div>
                  )}

                  {escalation.email_sent_to && (
                    <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded text-sm">
                      <strong className="text-purple-800">Email Enviado:</strong>
                      <p className="text-purple-700 mt-1">
                        Para: {escalation.email_sent_to}<br/>
                        Assunto: {escalation.email_subject}<br/>
                        Resposta esperada: {escalation.expected_response_time}
                      </p>
                    </div>
                  )}
                </div>

                <div className="ml-4 flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedEscalation(escalation)}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    Detalhes
                  </button>
                  
                  {escalation.status === 'convertido_email' && (
                    <button
                      onClick={() => {
                        setSelectedEscalation(escalation);
                        setShowEmailForwarding(true);
                      }}
                      className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
                    >
                      Ver Email
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights e Melhorias */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="bg-green-100 p-2 rounded-full mr-3">💡</span>
          Insights e Oportunidades de Melhoria
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">🎯 Efetividade da Triagem</h4>
            <p className="text-sm text-blue-700">
              87% dos casos são direcionados corretamente na primeira tentativa, 
              reduzindo tempo de resolução em 45%.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">⚡ Tempo de Resposta</h4>
            <p className="text-sm text-green-700">
              Casos resolvidos por humanos tem satisfação 23% maior que escalações automáticas.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-800 mb-2">📧 Encaminhamentos</h4>
            <p className="text-sm text-purple-700">
              Emails estruturados reduzem tempo de resposta dos tribunais em 60%.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-medium text-orange-800 mb-2">🤝 Impacto Humanizado</h4>
            <p className="text-sm text-orange-700">
              Atendimento humanizado melhora NPS de 3.2 para 4.6, aumentando confiança na plataforma.
            </p>
          </div>
        </div>
      </div>

      {/* Modais */}
      {showTriage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              <button
                onClick={() => setShowTriage(false)}
                className="float-right text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
              <IntelligentTriage
                query={triageQuery}
                userProfile="cidadao"
                onTriageComplete={handleTriageComplete}
              />
            </div>
          </div>
        </div>
      )}

      {showEmailForwarding && selectedEscalation && (
        <EmailForwarding
          escalation={selectedEscalation}
          onEmailSent={handleEmailSent}
          onClose={() => setShowEmailForwarding(false)}
        />
      )}
    </div>
  );
};

export default HumanizedSupport;