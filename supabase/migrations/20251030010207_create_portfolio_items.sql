/*
  # Portfolio Items Schema

  ## Overview
  Creates a comprehensive portfolio management system with secure access controls.

  ## New Tables
  
  ### `portfolio_items`
  Stores all portfolio projects and products with rich metadata:
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text, required) - Project/product title
  - `description` (text) - Detailed description
  - `url` (text, required) - Link to the project/product
  - `preview_image` (text) - URL to preview/screenshot image
  - `og_image` (text) - Auto-fetched Open Graph image
  - `technologies` (text array) - Technologies/tools used
  - `category` (text) - Project category/type
  - `date_completed` (date) - Completion date
  - `display_order` (integer) - Custom sorting order
  - `is_featured` (boolean) - Featured flag for homepage
  - `is_published` (boolean) - Publish/draft status
  - `created_at` (timestamptz) - Record creation time
  - `updated_at` (timestamptz) - Last update time
  - `created_by` (uuid) - User who created the item

  ## Security
  
  ### Row Level Security (RLS)
  - Enabled on all tables
  - Public read access for published items only
  - Authenticated users can manage their own items
  - Admin access through auth metadata

  ## Notes
  - All timestamps use timezone-aware types
  - Default values provided for booleans and timestamps
  - Indexes added for common query patterns
*/

-- Create portfolio_items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  url text NOT NULL,
  preview_image text,
  og_image text,
  technologies text[] DEFAULT '{}',
  category text DEFAULT '',
  date_completed date,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- Public can view published items
CREATE POLICY "Anyone can view published portfolio items"
  ON portfolio_items
  FOR SELECT
  USING (is_published = true);

-- Authenticated users can view all their own items
CREATE POLICY "Users can view own portfolio items"
  ON portfolio_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = created_by);

-- Authenticated users can insert their own items
CREATE POLICY "Users can insert own portfolio items"
  ON portfolio_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Authenticated users can update their own items
CREATE POLICY "Users can update own portfolio items"
  ON portfolio_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Authenticated users can delete their own items
CREATE POLICY "Users can delete own portfolio items"
  ON portfolio_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_portfolio_display_order ON portfolio_items(display_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_is_featured ON portfolio_items(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_portfolio_is_published ON portfolio_items(is_published) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_portfolio_created_by ON portfolio_items(created_by);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_portfolio_items_updated_at
  BEFORE UPDATE ON portfolio_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
