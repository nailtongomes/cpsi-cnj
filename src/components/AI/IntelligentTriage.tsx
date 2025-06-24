import React, { useState, useEffect } from 'react';

interface TriageDecision {
  action: 'ai_resolve' | 'human_escalate' | 'email_forward' | 'ti_escalate';
  reason: string;
  confidence: number;
  suggested_team?: string;
  estimated_resolution_time?: string;
}

interface IntelligentTriageProps {
  query: string;
  userProfile: string;
  onTriageComplete: (decision: TriageDecision) => void;
}

const IntelligentTriage: React.FC<IntelligentTriageProps> = ({
  query,
  userProfile,
  onTriageComplete
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [decision, setDecision] = useState<TriageDecision | null>(null);

  const analyzeQuery = (query: string, profile: string): TriageDecision => {
    const lowerQuery = query.toLowerCase();
    
    // Padrões para problemas técnicos
    const techIssues = [
      'não carrega', 'erro', 'bug', 'sistema fora', 'não funciona', 
      'lento', 'travando', 'pdf não abre', 'upload falha', 'login não funciona'
    ];
    
    // Padrões para questões que precisam de humano
    const humanNeeded = [
      'orientação jurídica', 'qual advogado', 'como proceder', 'não entendo',
      'prazo específico', 'caso complexo', 'situação particular', 'emergência'
    ];
    
    // Padrões para encaminhamento via email
    const emailForward = [
      'reset senha', 'alterar dados', 'problema de acesso', 'validação identidade',
      'certidão', 'documento oficial', 'tribunal origem'
    ];
    
    // Questões simples que IA pode resolver
    const aiCanResolve = [
      'consultar processo', 'ver intimações', 'como funciona', 'horário atendimento',
      'taxa de processo', 'documentos necessários', 'prazo padrão'
    ];

    // Análise de padrões
    if (techIssues.some(pattern => lowerQuery.includes(pattern))) {
      return {
        action: 'ti_escalate',
        reason: 'Problema técnico identificado - requer intervenção da equipe de TI',
        confidence: 0.85,
        suggested_team: 'Equipe TI - Sistemas',
        estimated_resolution_time: '2-4 horas'
      };
    }

    if (emailForward.some(pattern => lowerQuery.includes(pattern))) {
      return {
        action: 'email_forward',
        reason: 'Questão de segurança/validação - encaminhar para tribunal de origem',
        confidence: 0.90,
        estimated_resolution_time: '24-48 horas'
      };
    }

    if (humanNeeded.some(pattern => lowerQuery.includes(pattern))) {
      return {
        action: 'human_escalate',
        reason: 'Requer orientação humanizada especializada',
        confidence: 0.75,
        suggested_team: 'Atendimento Humanizado',
        estimated_resolution_time: '15-30 minutos'
      };
    }

    if (aiCanResolve.some(pattern => lowerQuery.includes(pattern))) {
      return {
        action: 'ai_resolve',
        reason: 'Consulta padrão - IA pode resolver eficientemente',
        confidence: 0.95,
        estimated_resolution_time: '30-60 segundos'
      };
    }

    // Análise por perfil de usuário
    if (profile === 'cidadao' && lowerQuery.length > 100) {
      return {
        action: 'human_escalate',
        reason: 'Cidadão com questão complexa - melhor atendimento humanizado',
        confidence: 0.70,
        suggested_team: 'Atendimento Humanizado',
        estimated_resolution_time: '20-35 minutos'
      };
    }

    // Caso padrão
    return {
      action: 'ai_resolve',
      reason: 'Tentativa inicial com IA - escalação automática se necessário',
      confidence: 0.60,
      estimated_resolution_time: '1-2 minutos'
    };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const triageResult = analyzeQuery(query, userProfile);
      setDecision(triageResult);
      setIsAnalyzing(false);
      onTriageComplete(triageResult);
    }, 1500); // Simula tempo de análise

    return () => clearTimeout(timer);
  }, [query, userProfile, onTriageComplete]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'ai_resolve': return '🤖';
      case 'human_escalate': return '👤';
      case 'email_forward': return '📧';
      case 'ti_escalate': return '⚙️';
      default: return '🔄';
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'ai_resolve': return 'Resolução via IA';
      case 'human_escalate': return 'Escalação Humana';
      case 'email_forward': return 'Encaminhamento Email';
      case 'ti_escalate': return 'Suporte Técnico';
      default: return 'Processando...';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-2 rounded-full mr-3">
          <span className="text-xl">🧠</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Sistema de Triagem Inteligente
        </h3>
      </div>

      {isAnalyzing ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-gray-600">Analisando consulta...</span>
        </div>
      ) : decision && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Consulta Analisada:</h4>
            <p className="text-gray-600 italic">"{query}"</p>
            <p className="text-sm text-gray-500 mt-1">Perfil: {userProfile}</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{getActionIcon(decision.action)}</span>
              <h4 className="font-semibold text-gray-800">
                {getActionLabel(decision.action)}
              </h4>
            </div>
            
            <p className="text-gray-600 mb-2">{decision.reason}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <span className={`font-medium ${getConfidenceColor(decision.confidence)}`}>
                Confiança: {Math.round(decision.confidence * 100)}%
              </span>
              
              {decision.estimated_resolution_time && (
                <span className="text-gray-500">
                  ⏱️ Tempo estimado: {decision.estimated_resolution_time}
                </span>
              )}
            </div>

            {decision.suggested_team && (
              <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                <span className="font-medium text-blue-800">
                  Equipe sugerida: {decision.suggested_team}
                </span>
              </div>
            )}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              <span className="text-green-800 font-medium">
                Triagem concluída - Direcionamento otimizado
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntelligentTriage;