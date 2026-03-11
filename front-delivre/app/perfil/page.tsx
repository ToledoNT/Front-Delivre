"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Edit, X } from "lucide-react";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";

export default function PerfilPage() {
  const [user, setUser] = useState({
    name: "João Silva",
    email: "joao@email.com",
    phone: "(54) 99999-0000",
    address: "Rua das Flores, 120 - Centro",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Navbar />

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

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Telefone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Endereço</p>
              <p className="font-medium">{user.address}</p>
            </div>
          </div>

          <button
            onClick={() => {
              setFormData({ ...user });
              setIsEditing(true);
            }}
            className="flex items-center gap-2 mt-4 px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm"
          >
            <Edit className="w-4 h-4" />
            Editar perfil
          </button>
        </div>
      </main>

      {/* Modal de edição */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Editar Perfil</h3>
              <button onClick={handleCancel}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Telefone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Endereço</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}