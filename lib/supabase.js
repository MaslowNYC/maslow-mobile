import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// REPLACE THESE WITH YOUR ACTUAL KEYS FROM YOUR WEB PROJECT
const supabaseUrl = 'https://hrfmphkjeqcwhsfvzfvw.supabase.co';
const supabaseAnonKey = 'sb_secret_7pPTrdMZvQVr0Jhy0MFruQ_YC7Ha6ck';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});