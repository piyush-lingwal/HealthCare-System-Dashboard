import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type HealthReading = {
  id: string;
  user_id: string;
  heart_rate: number;
  spo2: number;
  temperature: number;
  stress_level: number;
  gsr_value: number;
  ecg_value: number;
  timestamp: string;
  created_at: string;
};

export type HealthAlert = {
  id: string;
  user_id: string;
  alert_type: 'critical' | 'warning' | 'info';
  sensor: string;
  message: string;
  value: number;
  acknowledged: boolean;
  created_at: string;
};

export type UserProfile = {
  user_id: string;
  name: string;
  age: number;
  baseline_hr: number;
  baseline_spo2: number;
  baseline_temp: number;
  created_at: string;
  updated_at: string;
};
