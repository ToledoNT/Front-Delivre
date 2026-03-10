import { useRef } from 'react';
import { X, Edit, Trash2, ImagePlus, Utensils } from 'lucide-react';
import { MenuItem } from '@/app/interfaces/gerenciar-interfaces';

interface MenuManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  editingItem: MenuItem | null;
  menuForm: {
    nome: string;
    descricao: string;
    preco: string;
    categoria: string;
    imagem: string;
  };
  previewImage: string;
  onFormChange: (field: string, value: string) => void;
  onImageUpload: (file: File | null) => void;
  onSave: () => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: number) => void;
  onCancelEdit: () => void;
}

export function MenuManagerModal({
  isOpen,
  onClose,
  menuItems,
  editingItem,
  menuForm,
  previewImage,
  onFormChange,
  onImageUpload,
  onSave,
  onEdit,
  onDelete,
  onCancelEdit,
}: MenuManagerModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Gerenciar Cardápio</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Formulário */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-semibold mb-3">
              {editingItem ? "✏️ Editar Item" : "➕ Adicionar Novo Item"}
            </h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nome do item"
                value={menuForm.nome}
                onChange={(e) => onFormChange("nome", e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
              <textarea
                placeholder="Descrição"
                value={menuForm.descricao}
                onChange={(e) => onFormChange("descricao", e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                rows={2}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Preço (ex: 24.90)"
                  value={menuForm.preco}
                  onChange={(e) => onFormChange("preco", e.target.value)}
                  className="w-1/2 border rounded-lg px-3 py-2"
                />
                <select
                  value={menuForm.categoria}
                  onChange={(e) => onFormChange("categoria", e.target.value)}
                  className="w-1/2 border rounded-lg px-3 py-2"
                >
                  <option value="">Categoria</option>
                  <option value="Lanches">Lanches</option>
                  <option value="Pizzas">Pizzas</option>
                  <option value="Acompanhamentos">Acompanhamentos</option>
                  <option value="Bebidas">Bebidas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Imagem do item</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 px-3 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    <ImagePlus className="w-4 h-4" />
                    Escolher imagem
                  </button>
                  {previewImage && (
                    <button
                      onClick={() => {
                        onFormChange("imagem", "");
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="text-red-600 text-sm"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => onImageUpload(e.target.files?.[0] || null)}
                  className="hidden"
                />
                {previewImage && (
                  <div className="mt-2">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={onSave}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  {editingItem ? "Salvar alterações" : "Adicionar ao cardápio"}
                </button>
                {editingItem && (
                  <button
                    onClick={onCancelEdit}
                    className="border px-4 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h4 className="font-semibold mb-2">📸 Preview do item</h4>
            <p className="text-sm text-gray-600 mb-4">
              Adicione uma imagem para deixar o cardápio mais atrativo.
            </p>
            {menuForm.nome && (
              <div className="bg-white rounded-lg border p-3 flex gap-3 items-center">
                {previewImage ? (
                  <img src={previewImage} alt="preview" className="w-16 h-16 rounded-lg object-cover" />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    <Utensils className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{menuForm.nome || "Nome do item"}</p>
                  <p className="text-sm text-gray-600">{menuForm.descricao || "Descrição"}</p>
                  <p className="text-sm font-semibold">R$ {menuForm.preco || "0,00"}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <h4 className="font-semibold mb-3 text-lg">🍔 Itens do Cardápio</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map(item => (
            <div key={item.id} className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition">
              <div className="h-40 bg-gray-100 overflow-hidden">
                <img
                  src={item.imagem || "https://via.placeholder.com/300x200?text=Sem+Imagem"}
                  alt={item.nome}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h5 className="font-bold text-lg">{item.nome}</h5>
                <p className="text-sm text-gray-600 line-clamp-2">{item.descricao}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold">{item.preco}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{item.categoria}</span>
                </div>
                <div className="flex justify-end gap-1 mt-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-red-600"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}