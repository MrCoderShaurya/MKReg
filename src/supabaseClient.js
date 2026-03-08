const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_url_here') {
  const { createClient } = await import('@supabase/supabase-js');
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  // Mock Supabase client for development
  supabase = {
    from: () => ({
      select: () => ({ order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }) }),
      insert: () => Promise.resolve({ error: null }),
      eq: () => ({ limit: () => Promise.resolve({ data: [], error: null }) })
    })
  };
}

export { supabase };
