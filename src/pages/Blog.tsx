
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Wireless Charging: What to Expect in 2024",
      excerpt: "Explore the latest innovations in wireless charging technology and how they'll change the way we power our devices.",
      image: "/placeholder.svg",
      category: "Technology",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "Sustainable Tech: How ErgoCharge is Leading the Green Revolution",
      excerpt: "Discover our commitment to sustainability and how we're making a positive impact on the environment.",
      image: "/placeholder.svg",
      category: "Sustainability",
      author: "Mike Chen",
      date: "2024-01-10",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Maximizing Battery Life: Expert Tips for Your Devices",
      excerpt: "Learn the best practices for maintaining your device's battery health and extending its lifespan.",
      image: "/placeholder.svg",
      category: "Tips",
      author: "Emily Davis",
      date: "2024-01-08",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "Behind the Design: Creating the ErgoCharge Pro",
      excerpt: "Go behind the scenes and learn about the design process that brought our flagship product to life.",
      image: "/placeholder.svg",
      category: "Design",
      author: "Sarah Johnson",
      date: "2024-01-05",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "The Science of Fast Charging: How It Works",
      excerpt: "Understand the technology behind fast charging and why it's revolutionizing how we use our devices.",
      image: "/placeholder.svg",
      category: "Technology",
      author: "Mike Chen",
      date: "2024-01-03",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "Work From Home: Setting Up the Perfect Charging Station",
      excerpt: "Create an efficient and organized workspace with the ideal charging setup for all your devices.",
      image: "/placeholder.svg",
      category: "Lifestyle",
      author: "Emily Davis",
      date: "2024-01-01",
      readTime: "5 min read"
    }
  ];

  const categories = ["All", "Technology", "Sustainability", "Tips", "Design", "Lifestyle"];
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">ErgoCharge Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Stay updated with the latest in charging technology, sustainability, and design insights.
          </p>
          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search articles..."
              className="w-full"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video md:aspect-square bg-secondary/30">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Badge>{featuredPost.category}</Badge>
                      <Badge variant="secondary">Featured</Badge>
                    </div>
                    <h3 className="text-2xl font-bold leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-fit mt-6 group">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </section>
        )}

        {/* Category Filter */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="hover:bg-primary hover:text-primary-foreground"
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-video bg-secondary/30 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <Badge variant="secondary">{post.category}</Badge>
                  <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="group">
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-24 py-16 bg-primary text-primary-foreground rounded-3xl text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Stay in the Loop</h2>
            <p className="text-primary-foreground/90">
              Subscribe to our newsletter and never miss the latest articles, product updates, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground text-foreground"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
