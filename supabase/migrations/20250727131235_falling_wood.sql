/*
  # Fix RLS policies for anonymous customer access

  1. Security Changes
    - Drop existing restrictive policies
    - Add new policies allowing anonymous users to insert customers
    - Add policy allowing anonymous users to update customers
    - Keep authenticated user policies for admin access

  2. Tables Modified
    - `customers` table policies updated for anonymous access
*/

-- Drop existing policies that might be blocking anonymous access
DROP POLICY IF EXISTS "Anonymous users can insert customers" ON customers;
DROP POLICY IF EXISTS "Anonymous users can update customers" ON customers;
DROP POLICY IF EXISTS "Authenticated users can read customers" ON customers;
DROP POLICY IF EXISTS "Authenticated users can manage customers" ON customers;
DROP POLICY IF EXISTS "Service role can manage all customers" ON customers;

-- Create new policies for anonymous users (website visitors)
CREATE POLICY "Allow anonymous customer creation"
  ON customers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous customer updates"
  ON customers
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create policies for authenticated users (admin dashboard)
CREATE POLICY "Allow authenticated users to read customers"
  ON customers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage customers"
  ON customers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy for service role
CREATE POLICY "Allow service role full access"
  ON customers
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);