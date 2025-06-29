import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Minus, Plus, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useReviews } from '@/contexts/ReviewContext';
import { useAuth } from '@/contexts/AuthContext';
import { getProductById } from '@/data/products';
import { toast } from '@/hooks/use-toast';
import ReviewForm from '@/components/ReviewForm';
import AuthModal from '@/components/AuthModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedMaterial, setSelectedMaterial] = useState('aluminum');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const reviewsPerPage = 5;
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { getAverageRating, getTotalReviews, getReviewsByProduct } = useReviews();
  const { isAuthenticated } = useAuth();

  // Get product from centralized data
  const productData = getProductById(id || "1");
  
  if (!productData) {
    return <div>Product not found</div>;
  }

  // Extended product data with additional properties for this page
  const product = {
    ...productData,
    description: productData.description || "The ErgoCharge Pro represents the pinnacle of wireless charging technology. With its sleek aluminum design and fast-charging capabilities, it's the perfect addition to any modern workspace.",
    features: [
      "15W Fast Wireless Charging",
      "Qi-Compatible with all devices",
      "Premium aluminum construction",
      "LED charging indicator",
      "Overcharge protection",
      "Non-slip base"
    ],
    specifications: {
      "Charging Power": "15W",
      "Input": "USB-C",
      "Compatibility": "Qi-enabled devices",
      "Material": "Aluminum alloy",
      "Dimensions": "4.3 × 4.3 × 0.4 inches",
      "Weight": "8.5 oz"
    },
    colors: [
      { id: 'black', name: 'Midnight Black', hex: '#000000' },
      { id: 'white', name: 'Arctic White', hex: '#FFFFFF' },
      { id: 'gray', name: 'Space Gray', hex: '#8E8E93' }
    ],
    materials: [
      { id: 'aluminum', name: 'Aluminum', price: 0 },
      { id: 'titanium', name: 'Titanium', price: 50 }
    ],
    images: [
      productData.image,
      productData.image, 
      productData.image,
      productData.image
    ],
    inStock: true,
    stockCount: 24
  };

  const selectedMaterialData = product.materials.find(m => m.id === selectedMaterial);
  const finalPrice = product.price + (selectedMaterialData?.price || 0);

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: finalPrice,
        image: product.images[0]
      });
    }
  };

  const handleAddToCart = () => {
    // Add the product with the selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `${product.id}-${selectedColor}-${selectedMaterial}`,
        name: product.name,
        price: finalPrice,
        image: product.images[0],
        color: selectedColor,
        material: selectedMaterial
      });
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Add product to cart with selected options and quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `${product.id}-${selectedColor}-${selectedMaterial}`,
        name: product.name,
        price: finalPrice,
        image: product.images[0],
        color: selectedColor,
        material: selectedMaterial
      });
    }
    
    // Show success toast
    toast({
      title: "Added to Cart & Redirecting",
      description: `${product.name} (${quantity}x) added to cart. Taking you to checkout...`,
    });
    
    // Redirect to checkout immediately using navigate for better UX
    navigate('/checkout');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const reviews = getReviewsByProduct(product.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-secondary/30 rounded-lg overflow-hidden group">
              {product.badge && (
                <Badge className="absolute top-4 left-4 z-10">
                  {product.badge}
                </Badge>
              )}
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square bg-secondary/30 rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.round(getAverageRating(product.id)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {getAverageRating(product.id)} ({getTotalReviews(product.id)} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl font-bold">${finalPrice}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    Save ${product.originalPrice - finalPrice}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <Separator />

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.id 
                        ? 'border-primary scale-110' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.id)}
                    title={color.name}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {product.colors.find(c => c.id === selectedColor)?.name}
              </p>
            </div>

            {/* Material Selection */}
            <div>
              <h3 className="font-semibold mb-3">Material</h3>
              <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.materials.map((material) => (
                    <SelectItem key={material.id} value={material.id}>
                      {material.name} {material.price > 0 && `(+$${material.price})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stockCount} in stock
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button 
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWishlistToggle}
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      isInWishlist(product.id) 
                        ? 'text-red-500 fill-current' 
                        : ''
                    }`} 
                  />
                </Button>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                {isAuthenticated ? 'Buy Now' : 'Sign In to Buy Now'}
              </Button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Product Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium">{key}:</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-8">
              {/* Review Form */}
              <ReviewForm productId={product.id} productName={product.name} />
              
              {/* Existing Reviews */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Reviews pentru {product.name} ({getTotalReviews(product.id)})
                </h3>
                
                {/* Paginated Reviews */}
            <div className="space-y-6">
                  {reviews.length > 0 ? (
                    <>
                      {/* Reviews for current page */}
                      {reviews
                        .slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)
                        .map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                                  <h4 className="font-semibold">{review.userName}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                                    {review.verified && (
                                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                        Verificat
                                      </span>
                                    )}
                        </div>
                      </div>
                    </div>
                              <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
                      
                      {/* Pagination Controls */}
                      {reviews.length > reviewsPerPage && (
                        <div className="flex items-center justify-center space-x-4 mt-8">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Anterior
                          </Button>
                          
                          <div className="flex items-center space-x-2">
                            {[...Array(Math.ceil(reviews.length / reviewsPerPage))].map((_, index) => (
                              <Button
                                key={index}
                                variant={currentPage === index + 1 ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(index + 1)}
                                className="w-8 h-8"
                              >
                                {index + 1}
                              </Button>
                            ))}
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(reviews.length / reviewsPerPage), prev + 1))}
                            disabled={currentPage === Math.ceil(reviews.length / reviewsPerPage)}
                          >
                            Următor
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}
                      
                      {/* Reviews Summary */}
                      <div className="text-center text-sm text-muted-foreground mt-4">
                        Afișare {Math.min((currentPage - 1) * reviewsPerPage + 1, reviews.length)} - {Math.min(currentPage * reviewsPerPage, reviews.length)} din {reviews.length} reviews
                      </div>
                    </>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground">
                          Nu există încă reviews pentru acest produs. Fii primul care scrie un review!
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default ProductPage;
