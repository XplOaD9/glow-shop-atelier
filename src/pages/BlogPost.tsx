import { useParams, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, BookmarkPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SimpleShareDialog } from '@/components/SimpleShareDialog';
import { SaveDialog } from '@/components/SaveDialog';
import { LikeButton } from '@/components/LikeButton';
import { getPostById, blogPosts } from '@/data/blogPosts';
import { useNewsletter } from '@/hooks/useNewsletter';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '0');
  const post = getPostById(postId);

  // Newsletter state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { subscribe, loading, error } = useNewsletter();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    const result = await subscribe(email, name || undefined);
    if (result.success) {
      setEmail('');
      setName('');
    }
  };

  // Redirect dacă articolul nu există
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Articole similare (același autor sau categorie)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (p.author === post.author || p.category === post.category))
    .slice(0, 3);

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      // Headers
      if (paragraph.startsWith('# ')) {
        return <h1 key={index} className="text-4xl font-bold mb-6 mt-8">{paragraph.substring(2)}</h1>;
      }
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-3xl font-semibold mb-4 mt-8">{paragraph.substring(3)}</h2>;
      }
      if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-2xl font-semibold mb-3 mt-6">{paragraph.substring(4)}</h3>;
      }
      if (paragraph.startsWith('#### ')) {
        return <h4 key={index} className="text-xl font-semibold mb-3 mt-4">{paragraph.substring(5)}</h4>;
      }

      // Lists
      if (paragraph.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-2">{paragraph.substring(2)}</li>;
      }
      if (paragraph.startsWith('✅ ')) {
        return <li key={index} className="ml-6 mb-2 text-green-600 font-medium">{paragraph.substring(2)}</li>;
      }
      if (paragraph.startsWith('❌ ')) {
        return <li key={index} className="ml-6 mb-2 text-red-600 font-medium">{paragraph.substring(2)}</li>;
      }
      if (paragraph.startsWith('⚠️ ')) {
        return <li key={index} className="ml-6 mb-2 text-orange-600 font-medium">{paragraph.substring(3)}</li>;
      }
      if (paragraph.startsWith('🔄 ')) {
        return <li key={index} className="ml-6 mb-2 text-blue-600 font-medium">{paragraph.substring(3)}</li>;
      }

      // Bold text
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return <p key={index} className="font-bold mb-4">{paragraph.substring(2, paragraph.length - 2)}</p>;
      }

      // Code blocks
      if (paragraph.startsWith('```')) {
        return (
          <div key={index} className="bg-slate-900 text-slate-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <code className="text-sm">{paragraph.substring(3)}</code>
          </div>
        );
      }

      // Quotes/Emphasis
      if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
        return <p key={index} className="italic text-slate-600 mb-4 pl-4 border-l-4 border-primary">{paragraph.substring(1, paragraph.length - 1)}</p>;
      }

      // Regular paragraphs
      return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
    }).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Back to Blog */}
            <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi la Blog
            </Link>

            {/* Article Meta */}
            <div className="mb-6">
              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              
              {/* Author and Date Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} citire</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/10 text-white border-white/20">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Social Actions */}
            <div className="flex items-center space-x-4">
              <SimpleShareDialog 
                url={`/blog/${post.id}`}
                title={post.title}
                description={post.excerpt}
              >
                <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-md transition-colors">
                  <Share2 className="w-4 h-4 mr-2" />
                  <span>Distribuie</span>
                </button>
              </SimpleShareDialog>

              <SaveDialog
                articleId={post.id}
                title={post.title}
                category={post.category}
              >
                <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-md transition-colors">
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  <span>Salvează</span>
                </button>
              </SaveDialog>

              <LikeButton
                articleId={post.id}
                title={post.title}
                variant="heart"
                className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="aspect-video bg-secondary/30 rounded-lg mb-12 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body */}
            <article className="prose prose-lg max-w-none">
              <div className="text-lg leading-relaxed text-gray-700">
                {formatContent(post.content)}
              </div>
            </article>

            <Separator className="my-12" />

            {/* Author Bio */}
            <Card className="mb-12">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Despre {post.author}</h3>
                    <p className="text-muted-foreground mb-4">
                      {post.author === 'Sarah Johnson' && 'Expert în design de produs și inovație tehnologică. Sarah conduce echipa de cercetare și dezvoltare la ErgoCharge, cu focus pe experiența utilizatorului și sustenabilitate.'}
                      {post.author === 'Mike Chen' && 'Inginer în tehnologii de încărcare cu peste 10 ani de experiență în industria tech. Mike se specializează în optimizarea energetică și dezvoltarea de soluții hardware inovatoare.'}
                      {post.author === 'Emily Davis' && 'Consultant în productivitate și organizare workspace. Emily ajută profesioniștii să își optimizeze spațiile de lucru pentru eficiență maximă și echilibru work-life.'}
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Urmărește autorul
                      </Button>
                      <Button variant="ghost" size="sm">
                        Vezi toate articolele
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-8">Articole similare</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                      <Card className="hover:shadow-lg transition-shadow h-full">
                        <div className="aspect-video bg-secondary/30">
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-6 flex flex-col h-full">
                          <Badge variant="secondary" className="w-fit mb-3">
                            {relatedPost.category}
                          </Badge>
                          <h3 className="font-semibold mb-2 line-clamp-2 flex-1">
                            {relatedPost.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{relatedPost.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{relatedPost.readTime}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </section>

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

export default BlogPost; 