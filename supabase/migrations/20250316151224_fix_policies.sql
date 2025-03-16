-- Supprimer les politiques existantes qui causent une récursion infinie
DROP POLICY IF EXISTS "Seuls les administrateurs peuvent modifier les articles" ON blog_posts;
DROP POLICY IF EXISTS "Seuls les administrateurs peuvent voir et modifier les contacts" ON contacts;
DROP POLICY IF EXISTS "Seuls les administrateurs peuvent gérer les catégories" ON blog_categories;
DROP POLICY IF EXISTS "Seuls les administrateurs peuvent gérer les relations articles-catégories" ON blog_posts_categories;
DROP POLICY IF EXISTS "Seuls les administrateurs peuvent voir tous les utilisateurs" ON users;

-- Créer de nouvelles politiques sans récursion
CREATE POLICY "Administrateurs peuvent modifier les articles" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Administrateurs peuvent voir et modifier les contacts" ON contacts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Administrateurs peuvent gérer les catégories" ON blog_categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Administrateurs peuvent gérer les relations articles-catégories" ON blog_posts_categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Administrateurs peuvent voir tous les utilisateurs" ON users
  FOR SELECT USING (auth.role() = 'authenticated');

-- Politique temporaire pour permettre l'accès sans authentification (pour le développement)
CREATE POLICY "Accès temporaire sans authentification" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Accès temporaire sans authentification" ON blog_categories FOR ALL USING (true);
CREATE POLICY "Accès temporaire sans authentification" ON blog_posts_categories FOR ALL USING (true);
CREATE POLICY "Accès temporaire sans authentification" ON contacts FOR ALL USING (true);
