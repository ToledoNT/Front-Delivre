"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Footer from "../components/ui/footer";

export default function Cadastro() {
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  const inputStyle =
    "border border-gray-300 rounded-xl px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      {/* Área central do cadastro */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-12 flex flex-col">

          {/* Título */}
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">
              Criar conta
            </h1>
            <p className="text-gray-500 text-sm">
              Cadastre-se para começar a usar o Delivre
            </p>
          </div>

          {/* Formulário */}
          <form className="flex flex-col gap-4">

            {/* Nome e sobrenome */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Nome</label>
                <input type="text" placeholder="João" className={inputStyle} />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Sobrenome</label>
                <input type="text" placeholder="Silva" className={inputStyle} />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">E-mail</label>
              <input type="email" placeholder="seu@email.com" className={inputStyle} />
            </div>

            {/* Celular */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Celular (WhatsApp)</label>
              <input type="tel" placeholder="(11) 99999-9999" className={inputStyle} />
            </div>

            {/* Data nascimento */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Data de nascimento</label>
              <input type="date" className={inputStyle} />
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Senha</label>
              <div className="relative">
                <input
                  type={showSenha ? "text" : "password"}
                  placeholder="********"
                  className={`${inputStyle} w-full pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowSenha(!showSenha)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirmar senha */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Confirmar senha</label>
              <div className="relative">
                <input
                  type={showConfirmSenha ? "text" : "password"}
                  placeholder="********"
                  className={`${inputStyle} w-full pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmSenha(!showConfirmSenha)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="mt-4 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
            >
              Criar conta
            </button>

          </form>

          {/* Link login */}
          <p className="text-sm text-gray-500 text-center mt-6">
            Já tem uma conta?{" "}
            <a href="/login" className="text-black font-medium hover:underline">
              Fazer login
            </a>
          </p>

        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}