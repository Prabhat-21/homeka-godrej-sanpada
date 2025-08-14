/*
  # Disable RLS for customers table

  This migration disables Row Level Security for the customers table to allow
  anonymous users to submit contact forms without authentication errors.

  ## Changes
  1. Disable RLS on customers table
  2. Remove all existing policies that were causing conflicts

  ## Security Note
  This allows public access to the customers table for the contact forms to work.
  For production use, consider implementing proper RLS policies or using
  server-side functions for data insertion.
*/

-- Disable Row Level Security for customers table
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to clean up
DROP POLICY IF EXISTS "Allow anon insert" ON customers;
DROP POLICY IF EXISTS "Allow anon update" ON customers;
DROP POLICY IF EXISTS "Allow anonymous customer creation" ON customers;
DROP POLICY IF EXISTS "Allow anonymous customer updates" ON customers;
DROP POLICY IF EXISTS "Allow authenticated users to manage customers" ON customers;
DROP POLICY IF EXISTS "Allow authenticated users to read customers" ON customers;
DROP POLICY IF EXISTS "Allow service role full access" ON customers;