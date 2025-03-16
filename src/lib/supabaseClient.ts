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

// Fonction directe pour tester la connexion à Supabase sans passer par le client
export async function testSupabaseConnection() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Impossible de tester la connexion: variables d'environnement manquantes");
    return { success: false, error: "Variables d'environnement manquantes" };
  }

  try {
    // Test direct avec fetch à l'API Supabase REST
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        statusText: response.statusText,
        error: `Échec de connexion à Supabase: ${response.status} ${response.statusText}`,
      };
    }

    return { success: true, message: 'Connexion à Supabase établie avec succès' };
  } catch (error: any) {
    console.error('Erreur lors du test de connexion à Supabase:', error);
    return {
      success: false,
      error: error.message || 'Erreur inconnue lors du test de connexion',
      details: error,
    };
  }
}

// Fonction fetch personnalisée avec détails d'erreur améliorés
const customFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const startTime = Date.now();

  try {
    console.log(`Requête fetch démarrée: ${typeof input === 'string' ? input : 'URL complexe'}`);

    // Tenter la requête fetch
    const response = await fetch(input, init);

    const duration = Date.now() - startTime;
    console.log(`Requête fetch terminée en ${duration}ms avec statut: ${response.status}`);

    return response;
  } catch (error: any) {
    const duration = Date.now() - startTime;

    // Log détaillé de l'erreur
    console.error(
      `Erreur fetch après ${duration}ms pour ${typeof input === 'string' ? input : 'URL'}: `,
      error
    );

    // Tenter de diagnostiquer le problème réseau
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      console.error('DIAGNOSTIC: Problème de connexion réseau ou DNS');
      console.error('- URL appelée:', typeof input === 'string' ? input : JSON.stringify(input));
      console.error('- Méthode:', init?.method || 'GET');
      console.error('- Headers:', JSON.stringify(init?.headers || {}));
      console.error('- Vérifiez votre connexion Internet');
      console.error('- Vérifiez si le domaine Supabase est accessible');
      console.error('- Vérifiez si un proxy ou pare-feu bloque les requêtes');

      // Tester la connexion directement
      testSupabaseConnection().then((result) => {
        console.log('Résultat du test direct de connexion:', result);
      });
    }

    // Relancer l'erreur pour que Supabase puisse la traiter
    throw error;
  }
};

// Créer le client Supabase avec gestion d'erreurs améliorée et timeouts plus longs
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  global: {
    fetch: customFetch,
    headers: {
      'X-Client-Info': 'verdeevent@1.0.0',
    },
  },
  realtime: {
    timeout: 60000, // 60 secondes
    params: {
      eventsPerSecond: 5,
    },
  },
});
