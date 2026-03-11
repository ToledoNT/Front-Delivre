import { restaurantApi } from "@/app/api/restauranteService";
import { Order, OrderStatus } from "@/app/interfaces/gerenciar-interfaces";
import { useState, useEffect } from "react";

export function useOrders(initialOrders: Order[]) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // carregar pedidos da API
  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await restaurantApi.getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      }
    }

    loadOrders();
  }, []);

  const updateOrderStatus = async (
    orderId: number,
    newStatus: OrderStatus,
    actionName: string
  ) => {
    if (confirm(`Tem certeza que deseja marcar este pedido como "${actionName}"?`)) {
      try {
        await restaurantApi.updateOrderStatus(orderId, newStatus);

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, status: newStatus, statusTime: "agora mesmo" }
              : order
          )
        );
      } catch (error) {
        console.error("Erro ao atualizar pedido:", error);
      }
    }
  };

  const cancelOrder = async (orderId: number) => {
    if (confirm("Tem certeza que deseja cancelar este pedido?")) {
      try {
        await restaurantApi.updateOrderStatus(orderId, "Cancelado");

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, status: "Cancelado", statusTime: "agora mesmo" }
              : order
          )
        );
      } catch (error) {
        console.error("Erro ao cancelar pedido:", error);
      }
    }
  };

  const getFilteredOrders = (statusFilter: OrderStatus | "Todos") => {
    if (statusFilter === "Todos") return orders;
    return orders.filter((order) => order.status === statusFilter);
  };

  const getStats = () => ({
    totalHoje: orders.filter((o) => o.time.includes("Hoje")).length,
    emPreparo: orders.filter((o) => o.status === "Em preparo").length,
    saiuEntrega: orders.filter((o) => o.status === "Saiu para entrega").length,
    entregues: orders.filter((o) => o.status === "Entregue").length,
  });

  return {
    orders,
    updateOrderStatus,
    cancelOrder,
    getFilteredOrders,
    getStats,
  };
}
