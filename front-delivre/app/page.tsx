export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-12 flex flex-col items-center">

        <div className="text-center space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
            Delivre
          </h1>

          <p className="text-gray-500 text-sm">
            Entre na sua conta ou crie uma nova
          </p>
        </div>

        <div className="w-full flex flex-col gap-4 mt-8">

          <a
            href="/login"
            className="w-full text-center bg-black text-white py-3 rounded-xl font-medium transition hover:bg-gray-800"
          >
            Fazer Login
          </a>

          <a
            href="/cadastro"
            className="w-full text-center border border-gray-300 py-3 rounded-xl font-medium text-gray-800 transition hover:bg-gray-50"
          >
            Criar Conta
          </a>

        </div>

        <div className="w-full border-t mt-8 pt-6 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Delivre
          </p>
        </div>

      </div>

    </div>
  );
}