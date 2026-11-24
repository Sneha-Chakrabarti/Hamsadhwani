// ============================================================
// FILL THESE IN before the site will work. All four are safe to
// be public (the anon key is a public, rate-limited key by design;
// your real protection is the RLS policies in sql/schema.sql).
// ============================================================

// Supabase dashboard -> Project Settings -> API
const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-PUBLIC-KEY";

// Your UPI ID and the name that should show in the buyer's UPI app
const UPI_ID = "your-upi-id@bank";
const UPI_NAME = "Sneha Chakrabarti";

// WhatsApp number buyers' order confirmations get sent to.
// Country code + number, no + no spaces.
const WHATSAPP_NUMBER = "919362821348";
