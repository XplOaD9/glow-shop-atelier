
import { Link } from 'react-router-dom';
import { ArrowRight, Battery, Shield, Leaf, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getFeaturedProducts } from '@/data/products';
import { useReviews } from '@/contexts/ReviewContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSection from '@/components/NewsletterSection';

const Index = () => {
  const { getAverageRating, getTotalReviews } = useReviews();
  
  const features = [
    {
      icon: Battery,
      title: "Fast Charging",
      description: "Lightning-fast charging technology that powers your devices in minutes, not hours."
    },
    {
      icon: Shield,
      title: "Safe & Reliable",
      description: "Advanced safety features and premium materials ensure your devices are protected."
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Sustainable materials and carbon-neutral shipping for a better planet."
    }
  ];

  const products = getFeaturedProducts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-800 text-white">
        {/* Organic Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient blobs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-l from-cyan-500/25 to-teal-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-tr from-indigo-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-bl from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          
          {/* Flowing shapes */}
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="none">
              <defs>
                <radialGradient id="heroGrad1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.05"/>
                </radialGradient>
                <radialGradient id="heroGrad2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#5B21B6" stopOpacity="0.03"/>
                </radialGradient>
              </defs>
              <path d="M0,300 Q200,100 400,200 T800,150 L1000,0 L1000,400 Q800,300 600,350 T200,400 L0,500 Z" fill="url(#heroGrad1)"/>
              <path d="M0,400 Q300,200 500,300 T900,250 L1000,200 L1000,600 Q700,400 500,450 T100,500 L0,700 Z" fill="url(#heroGrad2)"/>
            </svg>
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <Badge variant="secondary" className="w-fit bg-white/10 text-white border-white/20">
                ⚡ New Generation Charging
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Power Your Life with 
                <span className="text-blue-400"> ErgoCharge</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Experience the future of charging with our premium, sustainable charging solutions. 
                Designed for the modern lifestyle, built for tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop">
                  <Button size="lg" className="w-full sm:w-auto group bg-blue-600 hover:bg-blue-700">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" className="w-full sm:w-auto bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-0">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in">
              {/* Glowing background effects */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 p-1 animate-pulse">
                <div className="w-full h-full rounded-3xl bg-slate-800"></div>
              </div>
              
              {/* Main content container */}
              <div className="relative aspect-square bg-gradient-to-br from-blue-500/30 via-purple-500/25 to-cyan-400/30 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl">
                {/* Inner glowing ring */}
                <div className="absolute inset-4 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
                
                {/* Product display area */}
                <div className="relative w-[394px] h-[394px] bg-gradient-to-br from-white/10 to-white/5 rounded-[2rem] flex items-center justify-center backdrop-blur-lg overflow-hidden border border-white/10 shadow-xl">
                  {/* Subtle animation overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-pulse"></div>
                  
                  <img 
                    src="/images/home_page/5539dd1d-8661-4c9b-9f3a-f32f9f529f55.png" 
                    alt="ErgoCharge Device" 
                    className="relative z-10 w-full h-full object-contain p-1 drop-shadow-2xl"
                  />
                </div>
                
                {/* Floating orbs around the product */}
                <div className="absolute top-8 right-8 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-12 left-12 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-16 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Wavy Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-pink-100 dark:from-slate-900 dark:to-orange-900">
          {/* Animated gradient blobs - Orange/Pink theme */}
          <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-r from-orange-500/40 to-red-600/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-[400px] h-[400px] bg-gradient-to-l from-pink-500/35 to-rose-600/35 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-tr from-amber-500/30 to-orange-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-bl from-yellow-500/25 to-amber-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          
          {/* Flowing SVG shapes */}
          <div className="absolute inset-0">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
              <defs>
                <radialGradient id="featuresGrad1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F97316" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#EA580C" stopOpacity="0.05"/>
                </radialGradient>
                <radialGradient id="featuresGrad2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#EC4899" stopOpacity="0.20"/>
                  <stop offset="100%" stopColor="#BE185D" stopOpacity="0.03"/>
                </radialGradient>
                <radialGradient id="featuresGrad3" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0.02"/>
                </radialGradient>
              </defs>
              <path d="M0,250 Q200,150 400,200 T800,180 L1000,100 L1000,350 Q750,250 500,280 T0,400 Z" fill="url(#featuresGrad1)"/>
              <path d="M0,300 Q350,200 650,240 T1000,220 L1000,450 Q700,320 450,360 T0,500 Z" fill="url(#featuresGrad2)"/>
              <path d="M0,200 Q300,100 600,140 T1000,120 L1000,300 Q800,200 500,220 T0,350 Z" fill="url(#featuresGrad3)"/>
            </svg>
          </div>
          
          {/* Additional floating elements */}
          <div className="absolute top-32 right-1/3 w-4 h-4 bg-orange-400/60 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-pink-400/70 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-48 left-1/2 w-2 h-2 bg-amber-400/60 rounded-full animate-ping" style={{ animationDelay: '2.5s' }}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Why Choose ErgoCharge?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're revolutionizing how you power your devices with cutting-edge technology and sustainable design.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Featured Products</h2>
            <p className="text-xl text-muted-foreground">
              Discover our most popular charging solutions
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-square bg-secondary/30 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.round(getAverageRating(product.id)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {getAverageRating(product.id)} ({getTotalReviews(product.id)} reviews)
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <Button>View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/shop">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">Ready to Power Up?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made the switch to ErgoCharge. 
            Experience the difference today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Shop Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-0">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSection />

      <Footer />
    </div>
  );
};

export default Index;
