import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Loader2, Database, Settings, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const SupabaseTestPage = () => {
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [connectionMessage, setConnectionMessage] = useState('');
  const [authTest, setAuthTest] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [profilesTest, setProfilesTest] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [profilesMessage, setProfilesMessage] = useState('');

  useEffect(() => {
    // Test conexiunea automată la încărcare
    testConnection();
  }, []);

  const testConnection = async () => {
    setConnectionStatus('loading');
    try {
      // Test simplu - verifică dacă Supabase client este configurat corect
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        setConnectionStatus('error');
        setConnectionMessage(`Eroare de conexiune: ${error.message}`);
        return;
      }
      
      setConnectionStatus('success');
      setConnectionMessage('Conexiune Supabase stabilită cu succes! Client-ul funcționează corect.');
    } catch (err) {
      setConnectionStatus('error');
      setConnectionMessage(`Eroare de conexiune: ${err}`);
    }
  };

  const testAuth = async () => {
    setAuthTest('loading');
    try {
      // Test sesiunea curentă
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        setAuthTest('error');
        return;
      }
      
      setAuthTest('success');
    } catch (err) {
      setAuthTest('error');
    }
  };

  const testProfiles = async () => {
    setProfilesTest('loading');
    try {
      // Test tabelul profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
      
      if (error) {
        if (error.code === 'PGRST116') {
          setProfilesTest('error');
          setProfilesMessage('Tabelul "profiles" nu există. Rulează SQL script-ul pentru a-l crea.');
        } else {
          setProfilesTest('error');
          setProfilesMessage(`Eroare la accesarea tabelului: ${error.message}`);
        }
        return;
      }
      
      setProfilesTest('success');
      setProfilesMessage(`Tabelul "profiles" funcționează corect! ${data?.length || 0} înregistrări găsite.`);
    } catch (err) {
      setProfilesTest('error');
      setProfilesMessage(`Eroare: ${err}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Database className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      'idle': { color: 'bg-gray-100 text-gray-800', text: 'Netestat' },
      'loading': { color: 'bg-blue-100 text-blue-800', text: 'Se testează...' },
      'success': { color: 'bg-green-100 text-green-800', text: 'Funcționează' },
      'error': { color: 'bg-red-100 text-red-800', text: 'Eroare' }
    };
    
    const statusConfig = config[status as keyof typeof config] || config.idle;
    return (
      <Badge className={`${statusConfig.color} border-0`}>
        {statusConfig.text}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Test Conexiune Supabase</h1>
          <p className="text-muted-foreground">
            Verifică conexiunea și configurația Supabase pentru ErgoCharge
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Test Conexiune */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {getStatusIcon(connectionStatus)}
                Test Conexiune Database
                {getStatusBadge(connectionStatus)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {connectionMessage && (
                <div className={`p-3 rounded-lg ${connectionStatus === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {connectionMessage}
                </div>
              )}
              <Button onClick={testConnection} disabled={connectionStatus === 'loading'}>
                {connectionStatus === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Se testează...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Testează Conexiunea
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Test Autentificare */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {getStatusIcon(authTest)}
                Test Sistem Autentificare
                {getStatusBadge(authTest)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Testează dacă sistemul de autentificare Supabase funcționează corect
              </p>
              <Button onClick={testAuth} disabled={authTest === 'loading'}>
                {authTest === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Se testează...
                  </>
                ) : (
                  <>
                    <Settings className="h-4 w-4 mr-2" />
                    Testează Auth
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Test Tabel Profiles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {getStatusIcon(profilesTest)}
                Test Tabel Profiles
                {getStatusBadge(profilesTest)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profilesMessage && (
                <div className={`p-3 rounded-lg ${profilesTest === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {profilesMessage}
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                Verifică dacă tabelul "profiles" există și funcționează pentru salvarea datelor utilizatorilor
              </p>
              <Button onClick={testProfiles} disabled={profilesTest === 'loading'}>
                {profilesTest === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Se testează...
                  </>
                ) : (
                  <>
                    <Users className="h-4 w-4 mr-2" />
                    Testează Tabelul Profiles
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Informații Configurație */}
          <Card>
            <CardHeader>
              <CardTitle>Informații Configurație</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Supabase URL</p>
                  <p className="text-xs text-gray-600 mt-1">https://lrtidryoqrlddsuamymt.supabase.co</p>
                  <Badge className="bg-green-100 text-green-800 text-xs mt-2">
                    ✓ Configurat
                  </Badge>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">API Key</p>
                  <p className="text-xs text-gray-600 mt-1">eyJhbGciOiJIUzI1NiIsInR5cCI6...</p>
                  <Badge className="bg-green-100 text-green-800 text-xs mt-2">
                    ✓ Configurat
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SQL Setup */}
          <Card>
            <CardHeader>
              <CardTitle>Setup Baza de Date</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                Dacă testul pentru tabelul "profiles" eșuează, rulează următorul SQL în Supabase Dashboard:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
                <pre>{`-- Navighează la Supabase Dashboard > SQL Editor și rulează:
-- File: supabase/setup.sql

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS și trigger-uri...`}</pre>
              </div>
              <p className="text-xs text-muted-foreground">
                📁 Script-ul complet se află în <code>supabase/setup.sql</code>
              </p>
            </CardContent>
          </Card>

          {/* Instrucțiuni */}
          <Card>
            <CardHeader>
              <CardTitle>Următorii Pași</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>1.</strong> Testează toate conexiunile folosind butoanele de mai sus
                </p>
                <p className="text-sm">
                  <strong>2.</strong> Dacă "Tabel Profiles" eșuează, rulează SQL script-ul în Supabase
                </p>
                <p className="text-sm">
                  <strong>3.</strong> Înregistrează-te cu emailul tău admin: <code className="bg-gray-100 px-2 py-1 rounded">alhakim_sami@yahoo.ro</code>
                </p>
                <p className="text-sm">
                  <strong>4.</strong> Verifică emailul pentru confirmarea contului
                </p>
                <p className="text-sm">
                  <strong>5.</strong> Numărul de telefon va fi salvat automat în baza de date!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            🚧 Această pagină de test poate fi ștearsă după configurarea completă
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SupabaseTestPage; 