import { Order, OrderStatus } from '@/app/interfaces/gerenciar-interfaces';
import { useState } from 'react';

export function useOrders(initialOrders: Order[]) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const updateOrderStatus = (orderId: number, newStatus: OrderStatus, actionName: string) => {
    if (confirm(`Tem certeza que deseja marcar este pedido como "${actionName}"?`)) {
      setOrders(orders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus, statusTime: "agora mesmo" }
          : order
      ));
    }
  };

  const cancelOrder = (orderId: number) => {
    if (confirm("Tem certeza que deseja cancelar este pedido?")) {
      setOrders(orders.map(order =>
        order.id === orderId
          ? { ...order, status: "Cancelado", statusTime: "agora mesmo" }
          : order
      ));
    }
  };

  const getFilteredOrders = (statusFilter: OrderStatus | "Todos") => {
    return statusFilter === "Todos"
      ? orders
      : orders.filter(order => order.status === statusFilter);
  };

  const getStats = () => ({
    totalHoje: orders.filter(o => o.time.includes("Hoje")).length,
    emPreparo: orders.filter(o => o.status === "Em preparo").length,
    saiuEntrega: orders.filter(o => o.status === "Saiu para entrega").length,
    entregues: orders.filter(o => o.status === "Entregue").length,
  });

  return {
    orders,
    setOrders,
    updateOrderStatus,
    cancelOrder,
    getFilteredOrders,
    getStats,
  };
}