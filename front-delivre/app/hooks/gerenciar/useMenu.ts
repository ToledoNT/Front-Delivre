import { MenuItem } from '@/app/interfaces/gerenciar-interfaces';
import { useState } from 'react';

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

  const handleSaveMenuItem = () => {
    if (!menuForm.nome || !menuForm.preco || !menuForm.categoria) {
      alert("Preencha nome, preço e categoria");
      return;
    }

    if (editingItem) {
      setMenuItems(menuItems.map(item =>
        item.id === editingItem.id
          ? {
              ...item,
              ...menuForm,
              preco: `R$ ${menuForm.preco}`,
              imagem: menuForm.imagem || item.imagem,
            }
          : item
      ));
    } else {
      const newItem: MenuItem = {
        id: Date.now(),
        ...menuForm,
        preco: `R$ ${menuForm.preco}`,
        imagem: menuForm.imagem || "https://via.placeholder.com/300x200?text=Sem+Imagem",
      };
      setMenuItems([...menuItems, newItem]);
    }
    resetMenuForm();
  };

  const deleteMenuItem = (id: number) => {
    if (confirm("Remover item do cardápio?")) {
      setMenuItems(menuItems.filter(item => item.id !== id));
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
    setMenuForm({ nome: "", descricao: "", preco: "", categoria: "", imagem: "" });
    setPreviewImage("");
  };

  const handleImageUpload = (file: File | null, callback: (base64: string) => void) => {
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