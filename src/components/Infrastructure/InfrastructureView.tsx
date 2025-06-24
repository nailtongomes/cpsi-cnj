import React, { useState } from 'react';
import { Server, Database, Cloud, ArrowRight, ExternalLink, FileText, Network, Cpu, Layers, MessageSquare, Zap, Users, Globe, Calendar, DollarSign, CheckCircle, Target, Award, Briefcase, GraduationCap, Star, Building, Code, Bot, Brain } from 'lucide-react';

const InfrastructureView: React.FC = () => {
  const [activeFlow, setActiveFlow] = useState<'overview' | 'request-flow' | 'architecture' | 'work-plan' | 'team-portfolio'>('overview');

  const DocumentLink = ({ title, description, onClick }: { title: string; description: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left w-full"
    >
      <div className="flex items-center gap-3">
        <FileText className="text-blue-600" size={20} />
        <div>
          <div className="font-semibold text-blue-800">{title}</div>
          <div className="text-sm text-blue-600">{description}</div>
        </div>
      </div>
      <ExternalLink className="text-blue-600" size={16} />
    </button>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">🏗️ Arquitetura Técnica CPSI-CNJ</h2>
        <p className="opacity-90">
          Plataforma omnichannel para <strong>1 milhão de usuários</strong> com tecnologias open source.
          Deploy flexível em AWS, Azure, GCP ou on-premise.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded text-sm">🚀 FastAPI</span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded text-sm">🤖 Rasa NLU</span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded text-sm">☸️ Kubernetes</span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded text-sm">🐘 PostgreSQL</span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded text-sm">🔄 Redis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Layers className="text-blue-600" size={20} />
            Componentes Principais
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <Globe className="text-green-600" size={16} />
              <div>
                <div className="font-semibold">Gateway/Load Balancer</div>
                <div className="text-sm text-gray-600">Ingress Kubernetes</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <Server className="text-blue-600" size={16} />
              <div>
                <div className="font-semibold">API FastAPI</div>
                <div className="text-sm text-gray-600">4 réplicas com auto-scaling</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <MessageSquare className="text-purple-600" size={16} />
              <div>
                <div className="font-semibold">Rasa NLU + Actions</div>
                <div className="text-sm text-gray-600">Processamento de linguagem natural</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <Database className="text-orange-600" size={16} />
              <div>
                <div className="font-semibold">PostgreSQL + Redis</div>
                <div className="text-sm text-gray-600">Dados persistentes + cache/filas</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Cpu className="text-green-600" size={20} />
            Dimensionamento
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded">
              <div className="font-semibold text-green-800">🎯 Capacidade</div>
              <div className="text-sm text-green-700">1 milhão de usuários simultâneos</div>
            </div>
            <div className="p-3 bg-blue-50 rounded">
              <div className="font-semibold text-blue-800">⚡ Performance</div>
              <div className="text-sm text-blue-700">2.3 min tempo médio resposta</div>
            </div>
            <div className="p-3 bg-purple-50 rounded">
              <div className="font-semibold text-purple-800">🔄 Escalabilidade</div>
              <div className="text-sm text-purple-700">Auto-scaling horizontal</div>
            </div>
            <div className="p-3 bg-orange-50 rounded">
              <div className="font-semibold text-orange-800">☁️ Multi-cloud</div>
              <div className="text-sm text-orange-700">AWS, Azure, GCP, On-premise</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FileText className="text-blue-600" size={20} />
          📋 Documentação Técnica
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DocumentLink
            title="Arquitetura Piloto"
            description="Especificação técnica completa"
            onClick={() => window.open('/docs/arquitetura_piloto.md', '_blank')}
          />
          <DocumentLink
            title="Casos de Uso"
            description="Cenários de atendimento N1"
            onClick={() => window.open('/docs/casos_de_uso.md', '_blank')}
          />
          <DocumentLink
            title="Proposta CNJ"
            description="Documento oficial do projeto"
            onClick={() => alert('PDF: CPSI - CNJ - Proposta - registro-505520.pdf\n\nEste documento contém os detalhes completos da proposta apresentada ao CNJ.')}
          />
          <DocumentLink
            title="Plano de Trabalho"
            description="Cronograma e entregas"
            onClick={() => alert('PDF: Plano de Trabalho - CPSI_CNJ.pdf\n\nDetalhamento das fases de implementação e marcos do projeto.')}
          />
        </div>
      </div>
    </div>
  );

  const renderRequestFlow = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Zap className="text-yellow-600" size={24} />
          🔄 Fluxo de Requisição do Usuário
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div className="flex-1">
              <div className="font-semibold text-blue-800">👤 Usuário</div>
              <div className="text-sm text-blue-600">Acessa canal (Web, WhatsApp, Totem, etc.)</div>
            </div>
            <ArrowRight className="text-blue-400" size={20} />
          </div>

          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div className="flex-1">
              <div className="font-semibold text-green-800">🌐 Gateway/Load Balancer</div>
              <div className="text-sm text-green-600">Distribui requisição via Kubernetes Ingress</div>
            </div>
            <ArrowRight className="text-green-400" size={20} />
          </div>

          <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div className="flex-1">
              <div className="font-semibold text-purple-800">🚀 FastAPI</div>
              <div className="text-sm text-purple-600">Autentica, registra protocolo, publica no Redis</div>
            </div>
            <ArrowRight className="text-purple-400" size={20} />
          </div>

          <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
            <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
            <div className="flex-1">
              <div className="font-semibold text-red-800">🔄 Redis Broker</div>
              <div className="text-sm text-red-600">Fila de mensagens assíncronas</div>
            </div>
            <ArrowRight className="text-red-400" size={20} />
          </div>

          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
            <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
            <div className="flex-1">
              <div className="font-semibold text-orange-800">🤖 Rasa NLU</div>
              <div className="text-sm text-orange-600">Processa linguagem natural, entende intenção</div>
            </div>
            <ArrowRight className="text-orange-400" size={20} />
          </div>

          <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">6</div>
            <div className="flex-1">
              <div className="font-semibold text-indigo-800">⚙️ Rasa Actions</div>
              <div className="text-sm text-indigo-600">Executa lógicas personalizadas, orquestra agentes</div>
            </div>
            <ArrowRight className="text-indigo-400" size={20} />
          </div>

          <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-lg">
            <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">7</div>
            <div className="flex-1">
              <div className="font-semibold text-teal-800">👥 Agentes Especializados</div>
              <div className="text-sm text-teal-600">IA Base Conhecimento, Suporte Técnico, Orientação Processual</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-lg">
        <h4 className="text-lg font-bold mb-3">🔄 Fluxo de Retorno</h4>
        <div className="text-sm opacity-90 space-y-2">
          <div>• Resposta processada pelos agentes</div>
          <div>• Rasa Actions consolida resultado</div>
          <div>• Redis transporta resposta de volta</div>
          <div>• FastAPI entrega ao usuário pelo canal original</div>
          <div>• Histórico salvo no PostgreSQL</div>
        </div>
      </div>
    </div>
  );

  const renderArchitecture = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Network className="text-blue-600" size={24} />
          🏗️ Diagrama de Arquitetura
        </h3>
        
        <div className="bg-gray-50 p-6 rounded-lg overflow-x-auto">
          <div className="min-w-[800px] space-y-6">
            {/* Camada de Canais */}
            <div className="text-center">
              <h4 className="font-bold text-gray-700 mb-3">📱 Canais de Entrada</h4>
              <div className="flex justify-center gap-4">
                <div className="bg-blue-100 p-3 rounded text-sm">🌐 Web/Portal</div>
                <div className="bg-green-100 p-3 rounded text-sm">💬 WhatsApp</div>
                <div className="bg-purple-100 p-3 rounded text-sm">🖥️ Totem</div>
                <div className="bg-red-100 p-3 rounded text-sm">📞 Telefone</div>
                <div className="bg-orange-100 p-3 rounded text-sm">📱 Mobile</div>
              </div>
            </div>

            {/* Setas */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-2">
                <ArrowRight className="transform rotate-90 text-gray-400" size={24} />
                <div className="text-xs text-gray-500">HTTP/WebSocket</div>
              </div>
            </div>

            {/* Gateway */}
            <div className="text-center">
              <div className="inline-block bg-green-500 text-white p-4 rounded-lg font-bold">
                🌐 Kubernetes Ingress / Load Balancer
              </div>
            </div>

            {/* Setas */}
            <div className="flex justify-center">
              <ArrowRight className="transform rotate-90 text-gray-400" size={24} />
            </div>

            {/* FastAPI */}
            <div className="text-center">
              <div className="inline-block bg-blue-500 text-white p-4 rounded-lg font-bold">
                🚀 FastAPI (4 réplicas + auto-scaling)
              </div>
            </div>

            {/* Dados e Processamento */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="bg-red-500 text-white p-4 rounded-lg font-bold mb-2">
                  🔄 Redis Cluster
                </div>
                <div className="text-xs text-gray-600">Filas + Cache</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-500 text-white p-4 rounded-lg font-bold mb-2">
                  🤖 Rasa NLU
                </div>
                <div className="text-xs text-gray-600">4 réplicas</div>
              </div>
              <div className="text-center">
                <div className="bg-orange-500 text-white p-4 rounded-lg font-bold mb-2">
                  🐘 PostgreSQL
                </div>
                <div className="text-xs text-gray-600">Master + Réplicas</div>
              </div>
            </div>

            {/* Rasa Actions */}
            <div className="text-center">
              <div className="inline-block bg-indigo-500 text-white p-4 rounded-lg font-bold">
                ⚙️ Rasa Actions (4 réplicas)
              </div>
            </div>

            {/* Agentes */}
            <div className="text-center">
              <h4 className="font-bold text-gray-700 mb-3">👥 Agentes Especializados</h4>
              <div className="flex justify-center gap-4">
                <div className="bg-teal-100 p-3 rounded text-sm">🔧 Suporte Técnico</div>
                <div className="bg-pink-100 p-3 rounded text-sm">⚖️ Orientação Processual</div>
                <div className="bg-yellow-100 p-3 rounded text-sm">🧠 IA Base Conhecimento</div>
                <div className="bg-gray-100 p-3 rounded text-sm">👤 Humanos N2</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <Cloud className="text-blue-600" size={20} />
            ☁️ Portabilidade Multi-Cloud
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>AWS (EKS + RDS + ElastiCache)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Azure (AKS + PostgreSQL + Redis)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>GCP (GKE + Cloud SQL + Memorystore)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>On-premise (K8s + PostgreSQL + Redis)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <Users className="text-green-600" size={20} />
            📊 Métricas de Escala
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Usuários simultâneos:</span>
              <strong>1M</strong>
            </div>
            <div className="flex justify-between">
              <span>Resolução por IA:</span>
              <strong>78%</strong>
            </div>
            <div className="flex justify-between">
              <span>Tempo médio resposta:</span>
              <strong>2.3 min</strong>
            </div>
            <div className="flex justify-between">
              <span>NPS médio:</span>
              <strong>4.8/5</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkPlan = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">📋 Plano de Trabalho CPSI/PDPJ/CNJ</h2>
        <p className="text-lg opacity-90 mb-4">
          Assistente Digital Inteligente para o Portal Jus.BR
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="text-white" size={20} />
              <span className="font-bold">Cronograma</span>
            </div>
            <div className="text-2xl font-bold">12 meses</div>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="text-white" size={20} />
              <span className="font-bold">Orçamento</span>
            </div>
            <div className="text-2xl font-bold">R$ 1.500.000</div>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-white" size={20} />
              <span className="font-bold">Estrutura</span>
            </div>
            <div className="text-sm">Consórcio 2 CNPJs</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-600" size={24} />
            ✅ Conformidade DOD CNJ
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</div>
              <div>
                <div className="font-semibold text-green-800">Acesso direto</div>
                <div className="text-sm text-green-700">Herança automática de sessão Portal Jus.BR</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</div>
              <div>
                <div className="font-semibold text-green-800">Protocolo automático</div>
                <div className="text-sm text-green-700">Formato JUS-YYYY-MM-DD-HHMMSS-XXX</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</div>
              <div>
                <div className="font-semibold text-green-800">Mensagens móveis</div>
                <div className="text-sm text-green-700">WhatsApp + Telegram integrados</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</div>
              <div>
                <div className="font-semibold text-green-800">Glossário interativo</div>
                <div className="text-sm text-green-700">Com vídeos instrucionais e busca inteligente</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</div>
              <div>
                <div className="font-semibold text-green-800">Tecnologia assistiva</div>
                <div className="text-sm text-green-700">Navegação por voz, alto contraste, leitor de tela</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</div>
              <div>
                <div className="font-semibold text-green-800">Canal denúncias</div>
                <div className="text-sm text-green-700">Protocolo prioritário + escalação automática</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="text-blue-600" size={24} />
            🚀 Inovações Extras
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">+</div>
              <div>
                <div className="font-semibold text-blue-800">Atendimento por voz para analfabetos</div>
                <div className="text-sm text-blue-700">Navegação 100% auditiva</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">+</div>
              <div>
                <div className="font-semibold text-blue-800">IA adaptativa por perfil</div>
                <div className="text-sm text-blue-700">Linguagem técnica/simples automática</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">+</div>
              <div>
                <div className="font-semibold text-blue-800">Sessão unificada multi-canal</div>
                <div className="text-sm text-blue-700">Histórico compartilhado web/mobile</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">+</div>
              <div>
                <div className="font-semibold text-blue-800">Base conhecimento auto-atualizada</div>
                <div className="text-sm text-blue-700">RAG com documentação CNJ</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg">
            <h4 className="font-bold mb-2">🎯 Stack Tecnológico</h4>
            <div className="text-sm space-y-1">
              <div>• Open-Source + AWS Serverless</div>
              <div>• Multi-Provider LLM (GPT-4o, Claude 3.5, Ollama)</div>
              <div>• 70% tecnologias open-source</div>
              <div>• Arquitetura multi-cloud</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="text-purple-600" size={24} />
          📅 Cronograma Físico-Financeiro
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-2">FASE 1 (Meses 1-4)</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <div>• Compliance DOD + Base</div>
              <div>• Protocolo automático</div>
              <div>• IA Base + Glossário</div>
              <div>• Canal denúncias</div>
              <div>• LLM Multi-Provider</div>
            </div>
            <div className="mt-3 font-bold text-blue-800">R$ 650.000</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2">FASE 2 (Meses 5-8)</h4>
            <div className="text-sm text-green-700 space-y-1">
              <div>• WhatsApp + Telegram</div>
              <div>• Sessão unificada</div>
              <div>• Acessibilidade total</div>
              <div>• Atendimento por voz</div>
              <div>• Segurança + LGPD</div>
            </div>
            <div className="mt-3 font-bold text-green-800">R$ 500.000</div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-bold text-orange-800 mb-2">FASE 3 (Meses 9-12)</h4>
            <div className="text-sm text-orange-700 space-y-1">
              <div>• Funcionalidades avançadas</div>
              <div>• Testes piloto 1K+ usuários</div>
              <div>• Go-live produção</div>
              <div>• Documentação completa</div>
              <div>• Transferência conhecimento</div>
            </div>
            <div className="mt-3 font-bold text-orange-800">R$ 350.000</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-2">TOTAL PROJETO</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <div>• 12 meses completos</div>
              <div>• Equipe 3 seniores</div>
              <div>• Especialistas dedicados</div>
              <div>• Infraestrutura AWS</div>
              <div>• Contingência 10%</div>
            </div>
            <div className="mt-3 font-bold text-gray-800 text-lg">R$ 1.500.000</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <Users className="text-gray-600" size={20} />
              👥 Equipe Principal
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Nielsen (Ph.D. IA)</span>
                <strong>R$ 278.160</strong>
              </div>
              <div className="flex justify-between">
                <span>Elyas (Eng. Software)</span>
                <strong>R$ 256.200</strong>
              </div>
              <div className="flex justify-between">
                <span>Nailton (Esp. Direito)</span>
                <strong>R$ 256.200</strong>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total Equipe</span>
                <span>R$ 790.560</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <DollarSign className="text-gray-600" size={20} />
              💰 Breakdown Custos
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Equipe Técnica (52.7%)</span>
                <strong>R$ 790.560</strong>
              </div>
              <div className="flex justify-between">
                <span>Subcontratações (17.2%)</span>
                <strong>R$ 258.000</strong>
              </div>
              <div className="flex justify-between">
                <span>AWS Infrastructure (3.2%)</span>
                <strong>R$ 48.000</strong>
              </div>
              <div className="flex justify-between">
                <span>APIs LLM (5.8%)</span>
                <strong>R$ 87.576</strong>
              </div>
              <div className="flex justify-between">
                <span>Tecnologias + Portabilidade (7.1%)</span>
                <strong>R$ 107.000</strong>
              </div>
              <div className="flex justify-between">
                <span>Contingência (10%)</span>
                <strong>R$ 150.000</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="text-green-600" size={24} />
          🎯 Métricas de Sucesso & ROI
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-3">KPIs Técnicos</h4>
            <div className="space-y-2 text-sm text-green-700">
              <div>• Tempo resposta: &lt; 2 segundos</div>
              <div>• Disponibilidade: &gt; 99.5%</div>
              <div>• Assertividade IA: &gt; 85%</div>
              <div>• Usuários simultâneos: 5.000+</div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-3">KPIs Operacionais</h4>
            <div className="space-y-2 text-sm text-blue-700">
              <div>• Redução tickets GLPI: &gt; 70%</div>
              <div>• NPS Cidadão: &gt; 70</div>
              <div>• NPS Advogado: &gt; 80</div>
              <div>• Custo por atendimento: R$ 0,03</div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-bold text-purple-800 mb-3">ROI Projetado</h4>
            <div className="space-y-2 text-sm text-purple-700">
              <div>• Economia anual: R$ 2.1 milhões</div>
              <div>• Payback: 8 meses</div>
              <div>• Escalabilidade: 500K acessos/dia</div>
              <div>• Redução 70% custos terceirização</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">🏆 Diferenciais Competitivos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold mb-2 text-blue-300">Tecnológicos</h4>
            <div className="text-sm space-y-1 opacity-90">
              <div>• Arquitetura serverless escalável</div>
              <div>• IA multi-provider com fallback</div>
              <div>• Plugin nativo Portal Jus.BR</div>
              <div>• 70% open-source</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-green-300">Funcionais</h4>
            <div className="text-sm space-y-1 opacity-90">
              <div>• Atendimento por voz completo</div>
              <div>• Protocolo automático universal</div>
              <div>• Escalação inteligente</div>
              <div>• Glossário interativo com vídeos</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-yellow-300">Compliance</h4>
            <div className="text-sm space-y-1 opacity-90">
              <div>• 100% conformidade DOD</div>
              <div>• LGPD by design</div>
              <div>• CNJ nº 335/2020</div>
              <div>• Acessibilidade universal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeamPortfolio = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">👥 Portfólio dos Desenvolvedores CPSI-CNJ</h2>
        <p className="text-lg opacity-90 mb-4">
          Consórcio de especialistas com experiência comprovada em projetos jurídicos enterprise
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Building className="text-white" size={20} />
              <span className="font-bold">N3 Wizards</span>
            </div>
            <div className="text-sm">Líder do Consórcio</div>
            <div className="text-sm">15+ anos automação jurídica</div>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Code className="text-white" size={20} />
              <span className="font-bold">Elyas Aguiar</span>
            </div>
            <div className="text-sm">Full Stack Senior</div>
            <div className="text-sm">Chatbots & Backend Python</div>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="text-white" size={20} />
              <span className="font-bold">NCDD Tecnologia</span>
            </div>
            <div className="text-sm">Ph.D. IA & Data Science</div>
            <div className="text-sm">18+ anos projetos enterprise</div>
          </div>
        </div>
      </div>

      {/* N3 Wizards */}
      <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <Building className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">🏢 N3 WIZARDS - Empresa Líder do Consórcio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>CNPJ:</strong> 55.154.203/0001-24<br />
                <strong>Website:</strong> <a href="https://www.n3wizards.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.n3wizards.com</a>
              </div>
              <div>
                <strong>Especialização:</strong> Integrações Jurídicas, RPA e Automação
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold mb-3 flex items-center gap-2 text-blue-800">
              <Star className="text-blue-600" size={20} />
              🎯 Especialização Core
            </h4>
            <div className="space-y-2 text-sm text-blue-700">
              <div>• 15+ anos automação processos jurídicos</div>
              <div>• Integração PJe, ESAJ, Projudi, eProc</div>
              <div>• RPA para escritórios e departamentos</div>
              <div>• APIs peticionamento 50+ Tribunais</div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold mb-3 flex items-center gap-2 text-green-800">
              <Award className="text-green-600" size={20} />
              📊 Cases de Sucesso DOD
            </h4>
            <div className="space-y-2 text-sm text-green-700">
              <div><strong>Integração Bancária:</strong> 100% redução tempo alimentação</div>
              <div><strong>Peticionamento:</strong> 98% menos tempo, 100k+ petições</div>
              <div><strong>IA Jurídica:</strong> 90% precisão, 70% redução custos</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <Briefcase className="text-gray-600" size={20} />
            👨‍💻 CEO: Nailton Gomes Silva
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div><strong>OAB/RN:</strong> 13.092 (Advogado ativo)</div>
              <div><strong>Formação:</strong> Mestrando Eng. Produção/UFRN</div>
            </div>
            <div>
              <div><strong>Especialização:</strong> Direito Digital, Compliance</div>
              <div><strong>Relevância DOD:</strong> Única combinação jurídica + tecnológica</div>
            </div>
          </div>
        </div>
      </div>

      {/* Elyas Aguiar */}
      <div className="bg-white p-6 rounded-lg border-2 border-green-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
            <Code className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-green-800 mb-2">💻 ELYAS AGUIAR - Desenvolvedor Senior Full Stack</h3>
            <div className="text-sm">
              <strong>Website:</strong> <a href="https://dev.elyasaguiar.com.br/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">dev.elyasaguiar.com.br</a><br />
              <strong>Especialização:</strong> Backend Python, Chatbots e Automação
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold mb-3 flex items-center gap-2 text-green-800">
              <Bot className="text-green-600" size={20} />
              🎯 Especialização Core
            </h4>
            <div className="space-y-2 text-sm text-green-700">
              <div>• Backend Python, JavaScript, PHP</div>
              <div>• Chatbots e experiências inteligentes</div>
              <div>• Automações redução tarefas repetitivas</div>
              <div>• Aplicações multiplataforma</div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold mb-3 flex items-center gap-2 text-blue-800">
              <MessageSquare className="text-blue-600" size={20} />
              🛠️ Competências DOD
            </h4>
            <div className="space-y-2 text-sm text-blue-700">
              <div>• Rasa Framework (chatbot open-source)</div>
              <div>• APIs REST para integração PDPJ</div>
              <div>• Multi-canal: WhatsApp, Telegram, Web</div>
              <div>• NLP Processamento linguagem portuguesa</div>
              <div>• Escalação inteligente com fallback</div>
            </div>
          </div>
        </div>
      </div>

      {/* NCDD Tecnologia */}
      <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
            <Brain className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-purple-800 mb-2">🎓 NCDD TECNOLOGIA - Especializada em IA</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>CNPJ:</strong> 60.118.475/0001-09<br />
                <strong>Website:</strong> <a href="https://ncdd.com.br/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">ncdd.com.br</a>
              </div>
              <div>
                <strong>Email:</strong> nielsen@ncdd.com.br<br />
                <strong>WhatsApp:</strong> +55 84-99930-5189
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <h4 className="font-bold mb-3 flex items-center gap-2 text-purple-800">
            <GraduationCap className="text-purple-600" size={20} />
            👨‍🔬 CEO: Nielsen Castelo Damasceno Dantas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700">
            <div>
              <div><strong>Formação:</strong> Ph.D. Inteligência Artificial</div>
              <div><strong>Instituição:</strong> UFRN</div>
            </div>
            <div>
              <div><strong>Experiência:</strong> +18 anos projetos IA</div>
              <div><strong>Especialização:</strong> Redes Neurais, Algoritmos Genéticos</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-bold mb-3 flex items-center gap-2 text-orange-800">
              <Star className="text-orange-600" size={20} />
              🏆 Cases Enterprise Comprovados
            </h4>
            <div className="space-y-2 text-sm text-orange-700">
              <div>• <strong>Coca-Cola:</strong> Detecção paletes + Drone autônomo</div>
              <div>• <strong>Eurofarma:</strong> Visão computacional qualidade</div>
              <div>• <strong>B3:</strong> Predição mercado financeiro IA</div>
              <div>• <strong>GANs:</strong> Redes Adversariais com NLP</div>
              <div>• <strong>Social Mapper:</strong> Análise redes sociais</div>
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-bold mb-3 flex items-center gap-2 text-indigo-800">
              <Target className="text-indigo-600" size={20} />
              📋 Contribuição DOD
            </h4>
            <div className="space-y-2 text-sm text-indigo-700">
              <div>• Arquitetura IA multi-provider com LLMs</div>
              <div>• Fine-tuning jurídico especializado</div>
              <div>• Base conhecimento RAG auto-atualizada</div>
              <div>• Visão computacional documentos</div>
              <div>• Analytics tempo real satisfação</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <Award className="text-gray-600" size={20} />
            📊 Experiência Mensurável
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div className="bg-white p-3 rounded">
              <div className="text-2xl font-bold text-purple-600">18+</div>
              <div className="text-gray-600">anos IA</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="text-2xl font-bold text-blue-600">16+</div>
              <div className="text-gray-600">anos DataScience</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="text-2xl font-bold text-green-600">12+</div>
              <div className="text-gray-600">anos Visão Comp.</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="text-2xl font-bold text-orange-600">6+</div>
              <div className="text-gray-600">vídeos portfolio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sinergia */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Users className="text-white" size={24} />
          🤝 Sinergia Perfeita para o Desafio DOD
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h4 className="font-bold mb-2 text-blue-300">N3 Wizards</h4>
            <div className="text-sm space-y-1 opacity-90">
              <div>• Domínio jurídico completo</div>
              <div>• Integração PDPJ comprovada</div>
              <div>• Compliance especializado</div>
              <div>• 15+ anos automação tribunais</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-green-300">Elyas Aguiar</h4>
            <div className="text-sm space-y-1 opacity-90">
              <div>• Backend robusto Python</div>
              <div>• Chatbots especializados</div>
              <div>• Multi-canal nativo</div>
              <div>• APIs REST enterprise</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-purple-300">NCDD Tecnologia</h4>
            <div className="text-sm space-y-1 opacity-90">
              <div>• IA de ponta acadêmica</div>
              <div>• Histórico enterprise crítico</div>
              <div>• Ph.D. comprovado</div>
              <div>• Cases fortune 500</div>
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
          <h4 className="font-bold mb-3 text-yellow-300">✅ Alinhamento Perfeito com Requisitos DOD</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div>✅ Acesso direto: Integração Portal Jus.BR</div>
              <div>✅ IA conversacional: Multi-provider LLM</div>
              <div>✅ Multi-canal: WhatsApp/Telegram</div>
            </div>
            <div className="space-y-1">
              <div>✅ Acessibilidade: Speech-to-text adaptativo</div>
              <div>✅ Protocolo automático: Sistema auditoria</div>
              <div>✅ Satisfação orientada dados: Analytics real-time</div>
            </div>
          </div>
        </div>
      </div>

      {/* ROI e Sustentabilidade */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <DollarSign className="text-green-600" size={24} />
          📈 ROI e Sustentabilidade
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-3">💰 Investimento Justificado</h4>
            <div className="space-y-2 text-sm text-green-700">
              <div className="flex justify-between">
                <span>Custo Total (12 meses):</span>
                <strong>R$ 1.500.000</strong>
              </div>
              <div className="flex justify-between">
                <span>Economia Anual Projetada:</span>
                <strong>R$ 2.100.000</strong>
              </div>
              <div className="flex justify-between">
                <span>Payback:</span>
                <strong>8 meses</strong>
              </div>
              <div className="flex justify-between">
                <span>Custo por consulta:</span>
                <strong>R$ 0,03</strong>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-3">⚡ Escalabilidade Técnica</h4>
            <div className="space-y-2 text-sm text-blue-700">
              <div>• <strong>Arquitetura:</strong> AWS Serverless</div>
              <div>• <strong>Capacidade:</strong> 100K+ acessos/dia</div>
              <div>• <strong>Independência:</strong> 70% open-source</div>
              <div>• <strong>Portabilidade:</strong> Multi-cloud CNJ 335/2020</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">CNJ</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Infraestrutura e Arquitetura Técnica
              </h1>
              <p className="text-blue-600 font-medium">CPSI • Conselho Nacional de Justiça</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveFlow('overview')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeFlow === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📋 Visão Geral
            </button>
            <button
              onClick={() => setActiveFlow('request-flow')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeFlow === 'request-flow'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🔄 Fluxo de Requisição
            </button>
            <button
              onClick={() => setActiveFlow('architecture')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeFlow === 'architecture'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🏗️ Diagrama Arquitetura
            </button>
            <button
              onClick={() => setActiveFlow('work-plan')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeFlow === 'work-plan'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📋 Plano de Trabalho
            </button>
            <button
              onClick={() => setActiveFlow('team-portfolio')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeFlow === 'team-portfolio'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              👥 Portfólio Equipe
            </button>
          </div>
        </div>

        {activeFlow === 'overview' && renderOverview()}
        {activeFlow === 'request-flow' && renderRequestFlow()}
        {activeFlow === 'architecture' && renderArchitecture()}
        {activeFlow === 'work-plan' && renderWorkPlan()}
        {activeFlow === 'team-portfolio' && renderTeamPortfolio()}
      </div>
    </div>
  );
};

export default InfrastructureView;