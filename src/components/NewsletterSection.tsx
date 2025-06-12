import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="relative py-12 overflow-hidden">
      {/* Wavy Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-slate-900 dark:to-indigo-900">
        {/* Animated gradient blobs - More intense */}
        <div className="absolute top-5 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/40 to-purple-600/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-5 right-10 w-[400px] h-[400px] bg-gradient-to-l from-cyan-500/35 to-teal-600/35 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-tr from-indigo-500/30 to-blue-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-bl from-violet-500/25 to-pink-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Flowing SVG shapes - More pronounced */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
            <defs>
              <radialGradient id="newsGrad1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.05"/>
              </radialGradient>
              <radialGradient id="newsGrad2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.20"/>
                <stop offset="100%" stopColor="#5B21B6" stopOpacity="0.03"/>
              </radialGradient>
              <radialGradient id="newsGrad3" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#0891B2" stopOpacity="0.02"/>
              </radialGradient>
            </defs>
            <path d="M0,180 Q200,80 400,120 T800,100 L1000,0 L1000,280 Q750,180 500,200 T0,320 Z" fill="url(#newsGrad1)"/>
            <path d="M0,220 Q350,120 650,160 T1000,140 L1000,350 Q700,220 450,260 T0,380 Z" fill="url(#newsGrad2)"/>
            <path d="M0,160 Q300,60 600,100 T1000,80 L1000,240 Q800,140 500,160 T0,280 Z" fill="url(#newsGrad3)"/>
          </svg>
        </div>
        
        {/* Additional floating elements */}
        <div className="absolute top-20 right-1/3 w-4 h-4 bg-blue-400/60 rounded-full animate-ping"></div>
        <div className="absolute bottom-24 left-1/4 w-3 h-3 bg-purple-400/70 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-32 left-1/2 w-2 h-2 bg-cyan-400/60 rounded-full animate-ping" style={{ animationDelay: '2.5s' }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border border-primary/20 shadow-lg bg-background/80 backdrop-blur-md">
            <CardContent className="p-8 text-center space-y-6">
              {/* Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              
              {/* Heading */}
              <div className="space-y-3">
                <h2 className="text-2xl lg:text-3xl font-bold">Stay Updated</h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Be the first to know about new products, exclusive offers, and innovations in charging technology.
                </p>
              </div>

              {/* Subscription Form */}
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 h-11"
                      required
                    />
                    <Button type="submit" size="default" className="h-11 px-6">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              ) : (
                <div className="space-y-3">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-600">Thank you!</h3>
                    <p className="text-muted-foreground">
                      You've successfully subscribed to our newsletter.
                    </p>
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="space-y-2">
                  <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-600 font-bold text-xs">🚀</span>
                  </div>
                  <h4 className="font-semibold text-sm">New Products</h4>
                  <p className="text-xs text-muted-foreground">
                    First access to our latest releases
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-green-600 font-bold text-xs">💰</span>
                  </div>
                  <h4 className="font-semibold text-sm">Exclusive Deals</h4>
                  <p className="text-xs text-muted-foreground">
                    Special discounts for subscribers
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-purple-600 font-bold text-xs">📧</span>
                  </div>
                  <h4 className="font-semibold text-sm">Premium Content</h4>
                  <p className="text-xs text-muted-foreground">
                    Tips & tricks for efficient charging
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection; 