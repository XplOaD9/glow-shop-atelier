import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts, getFeaturedPost, getRegularPosts } from '@/data/blogPosts';
import { useNewsletter } from '@/hooks/useNewsletter';

const Blog = () => {
  const categories = ["All", "Tehnologie", "Sustenabilitate", "Sfaturi", "Design", "Lifestyle"];
  const featuredPost = getFeaturedPost();
  const regularPosts = getRegularPosts();

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Newsletter state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { subscribe, loading, error } = useNewsletter();

  // Filter posts based on search and category
  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    const result = await subscribe(email, name || undefined);
    if (result.success) {
      setEmail('');
      setName('');
    }
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
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
            {filteredPosts.map((post) => (
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

      </div>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center shadow-lg">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-600 rounded-sm flex items-center justify-center">
                  <span className="text-white text-sm">✉</span>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-600 mb-8">
                Get notified about new ErgoCharge products and exclusive offers.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="Numele tău (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button 
                    type="submit"
                    disabled={loading || !email.trim()}
                    className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium disabled:opacity-50"
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
              </form>

              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}

              <p className="text-sm text-gray-500 mb-8">
                We respect your privacy. Unsubscribe at any time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xl">🚀</span>
                  </div>
                  <h3 className="font-semibold mb-2">New Products</h3>
                  <p className="text-sm text-gray-600">Be first to know about launches</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 text-xl">🏷️</span>
                  </div>
                  <h3 className="font-semibold mb-2">Exclusive Deals</h3>
                  <p className="text-sm text-gray-600">Special discounts for subscribers</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
