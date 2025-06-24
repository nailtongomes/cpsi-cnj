import React from 'react';
import { Monitor, Smartphone, MessageCircle, Send, TabletSmartphone, Phone } from 'lucide-react';
import { Channel } from '../../../types';

interface ChannelTabsProps {
  activeChannel: Channel;
  onChannelChange: (channel: Channel) => void;
}

const ChannelTabs: React.FC<ChannelTabsProps> = ({ activeChannel, onChannelChange }) => {
  const channels = [
    {
      id: 'widget' as Channel,
      name: 'Portal Web',
      icon: Monitor,
      description: 'Widget flutuante',
      color: 'bg-blue-500'
    },
    {
      id: 'totem' as Channel,
      name: 'Totem',
      icon: TabletSmartphone,
      description: 'Modo kiosk',
      color: 'bg-purple-500'
    },
    {
      id: 'whatsapp' as Channel,
      name: 'WhatsApp',
      icon: MessageCircle,
      description: 'Chat integrado',
      color: 'bg-green-500'
    },
    {
      id: 'telegram' as Channel,
      name: 'Telegram',
      icon: Send,
      description: 'Bot automatizado',
      color: 'bg-blue-400'
    },
    {
      id: 'mobile' as Channel,
      name: 'App Mobile',
      icon: Smartphone,
      description: 'Aplicativo nativo',
      color: 'bg-orange-500'
    },
    {
      id: 'phone' as Channel,
      name: 'Telefone',
      icon: Phone,
      description: 'URA + IA por voz',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          🌐 Interface Omnichannel
        </h2>
        <div className="text-sm text-gray-600">
          Demonstração Multi-Canal
        </div>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto">
        {channels.map((channel) => {
          const Icon = channel.icon;
          const isActive = activeChannel === channel.id;
          
          return (
            <button
              key={channel.id}
              onClick={() => onChannelChange(channel.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                isActive
                  ? `${channel.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon size={20} />
              <div className="text-left">
                <div className="font-semibold">{channel.name}</div>
                <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                  {channel.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        💡 Clique nas abas para simular diferentes canais de atendimento
      </div>
    </div>
  );
};

export default ChannelTabs;