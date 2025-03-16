import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Liste des emails administrateurs - SOLUTION TEMPORAIRE
const ADMIN_EMAILS = ['thierryvm@hotmail.com']; // Doit correspondre à la liste dans AuthContext.tsx

export async function middleware(req: NextRequest) {
  console.log('Middleware exécuté pour:', req.nextUrl.pathname);

  // Créer une réponse par défaut
  const res = NextResponse.next();

  try {
    // Créer le client Supabase
    const supabase = createMiddlewareClient({ req, res });

    // Vérifier si l'utilisateur est connecté
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Erreur lors de la récupération de la session dans le middleware:', error);
      return res;
    }

    console.log('Session dans le middleware:', session ? 'Présente' : 'Absente');

    // Si session trouvée, journaliser l'information
    if (session) {
      console.log('Utilisateur authentifié:', session.user.email);
    }

    // SOLUTION TEMPORAIRE: Désactiver les vérifications strictes
    // --------------------------------------------------------
    // Autoriser l'accès à /admin même sans session détectée dans le middleware
    // Cela contourne le problème de synchronisation de session entre client et serveur
    if (req.nextUrl.pathname.startsWith('/admin')) {
      console.log('Accès autorisé à la section admin (vérification désactivée)');
      return res;
    }

    // Si l'utilisateur est déjà connecté (avec session) et tente d'accéder à la page de login
    if (req.nextUrl.pathname === '/login' && session) {
      console.log("Utilisateur connecté tentant d'accéder à /login, redirection vers /admin");
      const redirectUrl = new URL('/admin', req.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Permettre l'accès à la page de login dans tous les cas
    if (req.nextUrl.pathname === '/login') {
      return res;
    }

    // Pour les autres routes, comportement normal
    return res;
  } catch (error) {
    console.error('Exception dans le middleware:', error);
    return res;
  }
}

// Spécifier les chemins sur lesquels le middleware doit s'exécuter
export const config = {
  matcher: ['/admin/:path*', '/login'],
};
