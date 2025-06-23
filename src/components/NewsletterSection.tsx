import { useState } from 'react';
// import { Mail, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

// const NewsletterSection = () => {
//   const [email, setEmail] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!email || isLoading) return;

//     console.log('🔄 Starting newsletter subscription...');
//     setIsLoading(true);
//     setStatus('idle');
//     setMessage('');

//     try {
//       // Validate email
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(email)) {
//         throw new Error('Te rog introdu o adresă de email validă');
//       }

//       console.log('📧 Attempting to subscribe:', email);

//       // Check if already subscribed
//       console.log('🔍 Checking for existing subscription...');
//       console.log('🌐 Making Supabase query to newsletter_subscribers...');
      
//       const { data: existing, error: selectError } = await supabase
//         .from('newsletter_subscribers')
//         .select('id, status')
//         .eq('email', email.toLowerCase())
//         .maybeSingle();

//       console.log('📊 Query completed - Raw response:', { existing, selectError });

//       if (selectError) {
//         console.error('❌ Database error during check:', selectError);
//         console.error('📝 Error code:', selectError.code);
//         console.error('📝 Error message:', selectError.message);
//         console.error('📝 Error details:', selectError.details);
//         console.error('📝 Full error object:', JSON.stringify(selectError, null, 2));
        
//         // If table doesn't exist, show helpful error
//         if (selectError.message.includes('does not exist') || 
//             selectError.message.includes('relation') || 
//             selectError.code === 'PGRST116' ||
//             selectError.code === '42P01') {
//           console.log('🚨 Table newsletter_subscribers does not exist!');
//           throw new Error('❌ Tabela newsletter nu există! Rulează SQL-ul din URGENT_CREATE_TABLE.md');
//         }
        
//         // If permission error
//         if (selectError.code === 'PGRST301' || selectError.message.includes('permission')) {
//           console.log('🔒 Permission error - RLS policy issue');
//           throw new Error('❌ Eroare de permisiuni! Rulează SQL-ul din CHECK_RLS_POLICIES.sql');
//         }
        
//         throw new Error(`Eroare de bază de date: ${selectError.message} (Code: ${selectError.code})`);
//       }

//       console.log('✅ Query successful, checking results...');

//       if (existing && existing.status === 'active') {
//         console.log('⚠️ Email already subscribed:', existing);
//         setStatus('error');
//         setMessage('Acest email este deja abonat la newsletter-ul nostru!');
//         setIsLoading(false);
//         return;
//       }

//       // If exists but unsubscribed, reactivate
//       if (existing && existing.status === 'unsubscribed') {
//         console.log('🔄 Reactivating subscription for existing user:', existing);
        
//         const { data: updateResult, error: updateError } = await supabase
//           .from('newsletter_subscribers')
//           .update({ 
//             status: 'active' as const,
//             full_name: fullName || null
//           })
//           .eq('id', existing.id)
//           .select();

//         console.log('📊 Update result:', { updateResult, updateError });

//         if (updateError) {
//           console.error('❌ Reactivation error:', updateError);
//           throw new Error(`Eroare la reactivare: ${updateError.message}`);
//         }

//         console.log('✅ Subscription reactivated successfully');
//         setStatus('success');
//         setMessage('Abonarea ta a fost reactivată cu succes!');
//       } else {
//         // Create new subscription
//         console.log('➕ Creating new subscription for:', email);
//         const subscriptionData = {
//           email: email.toLowerCase(),
//           full_name: fullName || null,
//           status: 'active' as const
//         };
        
//         console.log('📝 Subscription data to insert:', subscriptionData);

//         const { data: insertResult, error: insertError } = await supabase
//           .from('newsletter_subscribers')
//           .insert(subscriptionData)
//           .select();

//         console.log('📊 Insert result:', { insertResult, insertError });

//         if (insertError) {
//           console.error('❌ Insert error:', insertError);
//           console.error('📝 Insert error code:', insertError.code);
//           console.error('📝 Insert error message:', insertError.message);
//           console.error('📝 Insert error details:', insertError.details);
          
//           if (insertError.code === 'PGRST301') {
//             throw new Error('❌ Eroare de permisiuni la inserare! Verifică politicile RLS.');
//           }
          
//           throw new Error(`Eroare la creare: ${insertError.message} (Code: ${insertError.code})`);
//         }

//         console.log('✅ New subscription created successfully:', insertResult);
//         setStatus('success');
//         setMessage('Te-ai abonat cu succes la newsletter-ul ErgoCharge!');
//       }

//       // Clear form on success
//       setEmail('');
//       setFullName('');

//     } catch (error) {
//       console.error('💥 Newsletter subscription error:', error);
//       setStatus('error');
//       setMessage(error instanceof Error ? error.message : 'A apărut o eroare neașteptată');
//     } finally {
//       setIsLoading(false);
//       console.log('🔄 Newsletter subscription process completed');
//     }
//   };

//   // Reset status after 5 seconds
//   const resetStatus = () => {
//     setTimeout(() => {
//       if (status !== 'idle') {
//         setStatus('idle');
//         setMessage('');
//       }
//     }, 5000);
//   };

//   if (status === 'success' || status === 'error') {
//     resetStatus();
//   }

//   return (
//     <section className="relative py-12 overflow-hidden">
//       {/* Background simplificat pentru MVP */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-slate-900 dark:to-indigo-900">
//         <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
//       </div>
      
//       <div className="relative z-10 container mx-auto px-4">
//         <div className="max-w-2xl mx-auto">
//           <Card className="border border-primary/20 shadow-lg bg-background/80 backdrop-blur-md">
//             <CardContent className="p-8 text-center space-y-6">
//               {/* Icon */}
//               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
//                 {status === 'success' ? (
//                   <CheckCircle className="w-8 h-8 text-green-600" />
//                 ) : status === 'error' ? (
//                   <AlertCircle className="w-8 h-8 text-red-600" />
//                 ) : (
//                   <Mail className="w-8 h-8 text-primary" />
//                 )}
//               </div>
              
//               {/* Heading */}
//               <div className="space-y-3">
//                 <h2 className="text-2xl lg:text-3xl font-bold">
//                   {status === 'success' ? 'Mulțumim!' : 'Stay Updated'}
//                 </h2>
//                 <p className="text-lg text-muted-foreground">
//                   {status === 'success' 
//                     ? message
//                     : status === 'error'
//                     ? message
//                     : 'Get notified about new ErgoCharge products and exclusive offers.'
//                   }
//                 </p>
//               </div>

//               {/* Subscription Form or Success Message */}
//               {status === 'success' ? (
//                 <div className="space-y-4">
//                   <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
//                     <CheckCircle className="w-7 h-7 text-green-600" />
//                   </div>
//                   <Button 
//                     onClick={() => setStatus('idle')}
//                     variant="outline"
//                     className="mt-4"
//                   >
//                     Abonează alt email
//                   </Button>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
//                   <Input
//                     type="text"
//                     placeholder="Numele tău (opțional)"
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                     className="h-11"
//                     disabled={isLoading}
//                   />
//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <Input
//                       type="email"
//                       placeholder="Enter your email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="flex-1 h-11"
//                       required
//                       disabled={isLoading}
//                     />
//                     <Button 
//                       type="submit" 
//                       size="default" 
//                       className="h-11 px-6"
//                       disabled={isLoading || !email}
//                     >
//                       {isLoading ? (
//                         <div className="flex items-center space-x-2">
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                           <span>Subscribing...</span>
//                         </div>
//                       ) : (
//                         'Subscribe'
//                       )}
//                     </Button>
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     We respect your privacy. Unsubscribe at any time.
//                   </p>
//                 </form>
//               )}

//               {/* Benefits - simplificat */}
//               {status === 'idle' && (
//                 <div className="grid md:grid-cols-2 gap-4 mt-6">
//                   <div className="space-y-2">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
//                       <span className="text-blue-600 font-bold">🚀</span>
//                     </div>
//                     <h4 className="font-semibold">New Products</h4>
//                     <p className="text-sm text-muted-foreground">
//                       Be first to know about launches
//                     </p>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto">
//                       <span className="text-green-600 font-bold">💰</span>
//                     </div>
//                     <h4 className="font-semibold">Exclusive Deals</h4>
//                     <p className="text-sm text-muted-foreground">
//                       Special discounts for subscribers
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewsletterSection; 
export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])

    if (error) {
      setMessage('❌ Already subscribed or invalid email.')
      console.error(error)
    } else {
      setMessage('✅ Thanks for subscribing!')
      setEmail('')
    }
  }

  return (
    <form onSubmit={handleSubscribe}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Subscribe</button>
      {message && <p>{message}</p>}
    </form>
  )
}