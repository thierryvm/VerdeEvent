import { createClient } from '@supabase/supabase-js';

// Vérifier si les variables d'environnement sont définies
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Journaliser pour le débogage (en développement uniquement)
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase URL:', supabaseUrl ? 'Définie' : 'Non définie');
  console.log('Supabase Anon Key:', supabaseAnonKey ? 'Définie' : 'Non définie');
}

// Vérification des variables d'environnement
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Erreur: Variables d'environnement Supabase manquantes.");
  console.error(
    'Assurez-vous que NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont définies dans .env.local'
  );
}

// Créer le client Supabase
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  global: {
    headers: {
      'X-Client-Info': 'verdeevent@1.0.0',
    },
  },
});
