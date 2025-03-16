# Configuration Supabase pour VerdeEvent

Ce document explique comment configurer Supabase pour le projet VerdeEvent.

## Prérequis

- Un compte Supabase (gratuit)
- Accès à l'interface d'administration Supabase

## Étapes de configuration

### 1. Créer un nouveau projet Supabase

1. Connectez-vous à [Supabase](https://app.supabase.io/)
2. Cliquez sur "New Project"
3. Donnez un nom à votre projet (ex: "verdeevent")
4. Choisissez une région proche de vos utilisateurs (ex: Europe)
5. Définissez un mot de passe sécurisé pour la base de données
6. Cliquez sur "Create new project"

### 2. Configurer les variables d'environnement

Une fois votre projet créé, récupérez les informations suivantes depuis le tableau de bord Supabase :

1. Allez dans "Settings" > "API"
2. Copiez l'URL du projet (`https://xxxxxxxxxxxxxxxxxxxx.supabase.co`)
3. Copiez la clé `anon` (public)

Mettez à jour votre fichier `.env.local` avec ces valeurs :

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

### 3. Exécuter les migrations SQL

Pour créer les tables nécessaires dans Supabase :

1. Allez dans "SQL Editor" dans le tableau de bord Supabase
2. Cliquez sur "New Query"
3. Copiez-collez le contenu du fichier `supabase/migrations/01_initial_schema.sql`
4. Cliquez sur "Run" pour exécuter le script SQL

### 4. Configurer l'authentification

1. Allez dans "Authentication" > "Settings"
2. Dans "Site URL", entrez l'URL de votre site (en développement : `http://localhost:3000`)
3. Dans "Redirect URLs", ajoutez :
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/admin/login`
   - L'URL de production si disponible

### 5. Créer un utilisateur administrateur

1. Allez dans "Authentication" > "Users"
2. Cliquez sur "Invite User"
3. Entrez l'adresse email de l'administrateur
4. Une fois l'utilisateur créé, allez dans "SQL Editor"
5. Exécutez la requête suivante pour promouvoir l'utilisateur en administrateur :

```sql
UPDATE users
SET role = 'admin'
WHERE email = 'email_de_admin@example.com';
```

### 6. Configurer le stockage pour les images

1. Allez dans "Storage" > "Policies"
2. Créez un nouveau bucket nommé "images"
3. Définissez les politiques suivantes :
   - Lecture publique pour tous
   - Écriture limitée aux utilisateurs authentifiés
   - Suppression limitée aux administrateurs

## Vérification

Pour vérifier que tout fonctionne correctement :

1. Redémarrez votre serveur de développement
2. Essayez de vous connecter avec l'utilisateur administrateur
3. Vérifiez que vous pouvez accéder à l'interface d'administration
