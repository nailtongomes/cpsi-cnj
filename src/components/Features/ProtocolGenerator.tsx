import React, { useState, useEffect } from 'react';
import { CheckCircle, FileText, Clock, User } from 'lucide-react';
import { Protocol, UserProfile } from '../../types';

interface ProtocolGeneratorProps {
  actionType: string;
  userProfile: UserProfile;
  responseTime: string;
  onClose: () => void;
}

const ProtocolGenerator: React.FC<ProtocolGeneratorProps> = ({
  actionType,
  userProfile,
  responseTime,
  onClose
}) => {
  const [protocol, setProtocol] = useState<Protocol | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const generateProtocol = () => {
      const timestamp = new Date();
      const protocolNumber = `JUS-${timestamp.getFullYear()}-${
        String(timestamp.getMonth() + 1).padStart(2, '0')
      }-${String(timestamp.getDate()).padStart(2, '0')}-${
        String(timestamp.getHours()).padStart(2, '0')
      }${String(timestamp.getMinutes()).padStart(2, '0')}${
        String(timestamp.getSeconds()).padStart(2, '0')
      }-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`;

      const newProtocol: Protocol = {
        number: protocolNumber,
        timestamp: timestamp.toLocaleString('pt-BR'),
        action: actionType,
        userProfile,
        status: 'concluido',
        responseTime,
        channel: 'widget'
      };

      setTimeout(() => {
        setProtocol(newProtocol);
        setIsGenerating(false);
      }, 1500);
    };

    generateProtocol();
  }, [actionType, userProfile, responseTime]);

  const getActionName = (action: string) => {
    switch (action) {
      case 'consulta_processual': return 'Consulta Processual';
      case 'peticionamento': return 'Peticionamento Eletrônico';
      case 'backlog_addition': return 'Adição ao Backlog';
      default: return 'Atendimento';
    }
  };

  const getProfileName = (profile: UserProfile) => {
    switch (profile) {
      case 'cidadao': return 'Cidadão';
      case 'advogado': return 'Advogado/Procurador/Promotor';
      case 'servidor': return 'Servidor da Justiça';
    }
  };

  if (isGenerating) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-jus-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Gerando Protocolo
            </h3>
            <p className="text-gray-600">
              Finalizando atendimento...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!protocol) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <CheckCircle size={64} className="mx-auto text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">
            ✅ Atendimento Finalizado
          </h3>
          <p className="text-gray-600">
            Protocolo gerado com sucesso
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
          <div className="flex items-center space-x-3">
            <FileText size={20} className="text-gray-600" />
            <div>
              <p className="font-semibold text-gray-800">Protocolo</p>
              <p className="text-sm text-gray-600 font-mono">{protocol.number}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <User size={20} className="text-gray-600" />
            <div>
              <p className="font-semibold text-gray-800">Perfil</p>
              <p className="text-sm text-gray-600">{getProfileName(protocol.userProfile)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FileText size={20} className="text-gray-600" />
            <div>
              <p className="font-semibold text-gray-800">Ação</p>
              <p className="text-sm text-gray-600">{getActionName(protocol.action)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock size={20} className="text-gray-600" />
            <div>
              <p className="font-semibold text-gray-800">Tempo de Atendimento</p>
              <p className="text-sm text-gray-600">{protocol.responseTime}</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            📧 Enviado para seu email
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-jus-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ProtocolGenerator;