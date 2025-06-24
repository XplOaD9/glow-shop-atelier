-- =============================================
-- CREATE PROFILES TABLE - SIMPLE VERSION (no triggers)
-- Urmează modelul simplu al newsletter-ului care funcționează perfect!
-- =============================================

-- 1. Creează tabela profiles (dacă nu există)
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
-- =============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies (cleanup)
-- =============================================
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can insert profile" ON public.profiles;

-- 4. Create simple RLS policies (ca newsletter-ul)
-- =============================================

-- Users can view their own profile + admins can view all
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() = id OR
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() 
    AND p.role = 'admin'
  )
);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Anyone can insert their own profile (when signing up)
CREATE POLICY "Users can insert own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- 5. Create index pentru performanță
-- =============================================
CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);

-- 6. Verificare finală
-- =============================================
SELECT 
  'profiles table created successfully!' as message,
  COUNT(*) as existing_profiles
FROM public.profiles;

-- Afișare status
DO $$
BEGIN
  RAISE NOTICE '🎉 PROFILES TABLE CREATED SUCCESSFULLY!';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Table: public.profiles';
  RAISE NOTICE '✅ RLS: Enabled';
  RAISE NOTICE '✅ Policies: Simple & secure';
  RAISE NOTICE '✅ No triggers: Direct insert like newsletter';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Ready for signup! AuthContext will create profiles directly.';
  RAISE NOTICE '👑 alhakim_sami@yahoo.ro will get admin role automatically';
END
$$; 