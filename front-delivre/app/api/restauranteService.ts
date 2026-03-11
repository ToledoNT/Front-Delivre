import { MenuItem, Order, RestaurantConfig } from "@/app/interfaces/gerenciar-interfaces";

const API_URL = "http://localhost:3000/api"; // muda depois se precisar

export const restaurantApi = {
  // MENU
  async getMenu(): Promise<MenuItem[]> {
    const res = await fetch(`${API_URL}/menu`);
    return res.json();
  },

  async createMenuItem(item: MenuItem) {
    const res = await fetch(`${API_URL}/menu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    return res.json();
  },
async updateMenuItem(id: number, item: Partial<MenuItem>) {
  const res = await fetch(`${API_URL}/menu/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  return res.json();
},

  async deleteMenuItem(id: number) {
    await fetch(`${API_URL}/menu/${id}`, {
      method: "DELETE",
    });
  },

  // ORDERS
  async getOrders(): Promise<Order[]> {
    const res = await fetch(`${API_URL}/orders`);
    return res.json();
  },

  async updateOrderStatus(id: number, status: string) {
    await fetch(`${API_URL}/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  },

  // CONFIG
  async getConfig(): Promise<RestaurantConfig> {
    const res = await fetch(`${API_URL}/config`);
    return res.json();
  },

  async saveConfig(config: RestaurantConfig) {
    await fetch(`${API_URL}/config`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
  },
};
