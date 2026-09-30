// Clé anonyme Supabase uniquement — aucune donnée sensible, la sécurité
// vit côté serveur (policies RLS, fonctions security definer). Mêmes
// valeurs que Dans Mon Quartier/Config/Secrets.swift côté app.
const SUPABASE_URL = "https://dtvlpqoearaayaqtkuri.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0dmxwcW9lYXJhYXlhcXRrdXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2MTI1MjEsImV4cCI6MjEwMTE4ODUyMX0.DAIyluE5qw9hDN6hc5XUpUWyUCjDr7zWoarIjudoZIQ";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
