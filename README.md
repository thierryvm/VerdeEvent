# VerdeEvent - Site Web

Site web pour VerdeEvent, combinant les services d'Oceane Event Planner (organisation d'événements) et Vertiyo (aménagement de parcs et jardins).

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
