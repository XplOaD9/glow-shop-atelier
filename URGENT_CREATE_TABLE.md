# 🚨 URGENT: Creează Tabela Newsletter

## Problema:
Newsletter-ul se blochează la "Attempting to subscribe" pentru că tabela `newsletter_subscribers` nu există în Supabase.

## Soluția Rapidă:

### 📋 Pasul 1: Mergi în Supabase
1. Deschide https://supabase.com/dashboard
2. Selectează proiectul tău ErgoCharge
3. Click pe "SQL Editor" din sidebar

### 📋 Pasul 2: Rulează acest SQL
```sql
-- Create newsletter table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe
CREATE POLICY "Anyone can subscribe to newsletter" 
ON newsletter_subscribers FOR INSERT 
WITH CHECK (true);

-- Allow reading subscriptions
CREATE POLICY "Anyone can read subscriptions" 
ON newsletter_subscribers FOR SELECT 
USING (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
```

### 📋 Pasul 3: Testează
1. Click "Run" în SQL Editor
2. Ar trebui să vezi "Success. No rows returned"
3. Încearcă din nou newsletter-ul pe site

### 🔍 Verifică dacă a funcționat:
```sql
-- Test query
SELECT * FROM newsletter_subscribers;
```

Dacă vezi o tabelă goală (nu eroare), perfect! ✅

## 🎯 Alternativă Rapidă:
Dacă nu ai acces la Supabase Dashboard, deschide `TEST_NEWSLETTER.html` și:
1. Click pe "Check Table" 
2. Dacă vezi eroare, tabela nu există
3. Încearcă să introduci un email și click "Test Subscribe" 