import { createClient } from '@supabase/supabase-js';

// Replace these with your actual strings (keep the quotes!)
const supabaseUrl = 'https://lelhybegyyosdsjtejoe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbGh5YmVneXlvc2RzanRlam9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NDQ0NzcsImV4cCI6MjA5NzQyMDQ3N30.00PguB3DXUKPw16pYJ_9a4WEdjmAPl4KAZPIvp3ZY5o';

export const supabase = createClient(supabaseUrl, supabaseKey);