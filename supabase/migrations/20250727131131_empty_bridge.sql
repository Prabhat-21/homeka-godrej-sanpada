/*
  # Update RLS policies for customers table

  1. Security Updates
    - Add policy for anonymous users to insert customer records
    - Add policy for anonymous users to update customer records
    - Keep existing authenticated user policies
  
  This allows the contact forms to work for anonymous website visitors
  while maintaining security for authenticated admin access.
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Users can read own data" ON customers;
DROP POLICY IF EXISTS "Authenticated users can manage customers" ON customers;
DROP POLICY IF EXISTS "Service role can manage all customers" ON customers;

-- Allow anonymous users to insert customer records (for contact forms)
CREATE POLICY "Anonymous users can insert customers"
  ON customers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to update customer records (for contact forms)
CREATE POLICY "Anonymous users can update customers"
  ON customers
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to read all customer records
CREATE POLICY "Authenticated users can read customers"
  ON customers
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to manage all customer records
CREATE POLICY "Authenticated users can manage customers"
  ON customers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow service role to manage all customer records
CREATE POLICY "Service role can manage all customers"
  ON customers
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);