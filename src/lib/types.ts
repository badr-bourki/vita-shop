export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  category: ProductCategory;
  brand: string;
  form: ProductForm;
  tags: string[];
  images: string[];
  ingredients: string[];
  benefits: string[];
  dosage: string;
  warnings: string[];
  allergens: string[];
  ratingAvg: number;
  ratingCount: number;
  createdAt: string;
  isBestseller?: boolean;
  isNew?: boolean;
}

export type ProductCategory = 
  | 'supplements'
  | 'vitamins'
  | 'skincare'
  | 'hair-care'
  | 'fitness-recovery'
  | 'personal-care';

export type ProductForm = 
  | 'capsules'
  | 'powder'
  | 'gummies'
  | 'serum'
  | 'cream'
  | 'gel'
  | 'lotion'
  | 'spray'
  | 'liquid'
  | 'stick';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  role: 'user' | 'admin';
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  stars: number;
  comment: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  total: number;
  address: Address;
  items: OrderItem[];
  createdAt: string;
}

export type OrderStatus = 
  | 'pending'
  | 'paid'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  nameSnapshot: string;
  priceSnapshot: number;
  quantity: number;
  image?: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}
