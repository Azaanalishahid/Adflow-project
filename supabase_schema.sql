-- SUPABASE SQL SCHEMA FOR ADFLOW PRO

-- 1. Create the 'users' table
-- This table links to the built-in Supabase auth.users table securely.
CREATE TABLE public.users (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
  name text,
  email text UNIQUE NOT NULL,
  role text DEFAULT 'user'::text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: In a production Supabase app, you typically use a Supabase Function/Trigger 
-- to automatically insert a row in public.users when a user signs up. 
-- In our current React app logic (Register.tsx), our frontend attempts to do this manually.

-- 2. Create the 'ads' table
-- This holds the generated classified listings.
CREATE TABLE public.ads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  city text NOT NULL,
  price numeric NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  status text DEFAULT 'pending'::text,
  package text DEFAULT 'basic'::text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) Configuration
-- ==========================================
-- Ensure tables are capable of basic security

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;

-- Allow public read access to 'users' and 'ads' tables
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.users FOR SELECT USING (true);

CREATE POLICY "Public ads are viewable by everyone." 
ON public.ads FOR SELECT USING (true);

-- Allow authenticated users to insert their own ads
CREATE POLICY "Users can create ads." 
ON public.ads FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to insert their own profile data (during Register)
CREATE POLICY "Users can insert their own profile." 
ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow authenticated users to update their own ads
CREATE POLICY "Users can update own ads." 
ON public.ads FOR UPDATE USING (auth.uid() = user_id);
