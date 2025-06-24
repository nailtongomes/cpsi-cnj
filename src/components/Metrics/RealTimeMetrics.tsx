import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Clock, Star, Bot, User } from 'lucide-react';

interface RealTimeMetricsProps {
  onMetricUpdate?: (metrics: any) => void;
}

const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({ onMetricUpdate }) => {
  const [metrics, setMetrics] = useState({
    totalAtendimentos: 1247,
    resolvidosIA: 1089,
    escaladosHumanos: 158,
    consultas: 892,
    peticionamentos: 234,
    intimacoes: 121,
    cidadaos: 756,
    advogados: 398,
    servidores: 93,
    widget: 723,
    totem: 234,
    whatsapp: 156,
    telegram: 89,
    mobile: 45,
    tempoMedioResposta: '1min 32s',
    npsGeral: 4.2,
    taxaResolucaoIA: 87,
    atendimentosAtivos: 23
  });

  const [animatingMetrics, setAnimatingMetrics] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newMetrics = { ...prev };
        const updates: string[] = [];
        
        // Simulate real-time updates
        if (Math.random() > 0.7) {
          newMetrics.totalAtendimentos += Math.floor(Math.random() * 3) + 1;
          newMetrics.resolvidosIA += Math.floor(Math.random() * 2) + 1;
          updates.push('totalAtendimentos', 'resolvidosIA');
        }
        
        if (Math.random() > 0.8) {
          newMetrics.escaladosHumanos += Math.floor(Math.random() * 2);
          updates.push('escaladosHumanos');
        }
        
        if (Math.random() > 0.6) {
          const channels = ['widget', 'totem', 'whatsapp', 'telegram', 'mobile'];
          const randomChannel = channels[Math.floor(Math.random() * channels.length)] as keyof typeof newMetrics;
          if (typeof newMetrics[randomChannel] === 'number') {
            (newMetrics[randomChannel] as number) += 1;
            updates.push(randomChannel);
          }
        }
        
        // Update resolution rate
        newMetrics.taxaResolucaoIA = Math.round((newMetrics.resolvidosIA / newMetrics.totalAtendimentos) * 100);
        
        setAnimatingMetrics(updates);
        
        if (onMetricUpdate) {
          onMetricUpdate(newMetrics);
        }
        
        return newMetrics;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [onMetricUpdate]);

  useEffect(() => {
    if (animatingMetrics.length > 0) {
      const timer = setTimeout(() => {
        setAnimatingMetrics([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animatingMetrics]);

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    color: string;
    isAnimating?: boolean;
  }> = ({ title, value, icon: Icon, color, isAnimating }) => (
    <div className={`bg-white rounded-lg p-4 shadow-md border-l-4 ${color} transition-all duration-300 ${
      isAnimating ? 'scale-105 shadow-lg' : ''
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold text-gray-900 transition-all duration-300 ${
            isAnimating ? 'text-green-600' : ''
          }`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <Icon size={24} className={`${color.replace('border-l-', 'text-').replace('-500', '-600')}`} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          📊 Métricas em Tempo Real
        </h2>
        <div className="flex items-center space-x-2 text-green-600">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live</span>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total de Atendimentos"
          value={metrics.totalAtendimentos}
          icon={Users}
          color="border-l-blue-500"
          isAnimating={animatingMetrics.includes('totalAtendimentos')}
        />
        <MetricCard
          title="Resolvidos pela IA"
          value={`${metrics.resolvidosIA} (${metrics.taxaResolucaoIA}%)`}
          icon={Bot}
          color="border-l-green-500"
          isAnimating={animatingMetrics.includes('resolvidosIA')}
        />
        <MetricCard
          title="Escalados para Humanos"
          value={metrics.escaladosHumanos}
          icon={User}
          color="border-l-orange-500"
          isAnimating={animatingMetrics.includes('escaladosHumanos')}
        />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Tempo Médio Resposta"
          value={metrics.tempoMedioResposta}
          icon={Clock}
          color="border-l-purple-500"
        />
        <MetricCard
          title="NPS Geral"
          value={`${metrics.npsGeral}/5`}
          icon={Star}
          color="border-l-yellow-500"
        />
        <MetricCard
          title="Atendimentos Ativos"
          value={metrics.atendimentosAtivos}
          icon={TrendingUp}
          color="border-l-red-500"
        />
      </div>

      {/* Channel Distribution */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          📱 Distribuição por Canal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className={`text-2xl font-bold transition-all duration-300 ${
              animatingMetrics.includes('widget') ? 'text-green-600 scale-110' : 'text-blue-600'
            }`}>
              {metrics.widget}
            </div>
            <div className="text-sm text-gray-600">🖥️ Widget</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold transition-all duration-300 ${
              animatingMetrics.includes('totem') ? 'text-green-600 scale-110' : 'text-purple-600'
            }`}>
              {metrics.totem}
            </div>
            <div className="text-sm text-gray-600">📱 Totem</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold transition-all duration-300 ${
              animatingMetrics.includes('whatsapp') ? 'text-green-600 scale-110' : 'text-green-600'
            }`}>
              {metrics.whatsapp}
            </div>
            <div className="text-sm text-gray-600">💬 WhatsApp</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold transition-all duration-300 ${
              animatingMetrics.includes('telegram') ? 'text-green-600 scale-110' : 'text-blue-400'
            }`}>
              {metrics.telegram}
            </div>
            <div className="text-sm text-gray-600">📲 Telegram</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold transition-all duration-300 ${
              animatingMetrics.includes('mobile') ? 'text-green-600 scale-110' : 'text-orange-600'
            }`}>
              {metrics.mobile}
            </div>
            <div className="text-sm text-gray-600">📱 Mobile</div>
          </div>
        </div>
      </div>

      {/* Profile Distribution */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          👥 Distribuição por Perfil
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{metrics.cidadaos}</div>
            <div className="text-sm text-gray-600">👤 Cidadãos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{metrics.advogados}</div>
            <div className="text-sm text-gray-600">⚖️ Advogados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{metrics.servidores}</div>
            <div className="text-sm text-gray-600">🏛️ Servidores</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMetrics;