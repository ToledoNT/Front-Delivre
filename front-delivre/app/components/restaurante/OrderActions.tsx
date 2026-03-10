import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { Order } from '@/app/interfaces/gerenciar-interfaces';

interface OrderActionsProps {
  order: Order;
  onUpdateStatus: (orderId: number, newStatus: Order["status"], actionName: string) => void;
  onCancel: (orderId: number) => void;
}

export function OrderActions({ order, onUpdateStatus, onCancel }: OrderActionsProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const availableActions = [];
  if (order.status === "Em preparo") {
    availableActions.push({ label: "Saiu para entrega", action: () => onUpdateStatus(order.id, "Saiu para entrega", "Saiu para entrega") });
  }
  if (order.status === "Saiu para entrega") {
    availableActions.push({ label: "Entregue", action: () => onUpdateStatus(order.id, "Entregue", "Entregue") });
  }
  if (order.status !== "Cancelado" && order.status !== "Entregue") {
    availableActions.push({ label: "Cancelar", action: () => onCancel(order.id), danger: true });
  }

  if (availableActions.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="p-1 rounded-full hover:bg-gray-200"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      {showDropdown && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border z-20 py-1">
            {availableActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setShowDropdown(false);
                  action.action();
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  action.danger ? "text-red-600" : ""
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}