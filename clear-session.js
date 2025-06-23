// Clear all session data - Emergency reset script
// Run this in browser console if app is stuck

(function clearAllSessionData() {
  console.log('🗑️ Emergency session clearing started...');
  
  try {
    // Clear localStorage
    localStorage.clear();
    console.log('✅ localStorage cleared');
    
    // Clear sessionStorage
    sessionStorage.clear();
    console.log('✅ sessionStorage cleared');
    
    // Clear indexedDB (Supabase uses this)
    if (window.indexedDB) {
      indexedDB.databases().then(databases => {
        databases.forEach(db => {
          if (db.name && db.name.includes('supabase')) {
            indexedDB.deleteDatabase(db.name);
            console.log('✅ IndexedDB cleared:', db.name);
          }
        });
      }).catch(console.error);
    }
    
    // Clear cookies for this domain
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    console.log('✅ Cookies cleared');
    
    console.log('🎉 Emergency session clear completed!');
    console.log('🔄 Reloading page in 2 seconds...');
    
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    
  } catch (error) {
    console.error('❌ Error during emergency clear:', error);
    console.log('🔄 Force reloading anyway...');
    window.location.reload();
  }
})(); 