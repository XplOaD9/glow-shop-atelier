
import { useState } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useReviews } from '@/contexts/ReviewContext';
import { products, categories, materials } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSection from '@/components/NewsletterSection';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { getAverageRating, getTotalReviews } = useReviews();

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories(prev => 
      checked 
        ? [...prev, categoryId]
        : prev.filter(id => id !== categoryId)
    );
  };

  const handleMaterialChange = (materialId: string, checked: boolean) => {
    setSelectedMaterials(prev =>
      checked
        ? [...prev, materialId]
        : prev.filter(id => id !== materialId)
    );
  };

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
    return matchesPrice && matchesCategory && matchesMaterial;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-slate-800 p-8 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl transform -translate-x-16 translate-y-16"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Shop ErgoCharge</h1>
            <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-blue-400">Redefine your workspace.</h2>
            <p className="text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Explore our curated collection of elegant, multi-device charging docks and smart desk accessories — built for professionals, creators, and minimalist workspaces.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Sort By */}
                <div>
                  <h3 className="font-semibold mb-3">Sort By</h3>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={10}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <Separator />

                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) => 
                            handleCategoryChange(category.id, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={category.id}
                          className="text-sm cursor-pointer"
                        >
                          {category.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Materials */}
                <div>
                  <h3 className="font-semibold mb-3">Materials</h3>
                  <div className="space-y-3">
                    {materials.map((material) => (
                      <div key={material.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={material.id}
                          checked={selectedMaterials.includes(material.id)}
                          onCheckedChange={(checked) =>
                            handleMaterialChange(material.id, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={material.id}
                          className="text-sm cursor-pointer"
                        >
                          {material.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-square bg-secondary/30 relative overflow-hidden">
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 z-10">
                        {product.badge}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 z-10 bg-background/80 hover:bg-background"
                      onClick={() => handleWishlistToggle(product)}
                    >
                      <Heart 
                        className={`w-4 h-4 ${
                          isInWishlist(product.id) 
                            ? 'text-red-500 fill-current' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                    </Button>
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </Link>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.round(getAverageRating(product.id)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({getTotalReviews(product.id)})
                      </span>
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold hover:text-primary transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button 
                      className="w-full group"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <NewsletterSection />

      <Footer />
    </div>
  );
};

export default Shop;
