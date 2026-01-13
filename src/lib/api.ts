import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_at_price: number | null;
  category: string;
  brand: string | null;
  form: string | null;
  tags: string[];
  image_url: string | null;
  gallery: string[];
  rating: number;
  review_count: number;
  in_stock: boolean;
  featured: boolean;
  benefits: string[];
  ingredients: string | null;
  how_to_use: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  about: {
    title: string;
    story: string;
    mission: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  store: {
    name: string;
    tagline: string;
    free_shipping_threshold: number;
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shipping_address: any;
  billing_address: any;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
  created_at: string;
}

// Products
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Product[];
};

export const getProductBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data as Product;
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Product;
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'rating' | 'review_count'>) => {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();
  
  if (error) throw error;
  return data as Product;
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Product;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Site Settings
export const getSiteSettings = async (): Promise<SiteSettings> => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*');
  
  if (error) throw error;
  
  const settings: SiteSettings = {
    about: { title: '', story: '', mission: '' },
    contact: { email: '', phone: '', address: '', hours: '' },
    social: { facebook: '', instagram: '', twitter: '', youtube: '' },
    store: { name: '', tagline: '', free_shipping_threshold: 50 },
  };
  
  data?.forEach((row: { key: string; value: any }) => {
    if (row.key in settings) {
      (settings as any)[row.key] = row.value;
    }
  });
  
  return settings;
};

export const updateSiteSetting = async (key: string, value: any) => {
  const { error } = await supabase
    .from('site_settings')
    .update({ value })
    .eq('key', key);
  
  if (error) throw error;
};

// Contact Messages
export const submitContactMessage = async (message: Omit<ContactMessage, 'id' | 'read' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert(message)
    .select()
    .single();
  
  if (error) throw error;
  return data as ContactMessage;
};

export const getContactMessages = async () => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as ContactMessage[];
};

export const markMessageAsRead = async (id: string) => {
  const { error } = await supabase
    .from('contact_messages')
    .update({ read: true })
    .eq('id', id);
  
  if (error) throw error;
};

// Orders
export const getOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Order[];
};

export const getOrderById = async (id: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Order;
};

export const getOrderItems = async (orderId: string) => {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);
  
  if (error) throw error;
  return data as OrderItem[];
};

export const updateOrderStatus = async (id: string, status: Order['status']) => {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id);
  
  if (error) throw error;
};

// Check admin status
export const checkIsAdmin = async (userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', 'admin')
    .maybeSingle();
  
  if (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
  
  return !!data;
};

// Upload image to storage
export const uploadProductImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
