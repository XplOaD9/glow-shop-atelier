import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

interface ReviewContextType {
  reviews: Review[];
  getReviewsByProduct: (productId: string) => Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getAverageRating: (productId: string) => number;
  getTotalReviews: (productId: string) => number;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

// Generate reviews function to create multiple reviews for each product
const generateReviews = (): Review[] => {
  const reviews: Review[] = [];
  let reviewId = 1;

  const reviewTemplates = [
    { rating: 5, comment: 'Excellent build quality and fast charging. Highly recommended!', userName: 'Alexandra M.' },
    { rating: 5, comment: 'Perfect for my home office setup. Very elegant design.', userName: 'David R.' },
    { rating: 5, comment: 'Încărcare rapidă și design premium. Mulțumit de achiziție!', userName: 'Cristina P.' },
    { rating: 5, comment: 'Best wireless charger I\'ve ever used. Worth every penny.', userName: 'Michael T.' },
    { rating: 5, comment: 'Calitate excelentă, încărcare foarte rapidă pentru iPhone-ul meu.', userName: 'Elena C.' },
    { rating: 5, comment: 'Sleek design, works perfectly with my Samsung Galaxy.', userName: 'James W.' },
    { rating: 5, comment: 'Foarte mulțumită! Se încarcă rapid și arată foarte bine pe birou.', userName: 'Ana-Maria D.' },
    { rating: 5, comment: 'Premium quality materials and excellent performance.', userName: 'Robert K.' },
    { rating: 5, comment: 'Design elegant și funcționalitate perfectă. Recomand cu încredere!', userName: 'Ioana V.' },
    { rating: 5, comment: 'Fast charging and the LED indicator is very helpful.', userName: 'Thomas H.' },
    { rating: 5, comment: 'Amazing build quality. My phone charges super fast!', userName: 'Andrew S.' },
    { rating: 5, comment: 'Perfect pentru biroul meu. Design modern și elegant.', userName: 'Raluca B.' },
    { rating: 5, comment: 'Works flawlessly with my iPhone 15 Pro Max.', userName: 'Kevin L.' },
    { rating: 5, comment: 'Încărcare wireless perfectă, nu mai am nevoie de cabluri!', userName: 'Daniela F.' },
    { rating: 5, comment: 'Great portable solution! I take it everywhere.', userName: 'Maria S.' },
    { rating: 5, comment: 'Compact și eficient. Perfect pentru călătorii!', userName: 'Gabriel N.' },
    { rating: 5, comment: 'Small but powerful. Great for travel.', userName: 'Lisa M.' },
    { rating: 5, comment: 'Beautiful glass design and super fast charging!', userName: 'Rachel G.' },
    { rating: 5, comment: 'Design cu adevărat premium. Sticla arată fantastic!', userName: 'Cătălin M.' },
    { rating: 5, comment: 'Gorgeous design, works perfectly with my iPhone.', userName: 'Jessica R.' },
    { rating: 5, comment: 'Perfect for my car! Holds phone securely while charging.', userName: 'Mark T.' },
    { rating: 5, comment: 'Foarte util în mașină. Se fixează bine și încarcă rapid.', userName: 'Lavinia R.' },
    { rating: 5, comment: 'Amazing desktop station! Charges all my devices simultaneously.', userName: 'Jonathan H.' },
    { rating: 5, comment: 'Stația perfectă pentru biroul meu. Încarcă toate dispozitivele odată!', userName: 'Carmen L.' },
    { rating: 5, comment: 'Complete travel solution! Has everything I need.', userName: 'Nina K.' },
    { rating: 5, comment: 'Kit complet pentru călătorii. Foarte bine organizat!', userName: 'Radu S.' },
    { rating: 5, comment: 'Best ergonomic mouse I\'ve ever used! No more wrist pain.', userName: 'Alex C.' },
    { rating: 5, comment: 'Design ergonomic excelent. Foarte confortabil pentru muncă îndelungată.', userName: 'Mădălina I.' },
    { rating: 5, comment: 'RGB lighting is gorgeous and typing feel is incredible!', userName: 'Ryan B.' },
    { rating: 5, comment: 'Tastatură mecanică de calitate superioară. RGB-ul arată spectaculos!', userName: 'Oana D.' },
    { rating: 5, comment: 'Perfect phone dock! Adjustable angle is very convenient.', userName: 'Jason M.' },
    { rating: 5, comment: 'Dock elegant pentru telefon. Unghiul reglabil este foarte util!', userName: 'Elena F.' },
    { rating: 5, comment: 'Convenient mouse charging dock. LED indicators are helpful.', userName: 'Hannah W.' },
    { rating: 5, comment: 'Perfect pentru mouse-ul wireless. Se încarcă rapid și eficient.', userName: 'Bogdan A.' },
    { rating: 5, comment: '4K quality is crystal clear! Great cable construction.', userName: 'Nathan D.' },
    { rating: 5, comment: 'Cablu HDMI de calitate premium. Imaginea 4K arată perfect!', userName: 'Roxana G.' },
    { rating: 5, comment: 'Excellent build quality with braided design. Works perfectly.', userName: 'Steven P.' },
    { rating: 5, comment: 'Foarte bun pentru gaming și filme 4K. Recomand!', userName: 'Anca B.' }
  ];

  const names = [
    'Alexandra M.', 'David R.', 'Cristina P.', 'Michael T.', 'Elena C.', 'James W.', 'Ana-Maria D.',
    'Robert K.', 'Ioana V.', 'Thomas H.', 'Andrew S.', 'Raluca B.', 'Kevin L.', 'Daniela F.',
    'Maria S.', 'Gabriel N.', 'Lisa M.', 'Rachel G.', 'Cătălin M.', 'Jessica R.', 'Mark T.',
    'Lavinia R.', 'Jonathan H.', 'Carmen L.', 'Nina K.', 'Radu S.', 'Alex C.', 'Mădălina I.',
    'Ryan B.', 'Oana D.', 'Jason M.', 'Elena F.', 'Hannah W.', 'Bogdan A.', 'Nathan D.',
    'Roxana G.', 'Steven P.', 'Anca B.', 'Diana V.', 'Paul T.', 'Andreea M.', 'Chris L.',
    'Mihaela D.', 'Victor S.', 'Laura P.', 'George A.', 'Simona R.', 'Adrian C.', 'Monica B.',
    'Sebastian H.', 'Irina F.', 'Daniel O.', 'Alina T.', 'Florin N.', 'Corina M.', 'Marius K.'
  ];

  // Product counts: 11 products with 15-85 reviews each (all between 10-100)
  const productReviewCounts = [65, 42, 38, 28, 55, 35, 48, 72, 41, 25, 38]; // Total: ~487 reviews

  for (let productId = 1; productId <= 11; productId++) {
    const reviewCount = productReviewCounts[productId - 1];
    
    for (let i = 0; i < reviewCount; i++) {
      const template = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
      const name = names[Math.floor(Math.random() * names.length)];
      
      // Generate date in the last 3 months
      const daysAgo = Math.floor(Math.random() * 90);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      
      reviews.push({
        id: reviewId.toString(),
        productId: productId.toString(),
        userName: name,
        rating: 5, // All 5 stars for perfect average
        comment: template.comment,
        date: date.toISOString().split('T')[0],
        verified: Math.random() > 0.1 // 90% verified
      });
      
      reviewId++;
    }
  }
  
  return reviews;
};

const initialReviews: Review[] = generateReviews();

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const getReviewsByProduct = (productId: string): Review[] => {
    return reviews.filter(review => review.productId === productId);
  };

  const addReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const review: Review = {
      ...newReview,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      verified: false
    };
    setReviews(prev => [...prev, review]);
  };

  const getAverageRating = (productId: string): number => {
    const productReviews = getReviewsByProduct(productId);
    if (productReviews.length === 0) return 5; // Default rating
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / productReviews.length).toFixed(1));
  };

  const getTotalReviews = (productId: string): number => {
    return getReviewsByProduct(productId).length;
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      getReviewsByProduct,
      addReview,
      getAverageRating,
      getTotalReviews
    }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
}; 