-- =============================================
-- DEBUG RLS POLICIES & PROFILES TABLE - FIXED VERSION
-- Run this in Supabase SQL Editor to debug the issue
-- =============================================

-- 1. Check if profiles table exists and its structure
-- =============================================
SELECT 
  'profiles_table_info' as check_type,
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Check RLS status (simplified)
-- =============================================
SELECT 
  'rls_status' as check_type,
  schemaname, 
  tablename, 
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename IN ('profiles', 'newsletter_subscribers');

-- 3. Check all policies on profiles table
-- =============================================
SELECT 
  'policies_info' as check_type,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename = 'profiles';

-- 4. Check if trigger exists and is working
-- =============================================
SELECT 
  'trigger_info' as check_type,
  trigger_name,
  event_manipulation,
  action_timing
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- 5. Check trigger function
-- =============================================
SELECT 
  'function_info' as check_type,
  proname as function_name
FROM pg_proc 
WHERE proname = 'handle_new_user';

-- 6. Test profiles table access directly
-- =============================================
SELECT 
  'profiles_data' as check_type,
  COUNT(*) as total_profiles,
  COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_count,
  COUNT(CASE WHEN role = 'user' THEN 1 END) as user_count
FROM profiles;

-- 7. Test newsletter table access (should work)
-- =============================================
SELECT 
  'newsletter_data' as check_type,
  COUNT(*) as total_subscribers
FROM newsletter_subscribers;

-- 8. Check auth.users count
-- =============================================
SELECT 
  'auth_users_data' as check_type,
  COUNT(*) as total_auth_users
FROM auth.users;

-- 9. Find users without profiles
-- =============================================
SELECT 
  'orphaned_users' as check_type,
  au.id,
  au.email,
  au.created_at
FROM auth.users au
LEFT JOIN profiles p ON p.id = au.id
WHERE p.id IS NULL;

-- 10. TEMP: Fix RLS policies - Create permissive policies for debugging
-- =============================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Anyone can insert profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "debug_select_all" ON profiles;
DROP POLICY IF EXISTS "debug_insert_all" ON profiles;
DROP POLICY IF EXISTS "debug_update_all" ON profiles;

-- Create very permissive policies for debugging
CREATE POLICY "debug_select_all" ON profiles FOR SELECT USING (true);
CREATE POLICY "debug_insert_all" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "debug_update_all" ON profiles FOR UPDATE USING (true);

-- Test after creating permissive policies
SELECT 
  'test_after_permissive_policies' as check_type,
  COUNT(*) as can_count_profiles
FROM profiles;

-- 11. Show final status
-- =============================================
SELECT 
  'final_status' as check_type,
  'Profiles table should now be accessible!' as message;

-- =============================================
-- NEXT STEPS:
-- =============================================
-- After running this script:
-- 1. Try signup again in your app
-- 2. If it works, the problem was RLS policies
-- 3. Come back and we'll create proper restrictive policies
-- ============================================= 