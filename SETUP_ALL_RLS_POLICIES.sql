-- =============================================
-- SETUP ALL RLS POLICIES FOR ERGOCHARGE APP
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. NEWSLETTER_SUBSCRIBERS TABLE
-- =============================================

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (if any)
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can insert newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can select newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can manage newsletter" ON newsletter_subscribers;

-- Create new policies
CREATE POLICY "Anyone can insert newsletter" 
ON newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can select newsletter" 
ON newsletter_subscribers 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can update newsletter" 
ON newsletter_subscribers 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can delete newsletter" 
ON newsletter_subscribers 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- 2. ORDERS TABLE
-- =============================================

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (if any)
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can create orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;

-- Create new policies
CREATE POLICY "Users can view own orders" 
ON orders 
FOR SELECT 
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Anyone can create orders" 
ON orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update orders" 
ON orders 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can delete orders" 
ON orders 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- 3. ORDER_ITEMS TABLE
-- =============================================

-- Enable RLS
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (if any)
DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
DROP POLICY IF EXISTS "Users can create order items" ON order_items;
DROP POLICY IF EXISTS "Admins can manage order items" ON order_items;

-- Create new policies
CREATE POLICY "Users can view own order items" 
ON order_items 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND (orders.user_id = auth.uid() OR
         EXISTS (
           SELECT 1 FROM profiles 
           WHERE profiles.id = auth.uid() 
           AND profiles.role = 'admin'
         ))
  )
);

CREATE POLICY "Anyone can create order items" 
ON order_items 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update order items" 
ON order_items 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can delete order items" 
ON order_items 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- 4. USERS/PROFILES TABLE (if it exists)
-- =============================================

-- Enable RLS (if profiles table exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'profiles') THEN
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    
    -- Drop existing policies
    DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
    DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
    
    -- Create new policies
    EXECUTE 'CREATE POLICY "Users can view own profile" 
    ON profiles 
    FOR SELECT 
    USING (
      auth.uid() = id OR
      EXISTS (
        SELECT 1 FROM profiles p
        WHERE p.id = auth.uid() 
        AND p.role = ''admin''
      )
    )';
    
    EXECUTE 'CREATE POLICY "Users can update own profile" 
    ON profiles 
    FOR UPDATE 
    USING (auth.uid() = id)';
    
    EXECUTE 'CREATE POLICY "Anyone can insert profile" 
    ON profiles 
    FOR INSERT 
    WITH CHECK (auth.uid() = id)';
    
    RAISE NOTICE 'Profiles table policies created successfully';
  ELSE
    RAISE NOTICE 'Profiles table does not exist, skipping...';
  END IF;
END
$$;

-- Enable RLS on users table (if it exists separately)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') THEN
    ALTER TABLE users ENABLE ROW LEVEL SECURITY;
    
    -- Drop existing policies
    DROP POLICY IF EXISTS "Users can view own data" ON users;
    DROP POLICY IF EXISTS "Admins can view all users" ON users;
    
    -- Create new policies
    EXECUTE 'CREATE POLICY "Users can view own data" 
    ON users 
    FOR SELECT 
    USING (
      auth.uid()::text = id::text OR
      EXISTS (
        SELECT 1 FROM profiles p
        WHERE p.id = auth.uid() 
        AND p.role = ''admin''
      )
    )';
    
    EXECUTE 'CREATE POLICY "Users can update own data" 
    ON users 
    FOR UPDATE 
    USING (auth.uid()::text = id::text)';
    
    RAISE NOTICE 'Users table policies created successfully';
  ELSE
    RAISE NOTICE 'Users table does not exist, skipping...';
  END IF;
END
$$;

-- =============================================
-- TEST ALL POLICIES
-- =============================================

-- Test newsletter subscription (should work for everyone)
INSERT INTO newsletter_subscribers (email, full_name, status) 
VALUES ('policy-test@example.com', 'Policy Test User', 'active')
ON CONFLICT (email) DO NOTHING;

-- Test order creation (should work for everyone)
-- Note: You'll need to be logged in to test user-specific policies

-- Check if policies are applied correctly
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename IN ('newsletter_subscribers', 'orders', 'order_items', 'profiles', 'users')
ORDER BY tablename, policyname;

-- =============================================
-- SUCCESS MESSAGE
-- =============================================

DO $$
BEGIN
  RAISE NOTICE '🎉 ALL RLS POLICIES HAVE BEEN SUCCESSFULLY CREATED!';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Newsletter: Anyone can subscribe/view, admins can manage';
  RAISE NOTICE '✅ Orders: Users see own orders, admins see all';
  RAISE NOTICE '✅ Order Items: Users see own items, admins manage all';
  RAISE NOTICE '✅ Profiles/Users: Users see own data, admins see all';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Your app should now work perfectly!';
END
$$; 