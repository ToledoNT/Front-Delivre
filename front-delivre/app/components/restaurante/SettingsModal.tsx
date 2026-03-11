import { RestaurantConfig } from "@/app/interfaces/gerenciar-interfaces";
import { X, Save } from "lucide-react";
import { ActionButton } from "../ui/actionButton";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: RestaurantConfig;
  onConfigChange: (field: keyof RestaurantConfig, value: any) => void;
  onHorarioChange: (index: number, field: string, value: any) => void;
  onSave: () => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  config,
  onConfigChange,
  onHorarioChange,
  onSave,
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">⚙️ Configurações do Restaurante</h3>

          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="space-y-6">
          
          {/* Informações */}
          <div className="border-b pb-4">
            <h4 className="font-semibold mb-3">Informações da empresa</h4>

            <div className="space-y-3">

              <div>
                <label className="block text-sm font-medium mb-1">
                  Nome do restaurante
                </label>

                <input
                  type="text"
                  value={config.nome}
                  onChange={(e) => onConfigChange("nome", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Endereço
                </label>

                <input
                  type="text"
                  value={config.endereco}
                  onChange={(e) => onConfigChange("endereco", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Telefone
                </label>

                <input
                  type="text"
                  value={config.telefone}
                  onChange={(e) => onConfigChange("telefone", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

            </div>
          </div>

          {/* Horário */}
          <div className="border-b pb-4">
            <h4 className="font-semibold mb-3">Horário de funcionamento</h4>

            <div className="space-y-3">
              {config.horarioFuncionamento.map((dia, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 flex-wrap sm:flex-nowrap"
                >
                  <span className="w-32 text-sm">{dia.dia}</span>

                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      checked={dia.aberto}
                      onChange={(e) =>
                        onHorarioChange(idx, "aberto", e.target.checked)
                      }
                    />
                    Aberto
                  </label>

                  {dia.aberto && (
                    <>
                      <input
                        type="time"
                        value={dia.abertura}
                        onChange={(e) =>
                          onHorarioChange(idx, "abertura", e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      />

                      <span>às</span>

                      <input
                        type="time"
                        value={dia.fechamento}
                        onChange={(e) =>
                          onHorarioChange(idx, "fechamento", e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      />
                    </>
                  )}

                  {!dia.aberto && (
                    <span className="text-sm text-gray-500">Fechado</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Entrega */}
          <div>
            <h4 className="font-semibold mb-3">Configurações de entrega</h4>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tempo médio de entrega (minutos)
                </label>

                <input
                  type="text"
                  value={config.tempoMedioEntrega}
                  onChange={(e) =>
                    onConfigChange("tempoMedioEntrega", e.target.value)
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />

                <p className="text-xs text-gray-500 mt-1">
                  A entrega é por conta do restaurante (sem taxa).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3 mt-6">

          <ActionButton
            onClick={onClose}
            icon={<X className="w-4 h-4" />}
            label="Cancelar"
            className="bg-gray-200 text-black hover:bg-gray-300"
          />

          <ActionButton
            onClick={() => {
              onSave();
              onClose();
            }}
            icon={<Save className="w-4 h-4" />}
            label="Salvar alterações"
            className="bg-black hover:bg-gray-800"
          />

        </div>

      </div>
    </div>
  );
}