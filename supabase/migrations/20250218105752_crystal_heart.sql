/*
  # Create blog posts table

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with time zone)
      - `title` (text)
      - `content` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `published` (boolean)
      - `author` (text)
      - `cover_image` (text)
      - `category` (text)

  2. Security
    - Enable RLS on `posts` table
    - Add policy for public read access to published posts
    - Add policy for authenticated users to manage posts
*/

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  content text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  published boolean DEFAULT false,
  author text NOT NULL,
  cover_image text NOT NULL,
  category text NOT NULL CHECK (category IN ('wedding', 'garden'))
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published posts"
  ON posts
  FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can manage posts"
  ON posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);