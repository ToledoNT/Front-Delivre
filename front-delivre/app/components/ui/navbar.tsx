"use client";

import Link from "next/link";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold">
          Delivre
        </Link>

        <div className="flex items-center gap-3">

          <span className="text-sm hidden md:block">
            Olá, João
          </span>

          {/* HOME - agora aparece primeiro */}
          <Link
            href="/home"
            className="px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
          >
            🏠 Home
          </Link>

          {/* PEDIDOS */}
          <Link
            href="/pedidos"
            className="px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
          >
            📦 Pedidos
          </Link>

          {/* GERENCIAR RESTAURANTE */}
          <Link
            href="/gerenciar"
            className="px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
          >
            🍴 Gerenciar
          </Link>

          {/* PERFIL */}
          <Link
            href="/perfil"
            className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
          >
            <User className="w-4 h-4" />
            Perfil
          </Link>

          {/* SAIR */}
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm">
            🚪 Sair
          </button>

        </div>
      </div>
    </header>
  );
}