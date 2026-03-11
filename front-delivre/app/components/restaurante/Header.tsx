import { OrderStatus } from "@/app/interfaces/gerenciar-interfaces";
import { Package, Filter, Settings, Edit } from "lucide-react";
import { ActionButton } from "../ui/actionButton";

interface HeaderProps {
  statusFilter: OrderStatus | "Todos";
  onFilterChange: (filter: OrderStatus | "Todos") => void;
  onOpenSettings: () => void;
  onOpenMenuManager: () => void;
}

export function Header({
  statusFilter,
  onFilterChange,
  onOpenSettings,
  onOpenMenuManager,
}: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      
      {/* Título */}
      <div className="flex items-center gap-2">
        <Package className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Dashboard do Restaurante</h2>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

        {/* Filtro */}
        <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2">
          <Filter className="w-4 h-4 text-gray-500" />

          <select
            value={statusFilter}
            onChange={(e) =>
              onFilterChange(e.target.value as OrderStatus | "Todos")
            }
            className="text-sm bg-transparent outline-none"
          >
            <option value="Todos">Todos os pedidos</option>
            <option value="Recebido">Recebido</option>
            <option value="Em preparo">Em preparo</option>
            <option value="Saiu para entrega">Saiu para entrega</option>
            <option value="Entregue">Entregue</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        {/* Botão Configurações */}
        <ActionButton
          onClick={onOpenSettings}
          icon={<Settings className="w-4 h-4" />}
          label="Configurações"
          className="bg-gray-700 hover:bg-gray-600"
        />

        {/* Botão Menu */}
        <ActionButton
          onClick={onOpenMenuManager}
          icon={<Edit className="w-4 h-4" />}
          label="Gerenciar Menu"
          className="bg-black hover:bg-gray-800"
        />

      </div>
    </div>
  );
}