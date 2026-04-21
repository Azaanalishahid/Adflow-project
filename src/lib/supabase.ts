import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Ad {
  id: string;
  user_id: string;
  title: string;
  category: string;
  city: string;
  price: number;
  description: string;
  image: string;
  status: 'pending' | 'approved';
  created_at: string;
  package: 'basic' | 'standard' | 'premium';
}

export const api = {
  async createAd(ad: Omit<Ad, 'id' | 'created_at'>) {
    const { data, error } = await supabase.from('ads').insert(ad).select().single();
    if (error) throw error;
    return data;
  },

  async getAds(status?: 'pending' | 'approved') {
    let query = supabase.from('ads').select('*').order('created_at', { ascending: false });
    if (status) {
      query = query.eq('status', status);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async uploadImage(file: File) {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('ads-images')
      .upload(`public/${fileName}`, file);
      
    if (error) throw error;
    
    const { data: publicUrlData } = supabase.storage
      .from('ads-images')
      .getPublicUrl(data.path);
      
    return publicUrlData.publicUrl;
  },

  async seedDemoAds(userId: string) {
    const demoAds: Omit<Ad, 'id' | 'created_at'>[] = [
      { title: 'iPhone 13 Pro', category: 'Electronics', city: 'New York', price: 699, description: 'Pristine condition, battery health 92%', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80', status: 'approved', package: 'premium', user_id: userId },
      { title: 'MacBook Air M2', category: 'Electronics', city: 'San Francisco', price: 999, description: 'Like new, complete with box and charger', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', status: 'approved', package: 'premium', user_id: userId },
      { title: 'Gaming PC', category: 'Electronics', city: 'Chicago', price: 1200, description: 'RTX 3080, 32GB RAM, 1TB NVMe, liquid cooled', image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&q=80', status: 'approved', package: 'standard', user_id: userId },
      { title: 'Mountain Bike', category: 'Vehicles', city: 'Denver', price: 450, description: 'Trek Marlin 7, freshly tuned, ready to hit the trails', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80', status: 'approved', package: 'basic', user_id: userId },
      { title: 'Downtown Apartment', category: 'Real Estate', city: 'Miami', price: 2500, description: 'Beautiful 1BR overlooking the ocean. Utilities included.', image: 'https://images.unsplash.com/photo-1502672260266-1c1de2d96674?w=800&q=80', status: 'approved', package: 'premium', user_id: userId },
      { title: 'Modern Sofa Set', category: 'Services', city: 'Austin', price: 850, description: '3-seater and 2 chairs. Genuine leather, dark charcoal.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', status: 'approved', package: 'standard', user_id: userId },
      { title: 'Canon EOS R5', category: 'Electronics', city: 'Los Angeles', price: 3500, description: 'Body only, shutter count under 5k. Meticulously cared for.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80', status: 'approved', package: 'premium', user_id: userId },
      { title: 'Nike Air Max 270', category: 'Services', city: 'Atlanta', price: 120, description: 'Size 10 US, worn twice. Looks brand new.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', status: 'approved', package: 'basic', user_id: userId },
      { title: 'Apple Watch Series 8', category: 'Electronics', city: 'Seattle', price: 299, description: 'GPS + Cellular, Midnight Aluminum Case.', image: 'https://images.unsplash.com/photo-1434493789847-2f02b0c4e20b?w=800&q=80', status: 'approved', package: 'standard', user_id: userId },
      { title: 'Sony WH-1000XM5', category: 'Electronics', city: 'Boston', price: 250, description: 'Industry leading noise cancellation, excellent state.', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80', status: 'approved', package: 'basic', user_id: userId }
    ];

    const { data, error } = await supabase.from('ads').insert(demoAds).select();
    if (error) throw error;
    return data;
  }
};
