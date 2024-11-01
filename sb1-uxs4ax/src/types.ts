export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';