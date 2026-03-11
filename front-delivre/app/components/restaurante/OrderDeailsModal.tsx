import { X, Truck, Check, CookingPot } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Order } from "@/app/interfaces/gerenciar-interfaces";
import { ActionButton } from "../ui/actionButton";

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (
    orderId: number,
    newStatus: Order["status"],
    actionName: string
  ) => void;
  onCancel: (orderId: number) => void;
}

export function OrderDetailsModal({
  order,
  onClose,
  onUpdateStatus,
  onCancel,
}: OrderDetailsModalProps) {
  const handleAction = (action: () => void) => {
    if (confirm("Confirmar ação?")) {
      action();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">

        {/* header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Detalhes do Pedido</h3>

          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* conteúdo */}
        <div className="space-y-3">

          <p>
            <span className="font-medium">Cliente:</span> {order.cliente}
          </p>

          <p>
            <span className="font-medium">Itens:</span> {order.items}
          </p>

          <p>
            <span className="font-medium">Total:</span> {order.price}
          </p>

          <p>
            <span className="font-medium">Horário:</span> {order.time}
          </p>

          {order.statusTime && (
            <p>
              <span className="font-medium">Última atualização:</span>{" "}
              {order.statusTime}
            </p>
          )}

          {order.endereco && (
            <p>
              <span className="font-medium">Endereço:</span> {order.endereco}
            </p>
          )}

          {order.observacoes && (
            <p>
              <span className="font-medium">Obs:</span> {order.observacoes}
            </p>
          )}

          <p className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <StatusBadge status={order.status} />
          </p>

          {/* ações */}
          {order.status !== "Cancelado" && order.status !== "Entregue" && (
            <div className="flex flex-col gap-2 pt-4">

              {order.status === "Recebido" && (
                <ActionButton
                  onClick={() =>
                    handleAction(() =>
                      onUpdateStatus(order.id, "Em preparo", "Em preparo")
                    )
                  }
                  icon={<CookingPot className="w-4 h-4" />}
                  label="Iniciar preparo"
                  className="bg-yellow-500 hover:bg-yellow-600"
                />
              )}

              {order.status === "Em preparo" && (
                <ActionButton
                  onClick={() =>
                    handleAction(() =>
                      onUpdateStatus(
                        order.id,
                        "Saiu para entrega",
                        "Saiu para entrega"
                      )
                    )
                  }
                  icon={<Truck className="w-4 h-4" />}
                  label="Saiu para entrega"
                  className="bg-blue-600 hover:bg-blue-700"
                />
              )}

              {order.status === "Saiu para entrega" && (
                <ActionButton
                  onClick={() =>
                    handleAction(() =>
                      onUpdateStatus(order.id, "Entregue", "Entregue")
                    )
                  }
                  icon={<Check className="w-4 h-4" />}
                  label="Confirmar entrega"
                  className="bg-green-600 hover:bg-green-700"
                />
              )}

              <ActionButton
                onClick={() => handleAction(() => onCancel(order.id))}
                icon={<X className="w-4 h-4" />}
                label="Cancelar pedido"
                className="bg-red-600 hover:bg-red-700"
              />

            </div>
          )}
        </div>
      </div>
    </div>
  );
}