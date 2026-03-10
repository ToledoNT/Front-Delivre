"use client";

import { useState } from "react";
import { Search, Star, Clock, Heart, ChevronRight } from "lucide-react";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";

export default function HomeCliente() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");

  const categories = [
    { id: "todos", name: "Todos", icon: "🍽️" },
    { id: "lanches", name: "Lanches", icon: "🍔" },
    { id: "pizza", name: "Pizza", icon: "🍕" },
    { id: "japones", name: "Japonês", icon: "🍣" },
    { id: "sobremesas", name: "Sobremesas", icon: "🍰" },
    { id: "saudavel", name: "Saudável", icon: "🥗" },
  ];

  const restaurants = [
    { id: 1, name: "Burger House", cuisine: "Hambúrguer", time: "25-35 min", rating: 4.5, price: "$$", image: "bg-amber-200", featured: true },
    { id: 2, name: "Pizzaria Napoli", cuisine: "Pizza", time: "30-40 min", rating: 4.7, price: "$$$", image: "bg-red-200", featured: true },
    { id: 3, name: "Sushi Express", cuisine: "Japonês", time: "35-45 min", rating: 4.3, price: "$$", image: "bg-blue-200", featured: false },
    { id: 4, name: "Doce Mania", cuisine: "Sobremesas", time: "20-30 min", rating: 4.8, price: "$", image: "bg-pink-200", featured: true },
    { id: 5, name: "Green Salads", cuisine: "Saudável", time: "15-25 min", rating: 4.2, price: "$$", image: "bg-green-200", featured: false },
    { id: 6, name: "Taco Bell", cuisine: "Mexicano", time: "20-30 min", rating: 4.0, price: "$", image: "bg-yellow-200", featured: false },
  ];

  const filteredRestaurants = restaurants.filter((r) => {
    if (activeCategory === "todos") return true;
    return r.cuisine.toLowerCase().includes(activeCategory);
  });

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      
      {/* Navbar */}
      <Navbar />

      {/* Conteúdo principal */}
      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* BUSCA */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
          <input
            type="text"
            placeholder="Buscar restaurantes ou pratos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* CATEGORIAS */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                activeCategory === cat.id
                  ? "bg-black text-white"
                  : "bg-white border text-black hover:bg-gray-50"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* RESTAURANTES */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Restaurantes próximos</h2>
          <a href="#" className="flex items-center gap-1 text-sm hover:underline">
            Ver todos
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredRestaurants.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition cursor-pointer"
            >
              <div className={`h-40 ${r.image} relative`}>
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{r.name}</h3>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{r.price}</span>
                </div>

                <p className="text-sm">{r.cuisine}</p>

                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {r.rating}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {r.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MAIS PEDIDOS */}
        <h2 className="text-lg font-semibold mb-4">🔥 Mais pedidos da semana</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {restaurants
            .filter((r) => r.featured)
            .map((r) => (
              <div
                key={r.id}
                className="min-w-[250px] bg-white rounded-xl shadow-sm border overflow-hidden"
              >
                <div className={`h-24 ${r.image}`} />
                <div className="p-3">
                  <h4 className="font-medium">{r.name}</h4>
                  <p className="text-xs">{r.cuisine}</p>
                </div>
              </div>
            ))}
        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}