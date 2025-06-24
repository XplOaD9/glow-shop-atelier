-- =============================================
-- FIX AUTH SYSTEM - PROFILES TABLE & TRIGGERS
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. CREATE PROFILES TABLE (if not exists)
-- =============================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);

-- 2. CREATE TRIGGER FUNCTION FOR AUTO PROFILE CREATION
-- =============================================

CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT := 'user';
BEGIN
  -- Check if this is an admin email
  IF NEW.email = 'alhakim_sami@yahoo.ro' THEN
    user_role := 'admin';
  END IF;

  -- Insert the new profile
  INSERT INTO profiles (
    id, 
    email, 
    full_name, 
    phone, 
    role
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.raw_user_meta_data->>'phone',
    user_role
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. CREATE TRIGGER (drop and recreate to ensure it works)
-- =============================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 4. CREATE UPDATE TIMESTAMP TRIGGER
-- =============================================

CREATE OR REPLACE FUNCTION handle_updated_at() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_profiles_updated ON profiles;

CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- 5. ENABLE RLS ON PROFILES
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Anyone can insert profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create new policies
CREATE POLICY "Users can view own profile" 
ON profiles 
FOR SELECT 
USING (
  auth.uid() = id OR
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid() 
    AND p.role = 'admin'
  )
);

CREATE POLICY "Users can update own profile" 
ON profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Anyone can insert profile" 
ON profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- 6. TEST PROFILE CREATION
-- =============================================

-- Check if we can query profiles
SELECT COUNT(*) as profile_count FROM profiles;

-- Check if trigger function exists
SELECT proname FROM pg_proc WHERE proname = 'handle_new_user';

-- Check if trigger exists
SELECT tgname FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- 7. FIX EXISTING USERS WITHOUT PROFILES
-- =============================================

-- Create profiles for any existing auth users that don't have profiles
INSERT INTO profiles (id, email, full_name, role)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', 'User') as full_name,
  CASE 
    WHEN au.email = 'alhakim_sami@yahoo.ro' THEN 'admin'
    ELSE 'user'
  END as role
FROM auth.users au
LEFT JOIN profiles p ON p.id = au.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- 8. VERIFY EVERYTHING WORKS
-- =============================================

-- Show all profiles
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM profiles
ORDER BY created_at DESC;

-- Show auth users count vs profiles count
SELECT 
  (SELECT COUNT(*) FROM auth.users) as auth_users_count,
  (SELECT COUNT(*) FROM profiles) as profiles_count;

-- =============================================
-- SUCCESS MESSAGE
-- =============================================

DO $$
BEGIN
  RAISE NOTICE '🎉 AUTH SYSTEM FIXED SUCCESSFULLY!';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Profiles table created/verified';
  RAISE NOTICE '✅ Auto-profile creation trigger installed';
  RAISE NOTICE '✅ RLS policies configured';
  RAISE NOTICE '✅ Existing users migrated to profiles';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 You can now create new accounts!';
  RAISE NOTICE '👑 alhakim_sami@yahoo.ro will be auto-assigned admin role';
END
$$; 