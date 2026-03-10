"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";

export default function PerfilPage() {
  const [user] = useState({
    name: "João Silva",
    email: "joao@email.com",
    phone: "(54) 99999-0000",
    address: "Rua das Flores, 120 - Centro",
  });

  return (
    <div className="min-h-screen bg-gray-100 text-black">

      {/* Navbar */}
      <Navbar />

      {/* CONTEÚDO */}
      <main className="max-w-3xl mx-auto px-6 py-10">

        {/* FOTO + NOME */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-10 h-10 text-gray-500" />
            </div>

            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {/* INFORMAÇÕES */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-5">
          <h3 className="text-lg font-semibold">Informações da conta</h3>

          {/* EMAIL */}
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          {/* TELEFONE */}
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Telefone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          </div>

          {/* ENDEREÇO */}
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Endereço</p>
              <p className="font-medium">{user.address}</p>
            </div>
          </div>

          {/* BOTÃO EDITAR */}
          <button className="flex items-center gap-2 mt-4 px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">
            <Edit className="w-4 h-4" />
            Editar perfil
          </button>
        </div>

      </main>

      <Footer />
        </div>
  );
}