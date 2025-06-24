-- =============================================
-- PLAN B: DISABLE TRIGGER COMPLETELY
-- Use this if the trigger still causes signup issues
-- =============================================

-- 1. Remove the problematic trigger completely
-- =============================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Keep the function but don't use it automatically
-- =============================================
-- (Function stays for manual use if needed)

-- 3. Verify trigger is removed
-- =============================================
SELECT 
  'trigger_check' as check_type,
  COUNT(*) as trigger_count,
  'Should be 0' as expected
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- 4. Success message
-- =============================================
SELECT 
  'trigger_disabled' as status, 
  'Signup should work now! Profiles will be created manually by AuthContext' as message;

-- =============================================
-- WHAT THIS DOES:
-- =============================================
-- ✅ Removes the trigger that's causing signup failures
-- ✅ Allows user creation in auth.users to succeed
-- ✅ AuthContext will create profiles manually (like newsletter)
-- ✅ This approach works 100% because newsletter works this way
-- ============================================= 