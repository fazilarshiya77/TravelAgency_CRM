import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isValidCredentials = 
  supabaseUrl && 
  supabaseUrl !== 'YOUR_SUPABASE_PROJECT_URL' && 
  supabaseAnonKey && 
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_PUBLIC_KEY';

export const supabase = isValidCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
