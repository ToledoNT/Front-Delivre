import { useState, ReactNode } from "react";
import { MoreVertical, Truck, CheckCircle, XCircle } from "lucide-react";
import { Order } from "@/app/interfaces/gerenciar-interfaces";
import { ActionButton } from "@/app/components/ui/actionButton";

interface OrderActionsProps {
  order: Order;
  onUpdateStatus: (
    orderId: number,
    newStatus: Order["status"],
    actionName: string
  ) => void;
  onCancel: (orderId: number) => void;
}

interface ActionItem {
  label: string;
  icon: ReactNode;
  action: () => void;
  className?: string;
}

export function OrderActions({
  order,
  onUpdateStatus,
  onCancel,
}: OrderActionsProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const availableActions: ActionItem[] = [];

  if (order.status === "Em preparo") {
    availableActions.push({
      label: "Saiu para entrega",
      icon: <Truck className="w-4 h-4" />,
      action: () =>
        onUpdateStatus(order.id, "Saiu para entrega", "Saiu para entrega"),
      className: "bg-blue-600 hover:bg-blue-700",
    });
  }

  if (order.status === "Saiu para entrega") {
    availableActions.push({
      label: "Entregue",
      icon: <CheckCircle className="w-4 h-4" />,
      action: () => onUpdateStatus(order.id, "Entregue", "Entregue"),
      className: "bg-green-600 hover:bg-green-700",
    });
  }

  if (order.status !== "Cancelado" && order.status !== "Entregue") {
    availableActions.push({
      label: "Cancelar",
      icon: <XCircle className="w-4 h-4" />,
      action: () => onCancel(order.id),
      className: "bg-red-600 hover:bg-red-700",
    });
  }

  if (availableActions.length === 0) return null;

  return (
    <div className="relative">
      {/* botão menu */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="p-1 rounded-full hover:bg-gray-200"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {showDropdown && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />

          {/* dropdown */}
          <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border z-20 p-2 flex flex-col gap-2">
            {availableActions.map((action, idx) => (
              <ActionButton
                key={idx}
                onClick={() => {
                  setShowDropdown(false);
                  action.action();
                }}
                icon={action.icon}
                label={action.label}
                className={action.className}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}