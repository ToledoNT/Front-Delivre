"use client";

import Footer from "../components/ui/footer";


export default function Login() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 px-6">

      {/* Conteúdo central */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-12 flex flex-col">

          <div className="text-center space-y-3 mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">
              Entrar no Delivre
            </h1>
            <p className="text-gray-500 text-sm">
              Acesse sua conta para continuar
            </p>
          </div>

          <form className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">
                Senha
              </label>
              <input
                type="password"
                placeholder="********"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
            >
              Entrar
            </button>

          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Não tem conta?{" "}
            <a
              href="/cadastro"
              className="text-black font-medium hover:underline"
            >
              Criar conta
            </a>
          </p>

        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}