import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSection from '@/components/NewsletterSection';
import { blogPosts, getFeaturedPost, getRegularPosts } from '@/data/blogPosts';

const Blog = () => {
  const categories = ["All", "Tehnologie", "Sustenabilitate", "Sfaturi", "Design", "Lifestyle"];
  const featuredPost = getFeaturedPost();
  const regularPosts = getRegularPosts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
        <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-rose-500/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">ErgoCharge Blog</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Stay updated with the latest in charging technology, sustainability, and design insights.
          </p>
          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-white/90 backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Articol Recomandat</h2>
            <Link to={`/blog/${featuredPost.id}`}>
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
                      Citește articolul
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </div>
            </Card>
            </Link>
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
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                <div className="aspect-video bg-secondary/30 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                  <CardContent className="p-6 space-y-4 flex flex-col h-full">
                    <Badge variant="secondary" className="w-fit">{post.category}</Badge>
                  <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                    <p className="text-muted-foreground text-sm flex-1">
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
                        Citește mai mult
                      <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-24 py-16 bg-primary text-primary-foreground rounded-3xl text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Rămâi la curent</h2>
            <p className="text-primary-foreground/90">
              Abonează-te la newsletter și nu rata cele mai noi articole, actualizări de produse și oferte exclusive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Introdu adresa de email"
                className="bg-primary-foreground text-foreground"
              />
              <Button variant="secondary">Abonează-te</Button>
            </div>
          </div>
        </section>
      </div>

      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Blog;
