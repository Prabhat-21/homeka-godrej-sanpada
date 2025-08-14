import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface Customer {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  source?: string;
  interest_type?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// Customer service functions
export const customerService = {
  // Create a new customer
  async createCustomer(customerData: Omit<Customer, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('customers')
      .insert([customerData])
      .select()
      .single();

    if (error) {
      console.error('Error creating customer:', error);
      throw error;
    }

    return data;
  },

  // Get all customers
  async getCustomers() {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000); // Add reasonable limit for performance

    if (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }

    return data;
  },

  // Get customer by phone
  async getCustomerByPhone(phone: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('phone', phone)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching customer by phone:', error);
      throw error;
    }

    return data;
  },

  // Update customer
  async updateCustomer(id: string, updates: Partial<Customer>) {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating customer:', error);
      throw error;
    }

    return data;
  }
};