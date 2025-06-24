import React, { useState } from 'react';
import { Mic, MessageSquare } from 'lucide-react';
import { InteractionMode } from '../../../types';

interface ModeSelectorProps {
  onModeSelect: (mode: InteractionMode) => void;
  onSavePreference?: (save: boolean) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onModeSelect, onSavePreference }) => {
  const [selectedMode, setSelectedMode] = useState<InteractionMode | null>(null);
  const [savePreference, setSavePreference] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    if (selectedMode) {
      setIsLoading(true);
      setTimeout(() => {
        onModeSelect(selectedMode);
        if (onSavePreference) {
          onSavePreference(savePreference);
        }
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Como você prefere interagir?
          </h2>
          <p className="text-gray-600">
            Escolha a forma mais confortável para você
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => setSelectedMode('voz')}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              selectedMode === 'voz'
                ? 'border-jus-blue bg-blue-50 text-jus-blue'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-center space-x-3">
              <Mic size={32} />
              <div className="text-left">
                <div className="font-semibold text-lg">🗣️ MODO VOZ</div>
                <div className="text-sm text-gray-600">
                  Fale naturalmente comigo
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedMode('texto')}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              selectedMode === 'texto'
                ? 'border-jus-blue bg-blue-50 text-jus-blue'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-center space-x-3">
              <MessageSquare size={32} />
              <div className="text-left">
                <div className="font-semibold text-lg">⌨️ MODO TEXTO/BOTÕES</div>
                <div className="text-sm text-gray-600">
                  Digite ou use botões
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="mb-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={savePreference}
              onChange={(e) => setSavePreference(e.target.checked)}
              className="w-5 h-5 text-jus-blue rounded focus:ring-jus-blue"
            />
            <span className="text-gray-700">Salvar essa opção</span>
          </label>
        </div>

        <button
          onClick={handleConfirm}
          disabled={!selectedMode || isLoading}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            selectedMode && !isLoading
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>🔧 Configurando {selectedMode === 'voz' ? 'microfone' : 'chat'}...</span>
            </div>
          ) : (
            'Confirmar'
          )}
        </button>
      </div>
    </div>
  );
};

export default ModeSelector;