import { Clock, ChevronRight } from "lucide-react";
import { Order } from "../../interfaces/gerenciar-interfaces";
import { StatusBadge } from "./StatusBadge";
import { OrderActions } from "./OrderActions";
import { ActionButton } from "../ui/actionButton";

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  onUpdateStatus: (
    orderId: number,
    newStatus: Order["status"],
    actionName: string
  ) => void;
  onCancel: (orderId: number) => void;
}

export function OrderCard({
  order,
  onViewDetails,
  onUpdateStatus,
  onCancel,
}: OrderCardProps) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">

        {/* informações do pedido */}
        <div className="flex-1">
          <h4 className="font-semibold text-lg">{order.cliente}</h4>

          <p className="text-sm text-gray-600">{order.items}</p>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {order.time}
            </span>

            <StatusBadge
              status={order.status}
              statusTime={order.statusTime}
              showTime
            />
          </div>
        </div>

        {/* ações */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">

          <p className="font-semibold text-lg">{order.price}</p>

          <OrderActions
            order={order}
            onUpdateStatus={onUpdateStatus}
            onCancel={onCancel}
          />

          <ActionButton
            onClick={() => onViewDetails(order)}
            icon={<ChevronRight className="w-4 h-4" />}
            label="Ver detalhes"
            className="bg-gray-800 hover:bg-gray-900 text-white"
          />
        </div>

      </div>
    </div>
  );
}