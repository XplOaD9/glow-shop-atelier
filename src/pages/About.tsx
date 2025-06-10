
import { Leaf, Users, Award, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg",
      bio: "10+ years in tech innovation"
    },
    {
      name: "Mike Chen",
      role: "CTO",
      image: "/placeholder.svg",
      bio: "Former Apple engineer"
    },
    {
      name: "Emily Davis",
      role: "Head of Design",
      image: "/placeholder.svg",
      bio: "Award-winning product designer"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Powering the Future, 
            <span className="text-primary"> Sustainably</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
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

      {/* Team Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind ErgoCharge's innovation and success.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="w-24 h-24 bg-secondary rounded-full mx-auto overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                    <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
