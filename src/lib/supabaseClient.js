import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://biyboqoelvcwftcmwhbx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpeWJvcW9lbHZjd2Z0Y213aGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NTUyMjQsImV4cCI6MjA2OTUzMTIyNH0.XjP5iJY9vivhkejv5VFqRpYeaoDBgTQUx620vFASHLc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
