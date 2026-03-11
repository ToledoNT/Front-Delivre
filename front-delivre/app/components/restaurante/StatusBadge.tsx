import { OrderStatus } from '@/app/interfaces/gerenciar-interfaces';
import { Check, Flame, Truck, X, AlertCircle, Clock } from "lucide-react";
interface StatusBadgeProps {
  status: OrderStatus;
  statusTime?: string;
  showTime?: boolean;
}
// COLOCAR UM STATUS ANTERIOR AO EM PREPARO
const statusConfig = {
  "Recebido": { bg: "bg-purple-100", text: "text-purple-700", icon: Clock, label: "Recebido" },
  "Em preparo": { bg: "bg-yellow-100", text: "text-yellow-700", icon: Flame, label: "Em preparo" },
  "Saiu para entrega": { bg: "bg-blue-100", text: "text-blue-700", icon: Truck, label: "Saiu p/ entrega" },
  "Entregue": { bg: "bg-green-100", text: "text-green-700", icon: Check, label: "Entregue" },
  "Cancelado": { bg: "bg-red-100", text: "text-red-700", icon: X, label: "Cancelado" },
  "default": { bg: "bg-gray-100", text: "text-gray-700", icon: AlertCircle, label: "Desconhecido" },
};
export function StatusBadge({ status, statusTime, showTime = false }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.default;
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
        title={`Atualizado ${statusTime || ""}`}
      >
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
      {showTime && statusTime && (
        <span className="text-xs text-gray-500">({statusTime})</span>
      )}
    </div>
  );
}