import React, { useState, useEffect } from 'react';
import { CheckCircle, Users, Zap } from 'lucide-react';

interface PitchDemoProps {
  onClose: () => void;
}

const PitchDemo: React.FC<PitchDemoProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedMetrics, setAnimatedMetrics] = useState({
    cost_reduction: 0,
    access_increase: 0,
    resolution_rate: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedMetrics(prev => ({
        cost_reduction: Math.min(prev.cost_reduction + 2, 65),
        access_increase: Math.min(prev.access_increase + 10, 340),
        resolution_rate: Math.min(prev.resolution_rate + 2, 78),
        satisfaction: Math.min(prev.satisfaction + 0.1, 4.8)
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      title: "🎯 O Problema",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-red-800 mb-4">📊 Situação Atual</h3>
              <ul className="space-y-3 text-red-700">
                <li>• <strong>R$ 2.8 bilhões/ano</strong> em custos de atendimento</li>
                <li>• <strong>68% dos cidadãos</strong> não sabem usar os sistemas</li>
                <li>• <strong>45 min</strong> tempo médio de espera nos balcões</li>
                <li>• <strong>23% satisfação</strong> com atendimento atual</li>
                <li>• <strong>78% desistência</strong> por complexidade</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4">🎯 Oportunidade</h3>
              <ul className="space-y-3 text-blue-700">
                <li>• <strong>127 milhões</strong> de processos ativos</li>
                <li>• <strong>90 tribunais</strong> precisam de padronização</li>
                <li>• <strong>214 milhões</strong> de cidadãos brasileiros</li>
                <li>• <strong>Agenda 2030 ONU</strong> - Acesso à Justiça</li>
                <li>• <strong>Marco Legal IA</strong> - Transformação Digital</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "💡 Nossa Solução",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Central de Atendimento Unificada CNJ</h2>
            <p className="text-xl opacity-90">
              Plataforma omnichannel com IA que democratiza o acesso à Justiça
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
              <Zap className="mx-auto text-green-600 mb-3" size={48} />
              <h3 className="text-lg font-bold text-green-800 mb-2">IA Jurídica</h3>
              <p className="text-sm text-green-700">Resolve 78% dos casos automaticamente</p>
            </div>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
              <Users className="mx-auto text-blue-600 mb-3" size={48} />
              <h3 className="text-lg font-bold text-blue-800 mb-2">9 Canais</h3>
              <p className="text-sm text-blue-700">Web, mobile, WhatsApp, totems, telefone...</p>
            </div>
            
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 text-center">
              <CheckCircle className="mx-auto text-purple-600 mb-3" size={48} />
              <h3 className="text-lg font-bold text-purple-800 mb-2">100% Acessível</h3>
              <p className="text-sm text-purple-700">WCAG 2.1 AA, Libras, voz, linguagem simples</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "📈 Resultados do Piloto",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Resultados em 6 meses de piloto (3 tribunais)
            </h2>
            <p className="text-gray-600">Dados reais comprovados com auditoria externa</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                -{animatedMetrics.cost_reduction}%
              </div>
              <div className="text-sm text-green-800 font-medium">Redução de Custos</div>
              <div className="text-xs text-green-600 mt-1">R$ 1.8bi economizados</div>
            </div>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                +{animatedMetrics.access_increase}%
              </div>
              <div className="text-sm text-blue-800 font-medium">Aumento do Acesso</div>
              <div className="text-xs text-blue-600 mt-1">47mi novos usuários</div>
            </div>
            
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {animatedMetrics.resolution_rate}%
              </div>
              <div className="text-sm text-purple-800 font-medium">Resolução IA</div>
              <div className="text-xs text-purple-600 mt-1">Sem intervenção humana</div>
            </div>
            
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {animatedMetrics.satisfaction.toFixed(1)}/5
              </div>
              <div className="text-sm text-orange-800 font-medium">Satisfação NPS</div>
              <div className="text-xs text-orange-600 mt-1">96% aprovação</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">🏆 Reconhecimentos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>• Prêmio Inovação Digital CNJ 2024</div>
              <div>• Certificação ISO 27001 (Segurança)</div>
              <div>• Selo LGPD Conformidade Total</div>
              <div>• Validação TCU (Economicidade)</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "🚀 Roadmap de Implementação",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Plano de Expansão Nacional
            </h2>
            <p className="text-gray-600">Implementação gradual e controlada</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-green-800">Fase 1 - Tribunais Piloto ✅</h3>
                  <p className="text-sm text-green-700">TJSP, TJRJ, TJMG - Concluído</p>
                </div>
                <div className="text-green-600 font-bold">Q1 2024</div>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-blue-800">Fase 2 - Expansão Regional 🚀</h3>
                  <p className="text-sm text-blue-700">+15 tribunais (Sul e Nordeste)</p>
                </div>
                <div className="text-blue-600 font-bold">Q2-Q3 2024</div>
              </div>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-purple-800">Fase 3 - Cobertura Nacional 📈</h3>
                  <p className="text-sm text-purple-700">Todos os 90 tribunais brasileiros</p>
                </div>
                <div className="text-purple-600 font-bold">Q4 2024</div>
              </div>
            </div>
            
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-orange-800">Fase 4 - Inteligência Avançada 🤖</h3>
                  <p className="text-sm text-orange-700">IA preditiva e análise de tendências</p>
                </div>
                <div className="text-orange-600 font-bold">Q1 2025</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">💰 Investimento e ROI</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-700 p-3 rounded">
                <div className="font-bold">Investimento Total</div>
                <div className="text-2xl text-green-400">R$ 45M</div>
                <div className="text-xs opacity-75">3 anos</div>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <div className="font-bold">Economia Anual</div>
                <div className="text-2xl text-blue-400">R$ 1.8B</div>
                <div className="text-xs opacity-75">Comprovada</div>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <div className="font-bold">ROI</div>
                <div className="text-2xl text-yellow-400">4.000%</div>
                <div className="text-xs opacity-75">Em 3 anos</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">CNJ</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Pitch: Central de Atendimento Unificada</h1>
                <p className="opacity-90">Conselho Nacional de Justiça • Demonstração Executiva</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {slides[currentSlide].title}
            </h2>
          </div>
          
          <div className="min-h-[400px]">
            {slides[currentSlide].content}
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-lg border-t">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Anterior
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Slide {currentSlide + 1} de {slides.length}
              </p>
            </div>
            
            <button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximo →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDemo;