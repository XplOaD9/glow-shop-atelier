export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  material: string;
  badge?: string;
  colors: string[];
  description?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "ErgoCharge Pro",
    price: 149,
    originalPrice: 199,
    image: "/placeholder.svg",
    rating: 5,
    reviews: 234,
    category: "wireless",
    material: "aluminum",
    badge: "Best Seller",
    colors: ["black", "white", "gray"],
    description: "Premium wireless charging solution with advanced safety features."
  },
  {
    id: "2",
    name: "ErgoCharge Compact",
    price: 79,
    originalPrice: 109,
    image: "/placeholder.svg",
    rating: 5,
    reviews: 156,
    category: "portable",
    material: "plastic",
    colors: ["black", "blue", "red"],
    description: "Compact and portable charging solution for on-the-go professionals."
  },
  {
    id: "3",
    name: "ErgoCharge Wireless",
    price: 199,
    originalPrice: 259,
    image: "/placeholder.svg",
    rating: 5,
    reviews: 89,
    category: "wireless",
    material: "glass",
    badge: "New",
    colors: ["white", "black"],
    description: "Next-generation wireless charging with premium glass design."
  },
  {
    id: "4",
    name: "ErgoCharge Car Mount",
    price: 59,
    originalPrice: 79,
    image: "/placeholder.svg",
    rating: 5,
    reviews: 67,
    category: "car",
    material: "aluminum",
    colors: ["black"],
    description: "Secure car mount with fast wireless charging capabilities."
  },
  {
    id: "5",
    name: "ErgoCharge Station",
    price: 299,
    originalPrice: 399,
    image: "/placeholder.svg",
    rating: 5,
    reviews: 145,
    category: "desktop",
    material: "aluminum",
    badge: "Premium",
    colors: ["silver", "black"],
    description: "All-in-one charging station for multiple devices simultaneously."
  },
  {
    id: "6",
    name: "ErgoCharge Travel Kit",
    price: 129,
    originalPrice: 169,
    image: "/placeholder.svg",
    rating: 5,
    reviews: 98,
    category: "portable",
    material: "fabric",
    colors: ["black", "navy", "gray"],
    description: "Complete travel charging kit with multiple adapters and cables."
  },
  {
    id: "7",
    name: "ErgoMouse Wireless Pro",
    price: 89,
    originalPrice: 119,
    image: "/placeholder.svg",
    rating: 5,
    reviews: 187,
    category: "accessories",
    material: "aluminum",
    badge: "Ergonomic",
    colors: ["black", "white", "silver"],
    description: "Wireless ergonomic mouse with precision tracking and long battery life."
  },
  {
    id: "8",
    name: "ErgoKeyboard Mechanical",
    price: 159,
    originalPrice: 199,
    image: "/placeholder.svg",
    rating: 5,
    reviews: 243,
    category: "accessories",
    material: "aluminum",
    badge: "RGB",
    colors: ["black", "white"],
    description: "Mechanical keyboard with RGB lighting and wireless connectivity."
  },
  {
    id: "9",
    name: "ErgoDock Phone Station",
    price: 45,
    originalPrice: 65,
    image: "/placeholder.svg",
    rating: 5,
    reviews: 134,
    category: "phone-dock",
    material: "aluminum",
    colors: ["black", "silver", "gold"],
    description: "Elegant phone charging dock with adjustable viewing angles."
  },
  {
    id: "10",
    name: "ErgoDock Mouse Charger",
    price: 39,
    originalPrice: 55,
    image: "/placeholder.svg",
    rating: 5,
    reviews: 89,
    category: "mouse-dock",
    material: "plastic",
    colors: ["black", "white"],
    description: "Dedicated charging dock for wireless mice with LED indicators."
  },
  {
    id: "11",
    name: "ErgoHDMI Cable 4K",
    price: 25,
    originalPrice: 35,
    image: "/placeholder.svg",
    rating: 5,
    reviews: 156,
    category: "cables",
    material: "fabric",
    badge: "4K Ready",
    colors: ["black", "gray"],
    description: "Premium 4K HDMI cable with braided fabric design and gold connectors."
  }
];

export const categories = [
  { id: "wireless", label: "Wireless Chargers" },
  { id: "portable", label: "Portable Chargers" },
  { id: "car", label: "Car Chargers" },
  { id: "desktop", label: "Desktop Stations" },
  { id: "accessories", label: "Accessories" },
  { id: "phone-dock", label: "Phone Docks" },
  { id: "mouse-dock", label: "Mouse Docks" },
  { id: "cables", label: "Cables" }
];

export const materials = [
  { id: "aluminum", label: "Aluminum" },
  { id: "plastic", label: "Plastic" },
  { id: "glass", label: "Glass" },
  { id: "fabric", label: "Fabric" }
];

// Featured products for homepage (first 3)
export const getFeaturedProducts = () => products.slice(0, 3);

// Get product by ID
export const getProductById = (id: string) => products.find(product => product.id === id); 