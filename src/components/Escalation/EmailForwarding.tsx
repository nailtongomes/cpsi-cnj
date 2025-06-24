import React, { useState, useEffect } from 'react';
import { Escalation } from '../../types';

interface EmailForwardingProps {
  escalation: Escalation;
  onEmailSent: (emailData: any) => void;
  onClose: () => void;
}

interface EmailTemplate {
  subject: string;
  body: string;
  recipient: string;
  urgency: 'normal' | 'high' | 'urgent';
}

const EmailForwarding: React.FC<EmailForwardingProps> = ({
  escalation,
  onEmailSent,
  onClose
}) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const generateEmailTemplate = (escalation: Escalation): EmailTemplate => {
    const { user, problem, original_query, escalation_reason } = escalation;
    
    // Determinar destinatário baseado no problema
    const getRecipient = () => {
      if (problem.includes('senha') || problem.includes('acesso')) {
        return 'suporte.acesso@tribunal.jus.br';
      }
      if (problem.includes('documento') || problem.includes('certidão')) {
        return 'documentos@tribunal.jus.br';
      }
      if (problem.includes('processo') && user.cpf) {
        // Extrai tribunal do CPF ou processo
        return 'tribunal-origem@tjsp.jus.br';
      }
      return 'atendimento@tribunal.jus.br';
    };

    // Determinar urgência
    const getUrgency = (): 'normal' | 'high' | 'urgent' => {
      if (escalation.priority === 'high') return 'high';
      if (problem.includes('prazo') || problem.includes('urgente')) return 'urgent';
      return 'normal';
    };

    // Gerar assunto
    const generateSubject = () => {
      const baseSubject = `[ESCALAÇÃO CNJ] ${problem}`;
      const userType = user.profile === 'cidadao' ? 'Cidadão' : 
                      user.profile === 'advogado' ? 'Advogado' : 'Servidor';
      return `${baseSubject} - ${userType} ${user.name}`;
    };

    // Gerar corpo do email
    const generateBody = () => {
      const urgencyText = getUrgency() === 'urgent' ? '🚨 URGENTE - ' : 
                         getUrgency() === 'high' ? '⚡ ALTA PRIORIDADE - ' : '';
      
      return `${urgencyText}Escalação do Assistente Digital CNJ

📋 DADOS DO SOLICITANTE:
• Nome: ${user.name}
• CPF: ${user.cpf || 'Não informado'}
• OAB: ${user.oab || 'Não aplicável'}
• Perfil: ${user.profile}

🔍 PROBLEMA REPORTADO:
${problem}

💬 CONSULTA ORIGINAL:
"${original_query}"

🤖 ANÁLISE IA:
• Tentativa de resolução automática: ${escalation.ai_attempted ? 'Sim' : 'Não'}
• Motivo da escalação: ${escalation_reason}
• Tempo na fila: ${escalation.queue_time}
• Prioridade: ${escalation.priority}

⚙️ AÇÃO NECESSÁRIA:
Este caso requer intervenção humana especializada. O assistente digital identificou que não possui capacidade para resolver automaticamente esta situação.

📞 INFORMAÇÕES DE CONTATO:
• ID da Escalação: ${escalation.id}
• Timestamp: ${new Date().toLocaleString()}
• Canal de origem: Portal CNJ

Por favor, entre em contato com o usuário o mais breve possível e registre a resolução no sistema.

---
Atenciosamente,
Sistema de Assistente Digital CNJ
Portal da Transparência Judicial`;
    };

    return {
      subject: generateSubject(),
      body: generateBody(),
      recipient: getRecipient(),
      urgency: getUrgency()
    };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const template = generateEmailTemplate(escalation);
      setEmailTemplate(template);
      setIsGenerating(false);
    }, 2000); // Simula tempo de geração

    return () => clearTimeout(timer);
  }, [escalation]);

  const handleSendEmail = async () => {
    if (!emailTemplate) return;

    setIsSending(true);
    
    // Simula envio de email
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const emailData = {
      ...emailTemplate,
      sent_at: new Date().toISOString(),
      escalation_id: escalation.id,
      tracking_id: `EMAIL-${Date.now()}`
    };

    setEmailSent(true);
    setIsSending(false);
    onEmailSent(emailData);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return '🚨';
      case 'high': return '⚡';
      default: return '📧';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              📧 Encaminhamento por Email
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {isGenerating ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-gray-600">Gerando template de email...</span>
            </div>
          ) : emailSent ? (
            <div className="text-center py-12">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Email Enviado com Sucesso!
              </h3>
              <p className="text-green-600 mb-4">
                A escalação foi encaminhada para o tribunal competente
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm">
                <p><strong>Destinatário:</strong> {emailTemplate?.recipient}</p>
                <p><strong>ID de Rastreamento:</strong> EMAIL-{Date.now()}</p>
                <p><strong>Tempo estimado de resposta:</strong> 24-48 horas</p>
              </div>
            </div>
          ) : emailTemplate && (
            <div className="space-y-6">
              <div className={`border rounded-lg p-4 ${getUrgencyColor(emailTemplate.urgency)}`}>
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{getUrgencyIcon(emailTemplate.urgency)}</span>
                  <span className="font-semibold">
                    Urgência: {emailTemplate.urgency.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm opacity-80">
                  Este email será processado com prioridade {emailTemplate.urgency}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destinatário:
                  </label>
                  <div className="bg-gray-50 p-3 rounded border">
                    {emailTemplate.recipient}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto:
                  </label>
                  <div className="bg-gray-50 p-3 rounded border">
                    {emailTemplate.subject}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Corpo do Email:
                  </label>
                  <div className="bg-gray-50 p-4 rounded border max-h-64 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">
                      {emailTemplate.body}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-yellow-600 mr-2 mt-1">⚠️</span>
                  <div>
                    <h4 className="font-medium text-yellow-800">Atenção:</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Este email será enviado automaticamente para o tribunal competente. 
                      Verifique se todas as informações estão corretas antes de prosseguir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSendEmail}
                  disabled={isSending}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                >
                  {isSending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">📧</span>
                      Enviar Email
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailForwarding;