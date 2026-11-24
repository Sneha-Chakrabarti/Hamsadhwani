// Shared Supabase client, built from config.js.
// Loaded after the Supabase SDK script and after config.js on every page.
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
