// Quick test to verify Supabase connection
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://lrtidryoqrlddsuamymt.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxydGlkcnlvcXJsZGRzdWFteW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NjgyNDUsImV4cCI6MjA2NTE0NDI0NX0.vSpl0FrPaZBA0sahFd9daC5LYIKlOrN3XTUT8B4mtO0";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testConnection() {
  console.log('🔄 Testing Supabase connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Error:', error);
      if (error.message.includes('does not exist')) {
        console.log('🚨 Table newsletter_subscribers does not exist!');
        console.log('👉 Run the SQL from URGENT_CREATE_TABLE.md');
      }
    } else {
      console.log('✅ Table exists and accessible');
      console.log('📊 Data:', data);
    }
  } catch (err) {
    console.error('💥 Connection error:', err);
  }
}

testConnection(); 