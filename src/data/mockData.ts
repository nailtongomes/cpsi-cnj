import { Process, Escalation, KnowledgeItem, Metrics } from '../types';

export const mockProcesses: Process[] = [
  {
    number: "0001234-12.2024.4.01.3400",
    owner_cpf: "123.456.789-00",
    type: "Aposentadoria por Idade",
    status: "Aguardando decisão",
    last_movement: {
      date: "2025-01-20",
      description: "Processo concluso para julgamento",
      simple_explanation: "Seu pedido de aposentadoria está com o juiz. Em breve você receberá a decisão."
    },
    created_date: "2024-03-15",
    court: "1ª Vara Previdenciária de São Paulo",
    estimated_time: "2-4 meses",
    intimations: [
      {
        date: "2025-01-18",
        type: "Despacho",
        content: "Juiz solicita documentos complementares",
        simple_explanation: "O juiz precisa de mais documentos. Você tem 15 dias para entregar.",
        deadline: "2025-02-02",
        action_required: true
      }
    ]
  },
  {
    number: "0002345-23.2024.4.01.3401", 
    owner_cpf: "123.456.789-00",
    type: "Auxílio-Doença",
    status: "Deferido",
    last_movement: {
      date: "2025-01-15",
      description: "Sentença publicada - procedente",
      simple_explanation: "Parabéns! Seu auxílio foi aprovado. Você já pode receber o benefício."
    },
    created_date: "2024-08-10",
    court: "2ª Vara Previdenciária de São Paulo",
    estimated_time: "Concluído",
    intimations: [
      {
        date: "2025-01-15",
        type: "Sentença",
        content: "Benefício concedido - valor R$ 1.412,00",
        simple_explanation: "Você ganhou! Seu auxílio de R$ 1.412 foi aprovado.",
        deadline: null,
        action_required: false
      }
    ]
  },
  {
    number: "0003456-34.2024.5.02.0001",
    owner_cpf: "123.456.789-00",
    type: "Rescisão Trabalhista",
    status: "Em andamento",
    last_movement: {
      date: "2025-01-22",
      description: "Audiência designada",
      simple_explanation: "Foi marcada uma reunião no fórum para tentar um acordo."
    },
    created_date: "2024-11-05",
    court: "3ª Vara do Trabalho de São Paulo",
    estimated_time: "1-3 meses",
    intimations: [
      {
        date: "2025-01-22",
        type: "Audiência",
        content: "Audiência de conciliação designada para 15/02/2025 às 14h",
        simple_explanation: "Você deve comparecer no fórum dia 15/02 às 14h para tentar acordo.",
        deadline: "2025-02-15",
        action_required: true
      }
    ]
  }
];

export const mockEscalations: Escalation[] = [
  {
    id: "ESC-001",
    user: {
      name: "Maria Silva",
      cpf: "123.***.**-00",
      profile: "cidadao"
    },
    problem: "Dúvida sobre prazo recursal",
    original_query: "Quanto tempo tenho para recorrer?",
    ai_attempted: true,
    escalation_reason: "Pergunta específica sobre caso complexo",
    queue_time: "15min",
    priority: "normal",
    status: "resolvido_humano",
    resolution: "Atendente humano explicou que o prazo específico para seu caso de aposentadoria é 30 dias, diferente do prazo padrão",
    resolution_time: "12min",
    satisfaction: 5
  },
  {
    id: "ESC-002", 
    user: {
      name: "Dr. Carlos Santos",
      oab: "13092",
      profile: "advogado"
    },
    problem: "Erro no sistema de peticionamento",
    original_query: "PDF não está sendo aceito",
    ai_attempted: true,
    escalation_reason: "Problema técnico do sistema",
    queue_time: "8min",
    priority: "high",
    status: "escalado_ti",
    resolution: "Problema identificado no servidor - equipe TI implementou correção em 2h",
    team_assigned: "Equipe TI - Sistemas",
    resolution_time: "2h30min",
    satisfaction: 4
  },
  {
    id: "ESC-003",
    user: {
      name: "José Santos",
      cpf: "456.***.**-11", 
      profile: "cidadao"
    },
    problem: "Não consegue acessar intimações",
    original_query: "Minha senha não funciona e não consigo ver as intimações",
    ai_attempted: true,
    escalation_reason: "Problema de acesso - segurança",
    queue_time: "22min",
    priority: "high",
    status: "convertido_email",
    email_sent_to: "tribunal-origem@tjsp.jus.br",
    email_subject: "Solicitação de Reset de Senha - Cidadão José Santos",
    resolution: "Caso encaminhado para tribunal de origem para validação de identidade e reset seguro",
    expected_response_time: "24-48h"
  },
  {
    id: "ESC-004",
    user: {
      name: "Ana Costa",
      cpf: "789.***.**-22",
      profile: "cidadao"
    },
    problem: "Dúvida sobre custo de processo",
    original_query: "Preciso saber quanto vai custar entrar com ação trabalhista",
    ai_attempted: true,
    escalation_reason: "Orientação jurídica específica necessária",
    queue_time: "18min", 
    priority: "normal",
    status: "resolvido_humano",
    resolution: "Orientado sobre gratuidade da justiça trabalhista e como solicitar assistência judiciária",
    resolution_time: "25min",
    satisfaction: 5
  },
  {
    id: "ESC-005",
    user: {
      name: "Dra. Paula Lima",
      oab: "45678",
      profile: "advogado"
    },
    problem: "Sistema lento para upload de documentos grandes",
    original_query: "Upload de petição de 50MB está falhando constantemente",
    ai_attempted: true,
    escalation_reason: "Limitação técnica do sistema",
    queue_time: "5min",
    priority: "normal",
    status: "escalado_ti",
    resolution: "Implementado compressão automática e aumento do limite para 100MB",
    team_assigned: "Equipe TI - Sistemas",
    resolution_time: "4h15min",
    satisfaction: 4
  }
];

export const mockKnowledgeBase: KnowledgeItem[] = [
  {
    id: "KB-001",
    term: "como consultar meu processo",
    content: "Para consultar seu processo você precisa do número do processo e seu CPF",
    simple_explanation: "Digite o número do seu processo e seu CPF para ver as informações",
    category: "consulta",
    difficulty: "basic",
    related_terms: ["processo", "consulta", "cpf", "número"],
    video_url: "/videos/consultar-processo.mp4",
    usage_count: 892,
    last_updated: "2025-01-20"
  },
  {
    id: "KB-002",
    term: "o que são intimações",
    content: "Intimações são avisos oficiais do tribunal sobre seu processo",
    simple_explanation: "São como cartas do fórum te avisando sobre novidades no seu processo",
    category: "intimacao",
    difficulty: "basic",
    related_terms: ["intimação", "aviso", "prazo", "documentos"],
    video_url: "/videos/intimacoes.mp4",
    usage_count: 567,
    last_updated: "2025-01-18"
  },
  {
    id: "KB-003",
    term: "prazo para recurso",
    content: "Normalmente você tem 15 dias para recorrer de uma decisão",
    simple_explanation: "Se não concordar com a decisão, você tem 15 dias para pedir para outro juiz analisar",
    category: "prazo",
    difficulty: "basic",
    related_terms: ["recurso", "prazo", "decisão", "15 dias"],
    video_url: "/videos/como-recorrer.mp4",
    usage_count: 234,
    last_updated: "2025-01-15"
  },
  {
    id: "KB-004",
    term: "balcão virtual",
    content: "Atendimento por videoconferência com servidores do tribunal",
    simple_explanation: "Você pode falar por vídeo com alguém do fórum, como se fosse presencial",
    category: "atendimento",
    difficulty: "basic",
    related_terms: ["videoconferência", "atendimento", "online", "servidor"],
    video_url: "/videos/balcao-virtual.mp4",
    usage_count: 178,
    last_updated: "2025-01-22"
  }
];

export const mockMetrics: Metrics = {
  totalAtendimentos: 2847,
  resolvidosIA: 2456,
  escaladosHumanos: 391,
  consultas: 1892,
  peticionamentos: 534,
  intimacoes: 421,
  cidadaos: 1756,
  advogados: 698,
  servidores: 393,
  widget: 1123,
  totem: 834,
  whatsapp: 456,
  telegram: 289,
  mobile: 145,
  tempoMedioResposta: "45s",
  npsGeral: 4.6,
  taxaResolucaoIA: "86%"
};