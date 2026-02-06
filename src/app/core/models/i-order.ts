export interface IOrderItem {
  id?: number;
  productId: number;
  productName?: string;
  quantity: number;
  price?: number;
}

export interface IOrder {
  id?: number;
  totalProducts: number;
  totalPrice: number;
  state: 'CART' | 'ORDER';
  user?: {
    id: number;
    name: string;
    email: string;
  };
  createdAt?: string;
  orderAt?: string;
  address: string;
  orderItems?: IOrderItem[];
}
