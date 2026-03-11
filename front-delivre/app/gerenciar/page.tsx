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
import { useRestaurantConfig } from "../hooks/gerenciar/useRestaurantConfig";

import { Order, OrderStatus } from "../interfaces/gerenciar-interfaces";

import Footer from "../components/ui/footer";
import Navbar from "../components/ui/navbar";

import { Package } from "lucide-react";

export default function RestauranteDashboard() {

  const [statusFilter, setStatusFilter] = useState<OrderStatus | "Todos">("Todos");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [showMenuManager, setShowMenuManager] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // hooks agora carregam da API
  const ordersHook = useOrders([]);
  const menuHook = useMenu([]);
  const configHook = useRestaurantConfig({
    nome: "",
    endereco: "",
    telefone: "",
    horarioFuncionamento: [],
    tempoMedioEntrega: "",
  });

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

        <h3 className="text-xl font-semibold mb-4">
          Pedidos Atuais
        </h3>

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

              <p className="text-gray-500">
                Nenhum pedido encontrado
              </p>

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

        onFormChange={(field, value) =>
          menuHook.setMenuForm(prev => ({ ...prev, [field]: value }))
        }

        onImageUpload={(file) =>
          menuHook.handleImageUpload(file, base64 => {
            menuHook.setMenuForm(prev => ({ ...prev, imagem: base64 }));
            menuHook.setPreviewImage(base64);
          })
        }

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