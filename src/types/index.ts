export type UserProfile = 'cidadao' | 'advogado' | 'servidor';
export type InteractionMode = 'voz' | 'texto';
export type Channel = 'widget' | 'totem' | 'whatsapp' | 'telegram' | 'mobile' | 'phone';

export interface User {
  id: string;
  name: string;
  profile: UserProfile;
  mode: InteractionMode;
  cpf?: string;
  oab?: string;
}

export interface Intimation {
  date: string;
  type: string;
  content: string;
  simple_explanation: string;
  deadline: string | null;
  action_required: boolean;
}

export interface Process {
  number: string;
  owner_cpf: string;
  type: string;
  status: string;
  last_movement: {
    date: string;
    description: string;
    simple_explanation: string;
  };
  created_date: string;
  court: string;
  estimated_time?: string;
  intimations?: Intimation[];
}

export interface Protocol {
  number: string;
  timestamp: string;
  action: string;
  userProfile: UserProfile;
  status: string;
  responseTime: string;
  channel: Channel;
}

export interface Escalation {
  id: string;
  user: {
    name: string;
    cpf?: string;
    oab?: string;
    profile: UserProfile;
  };
  problem: string;
  original_query: string;
  ai_attempted: boolean;
  escalation_reason: string;
  queue_time: string;
  priority: 'low' | 'normal' | 'high';
  status?: 'pendente' | 'em_atendimento' | 'resolvido_humano' | 'escalado_ti' | 'convertido_email';
  resolution?: string;
  resolution_time?: string;
  satisfaction?: number;
  team_assigned?: string;
  email_sent_to?: string;
  email_subject?: string;
  expected_response_time?: string;
}

export interface KnowledgeItem {
  id: string;
  term: string;
  content: string;
  simple_explanation: string;
  category: string;
  difficulty: string;
  related_terms: string[];
  video_url?: string;
  usage_count: number;
  last_updated: string;
}

export interface Metrics {
  totalAtendimentos: number;
  resolvidosIA: number;
  escaladosHumanos: number;
  consultas: number;
  peticionamentos: number;
  intimacoes: number;
  cidadaos: number;
  advogados: number;
  servidores: number;
  widget: number;
  totem: number;
  whatsapp: number;
  telegram: number;
  mobile: number;
  tempoMedioResposta: string;
  npsGeral: number;
  taxaResolucaoIA: string;
}