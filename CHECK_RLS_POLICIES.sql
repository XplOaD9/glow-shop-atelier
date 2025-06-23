-- =============================================
-- CHECK AND FIX RLS POLICIES FOR NEWSLETTER
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'newsletter_subscribers';

-- 2. Check existing policies
SELECT * FROM pg_policies WHERE tablename = 'newsletter_subscribers';

-- 3. Drop existing policies (if any)
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can read subscriptions" ON newsletter_subscribers;

-- 4. Create correct policies
CREATE POLICY "Anyone can insert newsletter" 
ON newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can select newsletter" 
ON newsletter_subscribers 
FOR SELECT 
USING (true);

-- 5. Test insert (should work)
INSERT INTO newsletter_subscribers (email, full_name, status) 
VALUES ('test@example.com', 'Test User', 'active')
ON CONFLICT (email) DO NOTHING;

-- 6. Test select (should work)
SELECT * FROM newsletter_subscribers WHERE email = 'test@example.com';

-- =============================================
-- If you see the test data, everything works! ✅
-- ============================================= 