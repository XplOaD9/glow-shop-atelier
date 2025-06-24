-- =============================================
-- VERIFY AUTH SYSTEM STATUS
-- Run this in Supabase SQL Editor to check everything
-- =============================================

-- 1. CHECK IF PROFILES TABLE EXISTS AND IS CORRECT
-- =============================================

SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position;

-- 2. CHECK IF TRIGGER FUNCTION EXISTS
-- =============================================

SELECT 
  proname as function_name,
  prosrc as function_body
FROM pg_proc 
WHERE proname = 'handle_new_user';

-- 3. CHECK IF TRIGGER EXISTS
-- =============================================

SELECT 
  tgname as trigger_name,
  tgenabled as enabled,
  tgtype as trigger_type
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created';

-- 4. CHECK RLS POLICIES
-- =============================================

SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'profiles';

-- 5. CHECK EXISTING PROFILES
-- =============================================

SELECT 
  COUNT(*) as total_profiles,
  COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_count,
  COUNT(CASE WHEN role = 'user' THEN 1 END) as user_count
FROM profiles;

-- Show all profiles
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM profiles
ORDER BY created_at DESC;

-- 6. CHECK AUTH USERS vs PROFILES
-- =============================================

SELECT 
  'auth.users' as table_name,
  COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
  'profiles' as table_name,
  COUNT(*) as count
FROM profiles;

-- 7. TEST PROFILE CREATION MANUALLY
-- =============================================

-- This simulates what happens when a new user signs up
DO $$
DECLARE
  test_user_id UUID := gen_random_uuid();
  test_email TEXT := 'test-manual-' || extract(epoch from now()) || '@example.com';
BEGIN
  -- Insert test user (simulating auth.users insert)
  INSERT INTO auth.users (
    id, 
    email, 
    encrypted_password, 
    raw_user_meta_data,
    created_at,
    updated_at,
    email_confirmed_at
  ) VALUES (
    test_user_id,
    test_email,
    crypt('testpassword', gen_salt('bf')),
    '{"full_name": "Test Manual User", "phone": "0712345678"}'::jsonb,
    NOW(),
    NOW(),
    NOW()
  );
  
  -- Check if profile was created by trigger
  PERFORM pg_sleep(1); -- Wait 1 second
  
  IF EXISTS (SELECT 1 FROM profiles WHERE id = test_user_id) THEN
    RAISE NOTICE '✅ TRIGGER WORKS: Profile created automatically for test user %', test_email;
  ELSE
    RAISE NOTICE '❌ TRIGGER FAILED: No profile created for test user %', test_email;
  END IF;
  
  -- Clean up test user
  DELETE FROM auth.users WHERE id = test_user_id;
  DELETE FROM profiles WHERE id = test_user_id;
  
  RAISE NOTICE 'Test user cleaned up';
END
$$;

-- =============================================
-- FINAL SYSTEM STATUS
-- =============================================

DO $$
DECLARE
  profile_table_exists BOOLEAN;
  trigger_exists BOOLEAN;
  function_exists BOOLEAN;
  auth_count INTEGER;
  profile_count INTEGER;
BEGIN
  -- Check table exists
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_name = 'profiles'
  ) INTO profile_table_exists;
  
  -- Check trigger exists
  SELECT EXISTS (
    SELECT FROM pg_trigger 
    WHERE tgname = 'on_auth_user_created'
  ) INTO trigger_exists;
  
  -- Check function exists
  SELECT EXISTS (
    SELECT FROM pg_proc 
    WHERE proname = 'handle_new_user'
  ) INTO function_exists;
  
  -- Get counts
  SELECT COUNT(*) INTO auth_count FROM auth.users;
  SELECT COUNT(*) INTO profile_count FROM profiles;
  
  RAISE NOTICE '';
  RAISE NOTICE '=== 📊 AUTH SYSTEM STATUS ===';
  RAISE NOTICE '';
  
  IF profile_table_exists THEN
    RAISE NOTICE '✅ Profiles table: EXISTS';
  ELSE
    RAISE NOTICE '❌ Profiles table: MISSING';
  END IF;
  
  IF function_exists THEN
    RAISE NOTICE '✅ Trigger function: EXISTS';
  ELSE
    RAISE NOTICE '❌ Trigger function: MISSING';
  END IF;
  
  IF trigger_exists THEN
    RAISE NOTICE '✅ Auto-profile trigger: EXISTS';
  ELSE
    RAISE NOTICE '❌ Auto-profile trigger: MISSING';
  END IF;
  
  RAISE NOTICE '📊 Auth users: %', auth_count;
  RAISE NOTICE '📊 Profiles: %', profile_count;
  
  RAISE NOTICE '';
  
  IF profile_table_exists AND function_exists AND trigger_exists THEN
    RAISE NOTICE '🎉 SYSTEM STATUS: READY FOR SIGNUP!';
    RAISE NOTICE '✅ New users should be able to register successfully';
  ELSE
    RAISE NOTICE '❌ SYSTEM STATUS: NEEDS FIXING';
    RAISE NOTICE '⚠️ Run FIX_AUTH_SETUP.sql again';
  END IF;
  
  RAISE NOTICE '';
END
$$; 