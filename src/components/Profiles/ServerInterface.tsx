import React, { useState } from 'react';
import { Users, AlertTriangle, BookOpen, TrendingUp, Plus, CheckCircle, HeartHandshake } from 'lucide-react';
import { mockEscalations, mockKnowledgeBase, mockMetrics } from '../../data/mockData';
import HumanizedSupport from '../Dashboard/HumanizedSupport';

interface ServerInterfaceProps {
  onAction: (action: string, data?: any) => void;
}

const ServerInterface: React.FC<ServerInterfaceProps> = ({ onAction }) => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [, setSelectedEscalation] = useState<string | null>(null);
  const [addedToBacklog, setAddedToBacklog] = useState<string[]>([]);

  const handleAddToBacklog = (suggestionId: string) => {
    setAddedToBacklog([...addedToBacklog, suggestionId]);
    onAction('protocol', {
      type: 'backlog_addition',
      protocol: `JUS-${new Date().toISOString().slice(0,19).replace(/[-:]/g, '').replace('T', '-')}-003`,
      responseTime: '1min 45s'
    });
  };

  const sections = [
    { id: 'dashboard', title: 'Painel de atendimentos', icon: TrendingUp },
    { id: 'humanized', title: 'Suporte Humanizado', icon: HeartHandshake },
    { id: 'escalations', title: 'Escalações pendentes', icon: AlertTriangle },
    { id: 'knowledge', title: 'Base de conhecimento', icon: BookOpen },
    { id: 'metrics', title: 'Métricas em tempo real', icon: Users }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-orange-800 mb-4">
          🏛️ PAINEL GERENCIAL - SERVIDOR JUSTIÇA
        </h3>
        
        <div className="bg-white rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-gray-800 mb-3">
            📊 RESUMO DO DIA (27/01/2025)
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>👥 <strong>Atendimentos totais:</strong> {mockMetrics.totalAtendimentos.toLocaleString()}</p>
              <p>🤖 <strong>Resolvidos pela IA:</strong> {mockMetrics.resolvidosIA.toLocaleString()} ({mockMetrics.taxaResolucaoIA})</p>
            </div>
            <div>
              <p>👨‍💼 <strong>Escalados para humanos:</strong> {mockMetrics.escaladosHumanos}</p>
              <p>⏱️ <strong>Tempo médio resposta:</strong> {mockMetrics.tempoMedioResposta}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEscalations = () => (
    <div className="space-y-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="font-bold text-red-800 mb-3">
          🚨 ATENDIMENTOS NÃO RESOLVIDOS PELA IA ({mockEscalations.length})
        </h3>
        
        {mockEscalations.map((escalation) => (
          <div key={escalation.id} className="bg-white rounded-lg p-4 mb-3 border border-red-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold">#{escalation.id} - {escalation.user.name}</p>
                <p className="text-sm text-gray-600">
                  {escalation.user.cpf && `CPF: ${escalation.user.cpf}`}
                  {escalation.user.oab && `OAB: ${escalation.user.oab}`}
                </p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                escalation.priority === 'high' ? 'bg-red-100 text-red-800' :
                escalation.priority === 'normal' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {escalation.priority}
              </span>
            </div>
            
            <div className="space-y-1 text-sm mb-3">
              <p><strong>Problema:</strong> {escalation.problem}</p>
              <p><strong>Tempo em fila:</strong> {escalation.queue_time}</p>
            </div>
            
            <button
              onClick={() => setSelectedEscalation(escalation.id)}
              className="bg-orange-600 text-white px-4 py-2 rounded font-medium hover:bg-orange-700 transition-colors"
            >
              ASSUMIR ATENDIMENTO
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderKnowledge = () => (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-blue-800 mb-3">
          📚 CONSULTAS À BASE DE CONHECIMENTO (Últimas 24h)
        </h3>
        
        {mockKnowledgeBase.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 mb-3 border border-blue-100">
            <div className="space-y-2 text-sm">
              <p><strong>✅ Termo consultado:</strong> '{item.term}'</p>
              <p><strong>📖 Resposta encontrada:</strong> {item.content.substring(0, 80)}...</p>
              <p><strong>👤 Solicitante:</strong> Perfil {item.category}</p>
              <p><strong>⏰ Horário:</strong> 14:25</p>
              <p><strong>📊 Uso total:</strong> {item.usage_count} consultas</p>
            </div>
            
            <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>💡 SUGESTÃO PARA BACKLOG:</strong><br />
                'Criar tutorial visual sobre {item.term} para perfil cidadão - demanda recorrente'
              </p>
              
              {!addedToBacklog.includes(item.id) ? (
                <button
                  onClick={() => handleAddToBacklog(item.id)}
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                >
                  <Plus size={16} className="inline mr-1" />
                  📝 ADICIONAR AO BACKLOG DE MELHORIAS
                </button>
              ) : (
                <div className="mt-2 flex items-center text-green-600 text-sm">
                  <CheckCircle size={16} className="mr-1" />
                  ✅ Sugestão adicionada ao backlog!
                  <br />📋 Item #BL-2025-001 criado
                  <br />🏷️ Categoria: Tutorial/Educativo
                  <br />📈 Prioridade: Média
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMetrics = () => (
    <div className="space-y-4">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-bold text-purple-800 mb-3">
          📊 MÉTRICAS ATUALIZADAS
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold mb-3">Atendimentos em Tempo Real</h4>
            <div className="space-y-2 text-sm">
              <p>💬 <strong>Atendimentos ativos:</strong> 23</p>
              <p>📈 <strong>NPS médio hoje:</strong> {mockMetrics.npsGeral}/5</p>
              <p>🎯 <strong>Taxa resolução IA:</strong> {mockMetrics.taxaResolucaoIA}</p>
              <p>⚡ <strong>Pico de acessos:</strong> 14:30 (156 usuários)</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold mb-3">Distribuição por Canal</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>🖥️ Widget:</span>
                <span>{mockMetrics.widget}</span>
              </div>
              <div className="flex justify-between">
                <span>📱 Totem:</span>
                <span>{mockMetrics.totem}</span>
              </div>
              <div className="flex justify-between">
                <span>💬 WhatsApp:</span>
                <span>{mockMetrics.whatsapp}</span>
              </div>
              <div className="flex justify-between">
                <span>📲 Telegram:</span>
                <span>{mockMetrics.telegram}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-orange-700 mb-2">
          🏛️ Painel do Servidor da Justiça
        </h2>
        <p className="text-gray-600">Dashboard administrativo e gerencial</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Icon size={16} />
              <span>{section.title}</span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[400px]">
        {activeSection === 'dashboard' && renderDashboard()}
        {activeSection === 'humanized' && <HumanizedSupport />}
        {activeSection === 'escalations' && renderEscalations()}
        {activeSection === 'knowledge' && renderKnowledge()}
        {activeSection === 'metrics' && renderMetrics()}
      </div>
    </div>
  );
};

export default ServerInterface;