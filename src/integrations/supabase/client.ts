// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lrtidryoqrlddsuamymt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxydGlkcnlvcXJsZGRzdWFteW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NjgyNDUsImV4cCI6MjA2NTE0NDI0NX0.vSpl0FrPaZBA0sahFd9daC5LYIKlOrN3XTUT8B4mtO0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);