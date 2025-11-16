/*
  # Create Supporters Table for American 300 Crowdfunding

  1. New Tables
    - `supporters`
      - `id` (uuid, primary key)
      - `name` (text) - Supporter's name
      - `email` (text) - Supporter's email
      - `amount` (numeric) - Contribution amount
      - `message` (text, optional) - Support message
      - `payment_method` (text) - cashapp, venmo, or zelle
      - `created_at` (timestamptz) - Timestamp of contribution
  
  2. Security
    - Enable RLS on `supporters` table
    - Add policy for public to insert (pledge contributions)
    - Add policy for public to read supporters list
    
  3. Notes
    - This is a simple crowdfunding table to track supporters
    - Public insert allows anyone to pledge support
    - Email and payment info stored for follow-up
*/

CREATE TABLE IF NOT EXISTS supporters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  message text,
  payment_method text NOT NULL CHECK (payment_method IN ('cashapp', 'venmo', 'zelle')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE supporters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can pledge support"
  ON supporters
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view supporters"
  ON supporters
  FOR SELECT
  TO anon, authenticated
  USING (true);