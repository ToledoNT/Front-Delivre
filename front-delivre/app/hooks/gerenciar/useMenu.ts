import { restaurantApi } from "@/app/api/restauranteService";
import { MenuItem } from "@/app/interfaces/gerenciar-interfaces";
import { useState, useEffect } from "react";

export function useMenu(initialItems: MenuItem[]) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialItems);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [menuForm, setMenuForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    imagem: "",
  });

  const [previewImage, setPreviewImage] = useState<string>("");

  // carregar menu da API
  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await restaurantApi.getMenu();
        setMenuItems(data);
      } catch (error) {
        console.error("Erro ao carregar menu:", error);
      }
    }

    loadMenu();
  }, []);

  const handleSaveMenuItem = async () => {
    if (!menuForm.nome || !menuForm.preco || !menuForm.categoria) {
      alert("Preencha nome, preço e categoria");
      return;
    }

    if (editingItem) {
      const updatedItem: MenuItem = {
        ...editingItem,
        ...menuForm,
        preco: `R$ ${menuForm.preco}`,
        imagem: menuForm.imagem || editingItem.imagem,
      };

      try {
        await restaurantApi.updateMenuItem(editingItem.id, updatedItem);

        setMenuItems(
          menuItems.map((item) =>
            item.id === editingItem.id ? updatedItem : item
          )
        );
      } catch (error) {
        console.error("Erro ao atualizar item:", error);
      }

    } else {
      const newItem: MenuItem = {
        id: Date.now(),
        ...menuForm,
        preco: `R$ ${menuForm.preco}`,
        imagem:
          menuForm.imagem ||
          "https://via.placeholder.com/300x200?text=Sem+Imagem",
      };

      try {
        await restaurantApi.createMenuItem(newItem);
        setMenuItems([...menuItems, newItem]);
      } catch (error) {
        console.error("Erro ao criar item:", error);
      }
    }

    resetMenuForm();
  };

  const deleteMenuItem = async (id: number) => {
    if (confirm("Remover item do cardápio?")) {
      try {
        await restaurantApi.deleteMenuItem(id);
        setMenuItems(menuItems.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Erro ao deletar item:", error);
      }
    }
  };

  const startEditItem = (item: MenuItem) => {
    setEditingItem(item);

    setMenuForm({
      nome: item.nome,
      descricao: item.descricao,
      preco: item.preco.replace("R$ ", ""),
      categoria: item.categoria,
      imagem: item.imagem || "",
    });

    setPreviewImage(item.imagem || "");
  };

  const resetMenuForm = () => {
    setEditingItem(null);

    setMenuForm({
      nome: "",
      descricao: "",
      preco: "",
      categoria: "",
      imagem: "",
    });

    setPreviewImage("");
  };

  const handleImageUpload = (
    file: File | null,
    callback: (base64: string) => void
  ) => {
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        callback(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return {
    menuItems,
    editingItem,
    menuForm,
    previewImage,
    setMenuForm,
    setPreviewImage,
    handleSaveMenuItem,
    deleteMenuItem,
    startEditItem,
    resetMenuForm,
    handleImageUpload,
  };
}
