export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  images: string[];
  category: string;
  description: string;
  rating: number;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}