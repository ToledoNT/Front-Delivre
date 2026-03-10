"use client";

import { useState } from "react";
import { User, Clock, ChevronRight, Package } from "lucide-react";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";

export default function PedidosPage() {
  const [orders] = useState([
    {
      id: 1,
      restaurant: "Burger House",
      items: "2x X-Burger, Batata Frita",
      price: "R$ 48,90",
      status: "Entregue",
      time: "Ontem • 19:40",
    },
    {
      id: 2,
      restaurant: "Pizzaria Napoli",
      items: "Pizza Calabresa Grande",
      price: "R$ 62,00",
      status: "Em preparo",
      time: "Hoje • 20:10",
    },
    {
      id: 3,
      restaurant: "Sushi Express",
      items: "Combo 20 peças",
      price: "R$ 79,90",
      status: "Saiu para entrega",
      time: "Hoje • 20:35",
    },
  ]);

  const getStatusColor = (status: string) => {
    if (status === "Entregue") return "bg-green-100 text-green-700";
    if (status === "Em preparo") return "bg-yellow-100 text-yellow-700";
    if (status === "Saiu para entrega") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      
      {/* Chama o componente Navbar */}
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10">

        {/* TÍTULO */}
        <div className="flex items-center gap-2 mb-8">
          <Package className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Meus Pedidos</h2>
        </div>

        {/* LISTA DE PEDIDOS */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">

                <div>
                  <h3 className="font-semibold text-lg">{order.restaurant}</h3>
                  <p className="text-sm text-gray-600">{order.items}</p>

                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {order.time}
                    </span>

                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold mb-2">{order.price}</p>
                  <button className="flex items-center gap-1 text-sm hover:underline">
                    Ver detalhes
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </main>
<Footer />
    </div>
  );
}