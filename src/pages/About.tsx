import { Leaf, Users, Award, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSection from '@/components/NewsletterSection';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "We're constantly pushing the boundaries of charging technology to create products that exceed expectations."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Every product is designed with the environment in mind, using eco-friendly materials and carbon-neutral shipping."
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in building lasting relationships with our customers and supporting the communities we serve."
    },
    {
      icon: Award,
      title: "Quality",
      description: "Premium materials and rigorous testing ensure that every ErgoCharge product meets our high standards."
    }
  ];



  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform translate-x-32 translate-y-32"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
            Powering the Future, 
            <span className="text-blue-400"> Sustainably</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            At ErgoCharge, we're more than just a charging company. We're pioneers in sustainable technology, 
            creating premium charging solutions that respect both your devices and our planet.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                We believe that premium charging solutions shouldn't come at the cost of our environment. 
                That's why we've made sustainability the cornerstone of everything we do.
              </p>
              <p className="text-lg text-muted-foreground">
                From our carbon-neutral supply chain to our recyclable packaging, every decision is made 
                with future generations in mind. We're not just charging your devices – we're charging 
                towards a better tomorrow.
              </p>
            </div>
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
              <Leaf className="w-32 h-32 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Wavy Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-100 dark:from-slate-900 dark:to-emerald-900">
          {/* Animated gradient blobs - Green/Teal theme */}
          <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-r from-green-500/40 to-emerald-600/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-[400px] h-[400px] bg-gradient-to-l from-teal-500/35 to-cyan-600/35 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-tr from-lime-500/30 to-green-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-bl from-emerald-500/25 to-teal-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          
          {/* Flowing SVG shapes */}
          <div className="absolute inset-0">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
              <defs>
                <radialGradient id="valuesGrad1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.05"/>
                </radialGradient>
                <radialGradient id="valuesGrad2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.20"/>
                  <stop offset="100%" stopColor="#0D9488" stopOpacity="0.03"/>
                </radialGradient>
                <radialGradient id="valuesGrad3" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#84CC16" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="#65A30D" stopOpacity="0.02"/>
                </radialGradient>
              </defs>
              <path d="M0,250 Q200,150 400,200 T800,180 L1000,100 L1000,350 Q750,250 500,280 T0,400 Z" fill="url(#valuesGrad1)"/>
              <path d="M0,300 Q350,200 650,240 T1000,220 L1000,450 Q700,320 450,360 T0,500 Z" fill="url(#valuesGrad2)"/>
              <path d="M0,200 Q300,100 600,140 T1000,120 L1000,300 Q800,200 500,220 T0,350 Z" fill="url(#valuesGrad3)"/>
            </svg>
          </div>
          
          {/* Additional floating elements */}
          <div className="absolute top-32 right-1/3 w-4 h-4 bg-green-400/60 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-teal-400/70 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-48 left-1/2 w-2 h-2 bg-emerald-400/60 rounded-full animate-ping" style={{ animationDelay: '2.5s' }}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core principles guide every decision we make and every product we create.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Practices */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Sustainability Practices</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to minimizing our environmental impact through innovative practices.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold">Eco-Friendly Materials</h3>
                <p className="text-muted-foreground">
                  All our products use recycled aluminum, biodegradable packaging, and conflict-free minerals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold">Carbon Neutral Shipping</h3>
                <p className="text-muted-foreground">
                  We offset 100% of our shipping emissions and use renewable energy in our warehouses.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold">Recycling Program</h3>
                <p className="text-muted-foreground">
                  Send us your old chargers and we'll recycle them responsibly, giving you a discount on your next purchase.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <NewsletterSection />

      <Footer />
    </div>
  );
};

export default About;
