# VerdeEvent - Site Web d'Organisation d'Événements Écologiques

VerdeEvent est une entreprise spécialisée dans l'organisation d'événements écologiques et durables. Ce dépôt contient le code source du site web de VerdeEvent, développé avec Next.js, Tailwind CSS et Supabase.

## Fonctionnalités

- Présentation des services d'organisation d'événements écologiques
- Galerie de photos d'événements passés
- Témoignages clients
- Formulaire de contact
- Panneau d'administration pour gérer le contenu du site
- Authentification pour les administrateurs
- Base de données Supabase pour stocker les données

## Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn
- Compte Supabase (gratuit pour commencer)

## Installation

1. Clonez ce dépôt :

```bash
git clone https://github.com/votre-utilisateur/verdeevent.git
cd verdeevent
```

2. Installez les dépendances :

```bash
npm install
# ou
yarn install
```

3. Copiez le fichier `.env.example` en `.env.local` et configurez les variables d'environnement :

```bash
cp .env.example .env.local
```

4. Modifiez le fichier `.env.local` avec vos propres valeurs :

```
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon-supabase
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Configuration de Supabase

Consultez le fichier [supabase/README.md](supabase/README.md) pour des instructions détaillées sur la configuration de Supabase pour ce projet.

## Développement

Pour lancer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

## Structure du projet

```
/
├── public/            # Fichiers statiques (images, etc.)
├── src/
│   ├── app/           # Routes de l'application Next.js
│   │   ├── admin/     # Interface d'administration
│   │   ├── api/       # Routes API
│   │   └── ...        # Autres pages du site
│   ├── components/    # Composants React réutilisables
│   ├── contexts/      # Contextes React (AuthContext, etc.)
│   ├── lib/           # Bibliothèques et utilitaires
│   └── styles/        # Styles globaux
├── supabase/
│   ├── migrations/    # Migrations SQL pour Supabase
│   └── README.md      # Instructions pour configurer Supabase
└── ...
```

## Déploiement

Ce site peut être déployé sur Vercel, Netlify ou tout autre service compatible avec Next.js.

### Déploiement sur Vercel

1. Créez un compte sur [Vercel](https://vercel.com)
2. Connectez votre dépôt GitHub
3. Configurez les variables d'environnement dans les paramètres du projet
4. Déployez !

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

Ce projet est sous licence [MIT](LICENSE).

## Technologies utilisées

- Next.js 15+
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase

## Prérequis

- Node.js 18+
- npm ou yarn
- Git

## Installation

1. Cloner le dépôt :

```bash
git clone [URL_DU_REPO]
cd verdeevent
```

1. Installer les dépendances :

```bash
npm install
```

1. Créer un fichier `.env.local` et configurer les variables d'environnement :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

1. Lancer le serveur de développement :

```bash
npm run dev
```

## Structure du projet

```text
src/
├── app/                    # Pages et routes Next.js
├── components/
│   ├── common/            # Composants réutilisables
│   ├── layout/            # Composants de mise en page
│   ├── sections/          # Sections de page
│   └── ui/                # Composants UI (shadcn)
├── lib/                   # Utilitaires et configurations
└── styles/               # Styles globaux et configurations
```

## Déploiement sur Hostinger VPS

1. Se connecter au VPS via SSH
2. Installer Node.js et npm
3. Cloner le dépôt
4. Installer PM2 : `npm install -g pm2`
5. Construire l'application : `npm run build`
6. Démarrer avec PM2 : `pm2 start npm --name "verdeevent" -- start`

## Maintenance

- Mettre à jour les dépendances : `npm update`
- Vérifier les vulnérabilités : `npm audit`
- Sauvegarder la base de données : suivre la documentation Supabase

## Contact

Pour toute question ou support :

- Email : [email]
- Téléphone : +32 496 06 66 03
