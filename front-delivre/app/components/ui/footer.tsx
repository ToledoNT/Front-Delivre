"use client";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12 py-6">
      <div className="max-w-6xl mx-auto px-6 text-center text-sm text-black">
        <p className="font-medium">© {new Date().getFullYear()} Delivre</p>

        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:underline">Termos</a>
          <a href="#" className="hover:underline">Privacidade</a>
          <a href="#" className="hover:underline">Ajuda</a>
        </div>
      </div>
    </footer>
  );
}