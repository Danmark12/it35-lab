// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// export const supabase = createClient(supabaseUrl, supabaseKey);

// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://svxaqqyntmzamuewsymc.supabase.co';  
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2eGFxcXludG16YW11ZXdzeW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3OTM2MTksImV4cCI6MjA1ODM2OTYxOX0.v6sYwp6QShMflgX7l6OXVz9FTSHPnH1Z-m1NmamPD8Y'; 


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
