/*
  # GetALife.AI Database Schema

  ## Overview
  This migration creates the complete database schema for the GetALife.AI application,
  a location discovery platform with AI-powered recommendations, user preferences,
  and subscription management.

  ## New Tables

  ### 1. `profiles`
  User profile information linked to auth.users
  - `id` (uuid, primary key) - References auth.users
  - `email` (text) - User email
  - `full_name` (text, optional) - User's full name
  - `subscription_tier` (text) - 'free' or 'premium'
  - `subscription_expires_at` (timestamptz, optional) - Premium expiration date
  - `searches_used_today` (integer) - Daily search counter for free tier
  - `last_search_reset` (date) - Date of last counter reset
  - `created_at` (timestamptz) - Profile creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `user_preferences`
  Stores user likes and dislikes for personalization
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - References profiles
  - `preference_type` (text) - 'like' or 'dislike'
  - `category` (text) - Type of preference (cuisine, activity, venue_type, etc.)
  - `value` (text) - The specific preference value
  - `created_at` (timestamptz) - When preference was added

  ### 3. `searches`
  Records of all user searches and their parameters
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - References profiles
  - `search_type` (text) - 'free' or 'paid'
  - `query_text` (text) - Original search query
  - `parameters` (jsonb) - Search parameters (budget, party_size, preferences, etc.)
  - `results` (jsonb) - AI-generated recommendations
  - `created_at` (timestamptz) - Search timestamp

  ### 4. `saved_searches`
  User's saved search configurations (premium feature)
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - References profiles
  - `name` (text) - User-friendly name for the saved search
  - `parameters` (jsonb) - Search configuration
  - `created_at` (timestamptz) - When saved
  - `updated_at` (timestamptz) - Last modification

  ### 5. `place_feedback`
  User feedback on recommended places
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - References profiles
  - `search_id` (uuid, foreign key) - References searches
  - `place_name` (text) - Name of the place
  - `place_data` (jsonb) - Details about the place
  - `feedback_type` (text) - 'positive' or 'negative'
  - `notes` (text, optional) - User notes
  - `created_at` (timestamptz) - Feedback timestamp

  ### 6. `payment_transactions`
  Records of all payment transactions
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - References profiles
  - `transaction_type` (text) - 'search' or 'subscription'
  - `amount` (decimal) - Transaction amount in USD
  - `status` (text) - 'pending', 'completed', 'failed'
  - `stripe_payment_id` (text, optional) - Stripe payment reference
  - `created_at` (timestamptz) - Transaction timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Users can only access their own data
  - Authentication required for all operations
  - Policies restrict access based on auth.uid()

  ## Indexes
  - Optimized queries for user_id lookups
  - Search history retrieval
  - Preference filtering
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  subscription_tier text NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  subscription_expires_at timestamptz,
  searches_used_today integer NOT NULL DEFAULT 0,
  last_search_reset date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  preference_type text NOT NULL CHECK (preference_type IN ('like', 'dislike')),
  category text NOT NULL,
  value text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, category, value, preference_type)
);

-- Create searches table
CREATE TABLE IF NOT EXISTS searches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  search_type text NOT NULL CHECK (search_type IN ('free', 'paid')),
  query_text text,
  parameters jsonb NOT NULL DEFAULT '{}'::jsonb,
  results jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create saved_searches table
CREATE TABLE IF NOT EXISTS saved_searches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  parameters jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create place_feedback table
CREATE TABLE IF NOT EXISTS place_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  search_id uuid REFERENCES searches(id) ON DELETE SET NULL,
  place_name text NOT NULL,
  place_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  feedback_type text NOT NULL CHECK (feedback_type IN ('positive', 'negative')),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create payment_transactions table
CREATE TABLE IF NOT EXISTS payment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('search', 'subscription')),
  amount decimal(10, 2) NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  stripe_payment_id text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_searches_user_id ON searches(user_id);
CREATE INDEX IF NOT EXISTS idx_searches_created_at ON searches(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_searches_user_id ON saved_searches(user_id);
CREATE INDEX IF NOT EXISTS idx_place_feedback_user_id ON place_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_user_id ON payment_transactions(user_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE place_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- User preferences policies
CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own preferences"
  ON user_preferences FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Searches policies
CREATE POLICY "Users can view own searches"
  ON searches FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own searches"
  ON searches FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Saved searches policies
CREATE POLICY "Users can view own saved searches"
  ON saved_searches FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved searches"
  ON saved_searches FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved searches"
  ON saved_searches FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved searches"
  ON saved_searches FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Place feedback policies
CREATE POLICY "Users can view own feedback"
  ON place_feedback FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own feedback"
  ON place_feedback FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own feedback"
  ON place_feedback FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own feedback"
  ON place_feedback FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Payment transactions policies
CREATE POLICY "Users can view own transactions"
  ON payment_transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON payment_transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile automatically
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to reset daily search counter
CREATE OR REPLACE FUNCTION public.reset_daily_searches()
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET searches_used_today = 0,
      last_search_reset = CURRENT_DATE
  WHERE last_search_reset < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;