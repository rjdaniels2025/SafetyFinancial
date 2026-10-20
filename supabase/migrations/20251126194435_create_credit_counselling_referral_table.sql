/*
  # Create Credit Counselling Referral Table

  1. New Tables
    - `credit_counselling_referrals`
      - `id` (uuid, primary key) - Unique identifier for each referral
      - `name` (text) - Full name of the person requesting referral
      - `email` (text) - Contact email address
      - `phone` (text) - Contact phone number
      - `total_debt` (text) - Estimated total debt amount range
      - `debt_types` (text[]) - Array of debt types (credit cards, loans, collections, etc.)
      - `monthly_income` (text) - Monthly income range
      - `notes` (text, optional) - Any additional information
      - `created_at` (timestamptz) - Timestamp of referral request

  2. Security
    - Enable RLS on `credit_counselling_referrals` table
    - Add policy for anonymous users to insert referrals
    - Add policy for service role to manage all records
*/

CREATE TABLE IF NOT EXISTS credit_counselling_referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  total_debt text NOT NULL,
  debt_types text[] NOT NULL DEFAULT '{}',
  monthly_income text NOT NULL,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE credit_counselling_referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit credit counselling referrals"
  ON credit_counselling_referrals
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can manage all credit counselling referrals"
  ON credit_counselling_referrals
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read credit counselling referrals"
  ON credit_counselling_referrals
  FOR SELECT
  TO authenticated
  USING (true);
