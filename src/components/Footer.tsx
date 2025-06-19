import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCallback } from 'react';

const Footer = () => {
  const navigate = useNavigate();

  const handleQuickLink = useCallback((path: string) => {
    navigate(path);
    setTimeout(() => {
      const hero = document.getElementById('hero-section');
      if (hero) hero.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [navigate]);

  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">EC</span>
              </div>
              <span className="text-xl font-bold">ErgoCharge</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Premium charging solutions designed for the modern lifestyle. 
              Sustainable, reliable, and beautifully crafted.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <button onClick={() => handleQuickLink('/shop')} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer">Shop</button>
              <button onClick={() => handleQuickLink('/about')} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer">About</button>
              <button onClick={() => handleQuickLink('/contact')} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer">Contact</button>
              <button onClick={() => handleQuickLink('/faq')} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer">FAQ</button>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Service</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Shipping Info
              </Link>
              <Link to="/returns" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Returns & Exchanges
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <div className="flex flex-col space-y-2">
              <Input placeholder="Enter your email" type="email" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 ErgoCharge. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Facebook
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Instagram
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
