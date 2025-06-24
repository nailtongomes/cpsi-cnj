import React, { useState } from 'react';
import { Upload, FileText, Calendar, HelpCircle, CheckCircle, AlertCircle, Mail, Search } from 'lucide-react';
import { mockProcesses } from '../../data/mockData';

interface LawyerInterfaceProps {
  onAction: (action: string, data?: any) => void;
}

const LawyerInterface: React.FC<LawyerInterfaceProps> = ({ onAction }) => {
  const [showPetitioning, setShowPetitioning] = useState(false);
  const [showClientConsultation, setShowClientConsultation] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isProtocoling, setIsProtocoling] = useState(false);
  const [protocolResult, setProtocolResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [clientCpf, setClientCpf] = useState('');
  const [clientResults, setClientResults] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setIsValidating(true);
      
      setTimeout(() => {
        setIsValidated(true);
        setIsValidating(false);
      }, 2000);
    }
  };

  const handleProtocol = () => {
    setIsProtocoling(true);
    
    setTimeout(() => {
      const protocolNumber = `2025.0127.${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}.001`;
      setProtocolResult({
        success: true,
        protocol: protocolNumber,
        timestamp: new Date().toLocaleString('pt-BR'),
        email: 'advogado@escritorio.com'
      });
      setIsProtocoling(false);
      
      setTimeout(() => {
        onAction('protocol', {
          type: 'peticionamento',
          protocol: `JUS-${new Date().toISOString().slice(0,19).replace(/[-:]/g, '').replace('T', '-')}-002`,
          responseTime: '3min 15s'
        });
      }, 2000);
    }, 3000);
  };

  const handleClientSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      const clientProcesses = mockProcesses.filter(p => p.owner_cpf === '123.456.789-00');
      setClientResults({
        found: true,
        client: {
          name: 'Maria Silva Santos',
          cpf: clientCpf,
          processes: clientProcesses
        }
      });
      setIsSearching(false);
      setTimeout(() => {
        onAction('protocol', {
          type: 'consulta_cliente',
          protocol: `JUS-${new Date().toISOString().slice(0,19).replace(/[-:]/g, '').replace('T', '-')}-004`,
          responseTime: '1min 20s'
        });
      }, 2000);
    }, 2500);
  };

  const handleSchedule = () => {
    onAction('protocol', {
      type: 'agendamento',
      protocol: `JUS-${new Date().toISOString().slice(0,19).replace(/[-:]/g, '').replace('T', '-')}-005`,
      responseTime: '45s'
    });
    alert('📅 Agendamento realizado!\n\nAudiência marcada para:\n🗓️ Data: 15/03/2025 às 14:30\n🏛️ Local: 2ª Vara Cível - Sala 3\n📧 Confirmação enviada por email');
  };

  const mainButtons = [
    {
      icon: Upload,
      title: 'Protocolar petição',
      description: 'Enviar documentos para o tribunal',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => setShowPetitioning(true)
    },
    {
      icon: FileText,
      title: 'Consultar processos dos clientes',
      description: 'Acompanhar andamentos processuais',
      color: 'bg-indigo-600 hover:bg-indigo-700',
      action: () => setShowClientConsultation(true)
    },
    {
      icon: Calendar,
      title: 'Agendar com vara',
      description: 'Marcar audiências e reuniões',
      color: 'bg-purple-600 hover:bg-purple-700',
      action: handleSchedule
    },
    {
      icon: HelpCircle,
      title: 'Suporte técnico',
      description: 'Ajuda com sistemas e procedimentos',
      color: 'bg-gray-600 hover:bg-gray-700',
      action: () => onAction('suporte')
    }
  ];

  if (showClientConsultation) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">
            👥 CONSULTAR PROCESSOS DE CLIENTES
          </h2>
          <p className="text-gray-600">Verificação de credenciais OAB...</p>
        </div>

        {!clientResults && (
          <div className="space-y-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-800 mb-3">
                🔍 Digite o CPF do cliente:
              </h3>
              
              <div className="space-y-3">
                <input
                  type="text"
                  value={clientCpf}
                  onChange={(e) => setClientCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                
                <button
                  onClick={handleClientSearch}
                  disabled={!clientCpf || isSearching}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSearching ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>🔍 Buscando processos do cliente...</span>
                    </div>
                  ) : (
                    <>
                      <Search className="inline mr-2" size={20} />
                      🔍 BUSCAR PROCESSOS
                    </>
                  )}
                </button>
              </div>
              
              <div className="mt-3 p-3 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-yellow-800 text-sm">
                  ⚖️ <strong>OAB verificada:</strong> 13092/SP - Dr. Carlos Santos<br/>
                  🔒 Acesso autorizado para consulta de processos
                </p>
              </div>
            </div>
          </div>
        )}

        {clientResults && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="text-green-600" size={24} />
                <div>
                  <h3 className="font-bold text-lg text-green-800">
                    ✅ Cliente localizado!
                  </h3>
                  <p className="text-green-700">
                    <strong>👤 Nome:</strong> {clientResults.client.name}<br/>
                    <strong>📄 CPF:</strong> {clientResults.client.cpf}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">
                  📋 Processos encontrados ({clientResults.client.processes.length}):
                </h4>
                
                {clientResults.client.processes.map((process: any, index: number) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>📋 Tipo:</strong> {process.type}</p>
                        <p><strong>📊 Status:</strong> {process.status}</p>
                        <p><strong>🏛️ Vara:</strong> {process.court}</p>
                      </div>
                      <div>
                        <p><strong>📅 Criado:</strong> {new Date(process.created_date).toLocaleDateString('pt-BR')}</p>
                        <p><strong>⏱️ Estimativa:</strong> {process.estimated_time}</p>
                        <p><strong>🔄 Última movimentação:</strong> {new Date(process.last_movement.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    
                    {process.intimations && process.intimations.length > 0 && (
                      <div className="mt-3 p-3 bg-red-50 rounded border border-red-200">
                        <p className="text-red-800 font-semibold">
                          ⚠️ ATENÇÃO: Cliente tem {process.intimations.length} intimação(ões) pendente(s)
                        </p>
                        {process.intimations.map((intimation: any, idx: number) => (
                          <div key={idx} className="mt-2 text-sm">
                            <p><strong>📋 {intimation.type}:</strong> {intimation.content}</p>
                            {intimation.deadline && (
                              <p className="text-red-600 font-bold">
                                ⏰ Prazo: {new Date(intimation.deadline).toLocaleDateString('pt-BR')}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowClientConsultation(false)}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
        >
          ← Voltar
        </button>
      </div>
    );
  }

  if (showPetitioning) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-blue-700 mb-2">
            📄 PROTOCOLAR PETIÇÃO
          </h2>
          <p className="text-gray-600">Validando credenciais OAB...</p>
        </div>

        {!protocolResult && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-3">
                1. Selecione o arquivo PDF da petição:
              </h3>
              
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload size={48} className="mx-auto text-blue-500 mb-4" />
                  <p className="text-blue-700 font-medium mb-2">
                    🗂️ Arraste o arquivo aqui ou clique para selecionar
                  </p>
                  <p className="text-sm text-blue-600">
                    Formatos aceitos: PDF (máx. 50MB)
                  </p>
                </label>
              </div>
            </div>

            {uploadedFile && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="font-semibold">
                    Arquivo carregado: {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(1)}MB)
                  </span>
                </div>
                
                {isValidating && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>🔍 Validando documento...</span>
                  </div>
                )}
                
                {isValidated && (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle size={16} />
                      <span>✅ Petição válida</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle size={16} />
                      <span>✅ Assinatura digital detectada</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle size={16} />
                      <span>✅ Vara competente identificada</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isValidated && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-3">
                  📋 RESUMO DO PROTOCOLO
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Arquivo:</strong> {uploadedFile?.name}</p>
                  <p><strong>Vara:</strong> 1ª Vara Cível de Natal/RN</p>
                  <p><strong>Taxa:</strong> R$ 0,00 (Justiça Gratuita)</p>
                </div>
                
                <div className="mt-4 flex items-center space-x-2 text-yellow-800">
                  <AlertCircle size={20} />
                  <span className="font-medium">Tem certeza que deseja protocolar?</span>
                </div>
                
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={handleProtocol}
                    disabled={isProtocoling}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
                  >
                    {isProtocoling ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Protocolando...</span>
                      </div>
                    ) : (
                      '✅ CONFIRMAR PROTOCOLO'
                    )}
                  </button>
                  <button
                    onClick={() => setShowPetitioning(false)}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
                  >
                    ❌ CANCELAR
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {protocolResult && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle size={64} className="mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-4">
              🎉 PETIÇÃO PROTOCOLADA COM SUCESSO!
            </h3>
            
            <div className="space-y-3 text-left bg-white rounded-lg p-4">
              <p><strong>Número do protocolo:</strong> {protocolResult.protocol}</p>
              <p><strong>Data/hora:</strong> {protocolResult.timestamp}</p>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-600" />
                <span><strong>Link de confirmação enviado para:</strong> {protocolResult.email}</span>
              </div>
              <p className="text-orange-600"><strong>⏰ Prazo para assinatura:</strong> 24 horas</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowPetitioning(false)}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
        >
          ← Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-blue-700 mb-2">
          ⚖️ Área do Advogado/Procurador/Promotor
        </h2>
        <p className="text-gray-600">Interface profissional para operadores do direito</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mainButtons.map((button, index) => {
          const Icon = button.icon;
          return (
            <button
              key={index}
              onClick={button.action}
              className={`${button.color} text-white p-4 rounded-xl text-left transition-all hover:shadow-lg`}
            >
              <div className="flex items-center space-x-3">
                <Icon size={32} />
                <div>
                  <h3 className="font-semibold text-lg">{button.title}</h3>
                  <p className="text-sm opacity-90">{button.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LawyerInterface;