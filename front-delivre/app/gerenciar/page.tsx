"use client";

import { useState } from "react";
import { Header } from "../components/restaurante/Header";
import { StatsCards } from "../components/restaurante/StatsCards";
import { OrderCard } from "../components/restaurante/OrderCard";
import { OrderDetailsModal } from "../components/restaurante/OrderDeailsModal";
import { MenuManagerModal } from "../components/restaurante/MenuManagerModal";
import { SettingsModal } from "../components/restaurante/SettingsModal";
import { useOrders } from "../hooks/gerenciar/UseOrdersHook";
import { useMenu } from "../hooks/gerenciar/useMenu";
import { useRestaurantConfig } from  "../hooks/gerenciar/useRestaurantConfig";
import { Order, MenuItem, RestaurantConfig } from "../interfaces/gerenciar-interfaces";
import { OrderStatus } from "../interfaces/gerenciar-interfaces";
import Footer from "../components/ui/footer";
import Navbar from "../components/ui/navbar";
import { Package } from "lucide-react";

const initialOrders: Order[] = [
  {
    id: 1,
    cliente: "João Silva",
    items: "2x X-Burger, Batata Frita",
    price: "R$ 48,90",
    status: "Em preparo",
    time: "Hoje • 19:40",
    statusTime: "há 5 min",
    endereco: "Rua das Flores, 123",
    observacoes: "Sem cebola",
  },
  {
    id: 2,
    cliente: "Maria Oliveira",
    items: "Pizza Calabresa Grande",
    price: "R$ 62,00",
    status: "Saiu para entrega",
    time: "Hoje • 20:10",
    statusTime: "há 2 min",
    endereco: "Av. Paulista, 1000",
  },
  {
    id: 3,
    cliente: "Pedro Santos",
    items: "Combo Sushi 20 peças",
    price: "R$ 79,90",
    status: "Entregue",
    time: "Ontem • 18:30",
    statusTime: "ontem 18:45",
  },
];

const initialMenuItems: MenuItem[] = [
  {
    id: 1,
    nome: "X-Burger",
    descricao: "Hambúrguer com queijo, alface e tomate",
    preco: "R$ 24,90",
    categoria: "Lanches",
    imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    nome: "Batata Frita",
    descricao: "Porção de batata crocante",
    preco: "R$ 15,00",
    categoria: "Acompanhamentos",
    imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    nome: "Pizza Calabresa",
    descricao: "Mussarela, calabresa e cebola",
    preco: "R$ 62,00",
    categoria: "Pizzas",
    imagem: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop",
  },
];

const initialConfig: RestaurantConfig = {
  nome: "Delivre Restaurante",
  endereco: "Rua dos Sabores, 123 - Centro",
  telefone: "(11) 99999-9999",
  horarioFuncionamento: [
    { dia: "Segunda-feira", aberto: true, abertura: "11:00", fechamento: "23:00" },
    { dia: "Terça-feira", aberto: true, abertura: "11:00", fechamento: "23:00" },
    { dia: "Quarta-feira", aberto: true, abertura: "11:00", fechamento: "23:00" },
    { dia: "Quinta-feira", aberto: true, abertura: "11:00", fechamento: "23:00" },
    { dia: "Sexta-feira", aberto: true, abertura: "11:00", fechamento: "00:00" },
    { dia: "Sábado", aberto: true, abertura: "12:00", fechamento: "00:00" },
    { dia: "Domingo", aberto: false, abertura: "00:00", fechamento: "00:00" },
  ],
  tempoMedioEntrega: "45",
};

export default function RestauranteDashboard() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "Todos">("Todos");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showMenuManager, setShowMenuManager] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const ordersHook = useOrders(initialOrders);
  const menuHook = useMenu(initialMenuItems);
  const configHook = useRestaurantConfig(initialConfig);

  const filteredOrders = ordersHook.getFilteredOrders(statusFilter);
  const stats = ordersHook.getStats();

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Header
          statusFilter={statusFilter}
          onFilterChange={setStatusFilter}
          onOpenSettings={() => setShowSettings(true)}
          onOpenMenuManager={() => setShowMenuManager(true)}
        />

        <StatsCards {...stats} />

        <h3 className="text-xl font-semibold mb-4">Pedidos Atuais</h3>
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={setSelectedOrder}
              onUpdateStatus={ordersHook.updateOrderStatus}
              onCancel={ordersHook.cancelOrder}
            />
          ))}

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border">
              <Package className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">Nenhum pedido encontrado</p>
            </div>
          )}
        </div>
      </main>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={ordersHook.updateOrderStatus}
          onCancel={ordersHook.cancelOrder}
        />
      )}

      <MenuManagerModal
        isOpen={showMenuManager}
        onClose={() => setShowMenuManager(false)}
        menuItems={menuHook.menuItems}
        editingItem={menuHook.editingItem}
        menuForm={menuHook.menuForm}
        previewImage={menuHook.previewImage}
        onFormChange={(field, value) => menuHook.setMenuForm(prev => ({ ...prev, [field]: value }))}
        onImageUpload={(file) => menuHook.handleImageUpload(file, (base64) => {
          menuHook.setMenuForm(prev => ({ ...prev, imagem: base64 }));
          menuHook.setPreviewImage(base64);
        })}
        onSave={menuHook.handleSaveMenuItem}
        onEdit={menuHook.startEditItem}
        onDelete={menuHook.deleteMenuItem}
        onCancelEdit={menuHook.resetMenuForm}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        config={configHook.config}
        onConfigChange={configHook.handleConfigChange}
        onHorarioChange={configHook.handleHorarioChange}
        onSave={configHook.saveConfig}
      />

      <Footer />
    </div>
  );
}