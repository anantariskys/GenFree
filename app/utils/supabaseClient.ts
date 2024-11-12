import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zgatvcyjilewwwuueaak.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnYXR2Y3lqaWxld3d3dXVlYWFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMzIyMzIsImV4cCI6MjA0NjkwODIzMn0.Ej1Tz5OvkdJCUKj2TxX5xiZhiXKaOyJxZ95J1MyD3TI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
