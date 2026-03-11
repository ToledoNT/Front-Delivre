export type OrderStatus =
  | "Recebido"
  | "Em preparo"
  | "Saiu para entrega"
  | "Entregue"
  | "Cancelado";
export interface Order {
  id: number;
  cliente: string;
  items: string;
  price: string;
  status: OrderStatus;
  time: string;
  statusTime?: string;
  endereco?: string;
  observacoes?: string;
}

export interface MenuItem {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  categoria: string;
  imagem?: string;
}

export interface RestaurantConfig {
  nome: string;
  endereco: string;
  telefone: string;
  horarioFuncionamento: {
    dia: string;
    aberto: boolean;
    abertura: string;
    fechamento: string;
  }[];
  tempoMedioEntrega: string;
}