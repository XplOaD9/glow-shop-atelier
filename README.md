# ⚡ ErgoCharge - Premium E-commerce Store

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-cyan.svg)](https://tailwindcss.com/)

A modern, premium e-commerce platform for eco-friendly charging solutions, built with React, TypeScript, and cutting-edge web technologies.

## 🌐 Live Demo

**[View Live Store](https://lovable.dev/projects/619d8d8a-0805-466f-8aee-1bc10d62055e)**

## ✨ Key Features

- 🛒 **Complete E-commerce** - Full shopping cart, wishlist, and checkout system
- ⭐ **Dynamic Reviews** - 5-star rating system with pagination
- 📱 **Responsive Design** - Optimized for all devices
- 🎨 **Modern UI/UX** - Beautiful animations and smooth interactions
- 💳 **Stripe Integration** - Secure payment processing
- 📄 **Integrated Blog** - Content management system
- 🔍 **SEO Optimized** - Search engine friendly structure
- ♿ **Accessibility** - WCAG compliant design

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm
- Git

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd glow-shop-atelier

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
glow-shop-atelier/
├── public/
│   ├── images/                 # Product images and assets
│   └── favicon.ico
├── src/
│   ├── components/             # Reusable components
│   │   ├── ui/                # Base UI components (shadcn/ui)
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Footer.tsx         # Site footer
│   │   └── ReviewForm.tsx     # Review submission form
│   ├── contexts/              # React Context providers
│   │   ├── CartContext.tsx    # Shopping cart management
│   │   ├── ReviewContext.tsx  # Review system management
│   │   └── WishlistContext.tsx # Wishlist functionality
│   ├── data/                  # Static data and configurations
│   │   ├── products.ts        # Product definitions
│   │   └── blogPosts.ts       # Blog articles
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-toast.ts       # Toast notifications
│   │   └── use-mobile.tsx     # Mobile detection
│   ├── pages/                 # Application pages
│   │   ├── Index.tsx          # Homepage
│   │   ├── Shop.tsx           # Product catalog
│   │   ├── ProductPage.tsx    # Product details
│   │   ├── Cart.tsx           # Shopping cart
│   │   ├── Checkout.tsx       # Order completion
│   │   └── ...               # Additional pages
│   ├── lib/                   # Utilities and helpers
│   └── integrations/          # External service integrations
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🛠 Tech Stack

### Core Technologies
- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type safety
- **Vite 5.4.1** - Build tool and dev server

### Styling & UI
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **shadcn/ui** - Pre-built component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library

### State Management
- **React Context** - Global state management
- **React Hook Form 7.53.0** - Form handling
- **Zod 3.23.8** - Schema validation

### Additional Tools
- **React Router DOM 6.26.2** - Client-side routing
- **TanStack Query 5.56.2** - Server state management
- **Supabase** - Backend services (optional)

## 📦 Dependencies & External Resources

### 🎨 UI Components & Styling

| Package | Version | Purpose | Repository |
|---------|---------|---------|------------|
| `@radix-ui/react-*` | ^1.1.0+ | Accessible UI primitives | [GitHub](https://github.com/radix-ui/primitives) |
| `tailwindcss` | ^3.4.11 | CSS framework | [GitHub](https://github.com/tailwindlabs/tailwindcss) |
| `tailwind-merge` | ^2.5.2 | Utility for merging Tailwind classes | [GitHub](https://github.com/dcastil/tailwind-merge) |
| `tailwindcss-animate` | ^1.0.7 | Animation utilities for Tailwind | [GitHub](https://github.com/midudev/tailwind-animations) |
| `class-variance-authority` | ^0.7.1 | Component variant management | [GitHub](https://github.com/joe-bell/cva) |
| `clsx` | ^2.1.1 | Conditional CSS class utility | [GitHub](https://github.com/lukeed/clsx) |
| `lucide-react` | ^0.462.0 | Modern icon library | [GitHub](https://github.com/lucide-icons/lucide) |
| `next-themes` | ^0.3.0 | Theme switching utility | [GitHub](https://github.com/pacocoursey/next-themes) |

### 📝 Forms & Validation

| Package | Version | Purpose | Repository |
|---------|---------|---------|------------|
| `react-hook-form` | ^7.53.0 | Form state management | [GitHub](https://github.com/react-hook-form/react-hook-form) |
| `@hookform/resolvers` | ^3.9.0 | Validation resolvers for RHF | [GitHub](https://github.com/react-hook-form/resolvers) |
| `zod` | ^3.23.8 | TypeScript-first schema validation | [GitHub](https://github.com/colinhacks/zod) |

### 🚀 Navigation & Routing

| Package | Version | Purpose | Repository |
|---------|---------|---------|------------|
| `react-router-dom` | ^6.26.2 | Client-side routing | [GitHub](https://github.com/remix-run/react-router) |

### 📊 Data Management & APIs

| Package | Version | Purpose | Repository |
|---------|---------|---------|------------|
| `@tanstack/react-query` | ^5.56.2 | Server state management | [GitHub](https://github.com/TanStack/query) |
| `@supabase/supabase-js` | ^2.50.0 | Backend-as-a-service client | [GitHub](https://github.com/supabase/supabase-js) |

### 🎯 Interactive Components

| Package | Version | Purpose | Repository |
|---------|---------|---------|------------|
| `embla-carousel-react` | ^8.3.0 | Carousel/slider component | [GitHub](https://github.com/davidjerleke/embla-carousel) |
| `cmdk` | ^1.0.0 | Command palette component | [GitHub](https://github.com/pacocoursey/cmdk) |
| `vaul` | ^0.9.3 | Drawer component | [GitHub](https://github.com/emilkowalski/vaul) |
| `sonner` | ^1.5.0 | Toast notifications | [GitHub](https://github.com/emilkowalski/sonner) |
| `react-resizable-panels` | ^2.1.3 | Resizable layout panels | [GitHub](https://github.com/bvaughn/react-resizable-panels) |

### 📅 Date & Time

| Package | Version | Purpose | Repository |
|---------|---------|---------|------------|
| `date-fns` | ^3.6.0 | Date utility functions | [GitHub](https://github.com/date-fns/date-fns) |
| `react-day-picker` | ^8.10.1 | Date picker component | [GitHub](https://github.com/gpbl/react-day-picker) |

### 📈 Data Visualization

| Package | Version | Purpose | Repository |
|---------|---------|---------|------------|
| `recharts` | ^2.12.7 | Chart library for React | [GitHub](https://github.com/recharts/recharts) |

### 🔧 Utility Libraries

| Package | Version | Purpose | Repository |
|---------|---------|---------|------------|
| `input-otp` | ^1.2.4 | OTP input component | [GitHub](https://github.com/guilhermerodz/input-otp) |

### 🛠 Development Dependencies

| Package | Version | Purpose | Repository |
|---------|---------|---------|------------|
| `vite` | ^5.4.1 | Build tool and dev server | [GitHub](https://github.com/vitejs/vite) |
| `@vitejs/plugin-react-swc` | ^3.5.0 | React plugin for Vite with SWC | [GitHub](https://github.com/vitejs/vite-plugin-react-swc) |
| `typescript` | ^5.5.3 | TypeScript compiler | [GitHub](https://github.com/microsoft/TypeScript) |
| `typescript-eslint` | ^8.0.1 | TypeScript ESLint rules | [GitHub](https://github.com/typescript-eslint/typescript-eslint) |
| `eslint` | ^9.9.0 | JavaScript/TypeScript linter | [GitHub](https://github.com/eslint/eslint) |
| `postcss` | ^8.4.47 | CSS post-processor | [GitHub](https://github.com/postcss/postcss) |
| `autoprefixer` | ^10.4.20 | CSS vendor prefix automation | [GitHub](https://github.com/postcss/autoprefixer) |
| `@tailwindcss/typography` | ^0.5.15 | Typography plugin for Tailwind | [GitHub](https://github.com/tailwindlabs/tailwindcss-typography) |

### 🎨 Design System & References

This project follows design patterns and components inspired by:

- **[shadcn/ui](https://ui.shadcn.com/)** - Design system and component library
- **[Radix UI](https://www.radix-ui.com/)** - Low-level UI primitives
- **[Tailwind UI](https://tailwindui.com/)** - Design inspiration and patterns
- **[Lucide Icons](https://lucide.dev/)** - Icon design system

### 📚 Documentation & Learning Resources

- **React**: [Official Docs](https://react.dev/)
- **TypeScript**: [Official Handbook](https://www.typescriptlang.org/docs/)
- **Vite**: [Official Guide](https://vitejs.dev/guide/)
- **Tailwind CSS**: [Official Docs](https://tailwindcss.com/docs)
- **React Hook Form**: [Official Docs](https://react-hook-form.com/)
- **Zod**: [Official Docs](https://zod.dev/)

### 🌟 Special Thanks

This project was built using open-source libraries and follows modern web development best practices. Special thanks to all the maintainers and contributors of the above packages for making modern web development possible.

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here

# Supabase Configuration (optional)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key

# App Configuration
VITE_APP_NAME=ErgoCharge
VITE_APP_URL=http://localhost:5173
```

### Product Management

Products are defined in `src/data/products.ts`. To add or modify products:

```typescript
export const products: Product[] = [
  {
    id: "1",
    name: "Product Name",
    price: 99.99,
    originalPrice: 149.99,
    image: "/images/product.jpg",
    category: "category",
    description: "Product description...",
    features: ["Feature 1", "Feature 2"],
    inStock: true,
    rating: 5,
    colors: ["black", "white"],
    materials: ["plastic", "metal"]
  }
];
```

## 🧪 Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Development build
npm run build:dev

# Code linting
npm run lint

# Preview production build
npm run preview
```

### Adding New Features

1. **Pages**: Add to `src/pages/` and update routing in `App.tsx`
2. **Components**: Create in `src/components/` following existing patterns
3. **Contexts**: Add to `src/contexts/` for global state management
4. **Hooks**: Create custom hooks in `src/hooks/`

### Code Guidelines

- Use TypeScript for all new files
- Follow existing component patterns
- Use Tailwind CSS for styling
- Implement proper error handling
- Write clean, readable code

## 🚀 Deployment

### Using Lovable Platform

1. Open your project in Lovable
2. Click Share → Publish
3. Your app will be live instantly

### Manual Deployment

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

#### Other Platforms
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🎨 Customization

### Theme Configuration

Modify `tailwind.config.ts` to customize the design:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // Add custom colors here
      },
    },
  },
}
```

### Adding UI Components

```bash
# Add new shadcn/ui components
npx shadcn-ui@latest add [component-name]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/ergocharge-store/issues)
- **Documentation**: [Project Wiki](https://github.com/yourusername/ergocharge-store/wiki)
- **Email**: support@ergocharge.com

---

**Built with ❤️ using modern web technologies**
