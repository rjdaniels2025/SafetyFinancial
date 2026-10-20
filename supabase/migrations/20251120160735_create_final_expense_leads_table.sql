/*
  # Create Final Expense Leads Table

  1. New Tables
    - `final_expense_leads`
      - `id` (uuid, primary key) - Unique identifier for each lead
      - `first_name` (text) - Lead's first name
      - `last_name` (text) - Lead's last name
      - `email` (text) - Contact email address
      - `phone` (text) - Contact phone number
      - `age` (integer) - Lead's age (50-85 range)
      - `coverage_amount` (text) - Desired coverage amount
      - `health_conditions` (text, optional) - Any health conditions mentioned
      - `current_insurance` (text) - Whether they have existing coverage
      - `smoker` (text) - Smoking status
      - `how_soon` (text) - When they want coverage to start
      - `created_at` (timestamptz) - Timestamp of lead submission

  2. Security
    - Enable RLS on `final_expense_leads` table
    - Add policy for service role to manage all records
    - Add policy for authenticated users to insert their own records
*/

CREATE TABLE IF NOT EXISTS final_expense_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  age integer NOT NULL CHECK (age >= 50 AND age <= 85),
  coverage_amount text NOT NULL,
  health_conditions text DEFAULT '',
  current_insurance text NOT NULL,
  smoker text NOT NULL,
  how_soon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE final_expense_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage all final expense leads"
  ON final_expense_leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can insert final expense leads"
  ON final_expense_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
