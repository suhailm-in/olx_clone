import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://mjarfvhulzzgdkcffcpp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qYXJmdmh1bHp6Z2RrY2ZmY3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MTE0NzAsImV4cCI6MjA3NDk4NzQ3MH0.JseAhHQTLLQyGdZNBdMlrV2TPf4fOz_v5b4_rwcu3x0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
