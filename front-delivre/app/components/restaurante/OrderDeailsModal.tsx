import { X, Truck, Check } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { Order } from '@/app/interfaces/gerenciar-interfaces';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (orderId: number, newStatus: Order["status"], actionName: string) => void;
  onCancel: (orderId: number) => void;
}

export function OrderDetailsModal({ order, onClose, onUpdateStatus, onCancel }: OrderDetailsModalProps) {
  const handleAction = (action: () => void) => {
    if (confirm("Confirmar ação?")) {
      action();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Detalhes do Pedido</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          <p><span className="font-medium">Cliente:</span> {order.cliente}</p>
          <p><span className="font-medium">Itens:</span> {order.items}</p>
          <p><span className="font-medium">Total:</span> {order.price}</p>
          <p><span className="font-medium">Horário do pedido:</span> {order.time}</p>
          {order.statusTime && (
            <p><span className="font-medium">Última atualização:</span> {order.statusTime}</p>
          )}
          {order.endereco && (
            <p><span className="font-medium">Endereço:</span> {order.endereco}</p>
          )}
          {order.observacoes && (
            <p><span className="font-medium">Obs:</span> {order.observacoes}</p>
          )}
          <p className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <StatusBadge status={order.status} />
          </p>

          {order.status !== "Cancelado" && order.status !== "Entregue" && (
            <div className="flex gap-2 pt-4">
              {order.status === "Em preparo" && (
                <button
                  onClick={() => handleAction(() => onUpdateStatus(order.id, "Saiu para entrega", "Saiu para entrega"))}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  <Truck className="w-4 h-4 inline mr-1" />
                  Saiu para entrega
                </button>
              )}
              {order.status === "Saiu para entrega" && (
                <button
                  onClick={() => handleAction(() => onUpdateStatus(order.id, "Entregue", "Entregue"))}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  <Check className="w-4 h-4 inline mr-1" />
                  Confirmar entrega
                </button>
              )}
              <button
                onClick={() => handleAction(() => onCancel(order.id))}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                <X className="w-4 h-4 inline mr-1" />
                Cancelar pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}