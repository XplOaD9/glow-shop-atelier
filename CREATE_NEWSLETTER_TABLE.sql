-- =============================================
-- SIMPLE NEWSLETTER TABLE CREATION
-- Copy and paste this into Supabase SQL Editor
-- =============================================

-- 1. Create newsletter table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 3. Create policies (anyone can subscribe)
CREATE POLICY "Anyone can subscribe to newsletter" 
ON newsletter_subscribers FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can read their own subscription" 
ON newsletter_subscribers FOR SELECT 
USING (true);

-- 4. Create index for performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- 5. Test the table (optional - uncomment to test)
-- INSERT INTO newsletter_subscribers (email, full_name) VALUES ('test@example.com', 'Test User');
-- SELECT * FROM newsletter_subscribers;

-- =============================================
-- If you see no errors, the table is ready! 🎉
-- ============================================= 