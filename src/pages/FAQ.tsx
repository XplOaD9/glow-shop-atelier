import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSection from '@/components/NewsletterSection';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqCategories = [
    {
      title: "Shipping & Delivery",
      faqs: [
        {
          question: "How long does shipping take?",
          answer: "We offer free standard shipping (5-7 business days) and express shipping (2-3 business days). International shipping times vary by location."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination."
        },
        {
          question: "Can I track my order?",
          answer: "Absolutely! You'll receive a tracking number via email once your order ships."
        }
      ]
    },
    {
      title: "Products & Compatibility",
      faqs: [
        {
          question: "Are ErgoCharge products compatible with all devices?",
          answer: "Our wireless chargers are Qi-compatible and work with most modern smartphones. Check the product specifications for detailed compatibility information."
        },
        {
          question: "What's the warranty on ErgoCharge products?",
          answer: "All ErgoCharge products come with a 2-year limited warranty covering manufacturing defects."
        },
        {
          question: "How fast do your chargers work?",
          answer: "Our chargers support up to 15W wireless charging and various wired charging speeds depending on the product."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      faqs: [
        {
          question: "What's your return policy?",
          answer: "We offer a 30-day return policy for all products in original condition. Return shipping is free for defective items."
        },
        {
          question: "How do I return a product?",
          answer: "Contact our support team to initiate a return. We'll provide a prepaid return label and instructions."
        },
        {
          question: "Can I exchange a product?",
          answer: "Yes, exchanges are possible within 30 days for unused items in original packaging."
        }
      ]
    },
    {
      title: "Sustainability",
      faqs: [
        {
          question: "How are ErgoCharge products eco-friendly?",
          answer: "We use recycled materials, biodegradable packaging, and maintain carbon-neutral shipping practices."
        },
        {
          question: "Do you have a recycling program?",
          answer: "Yes! Send us your old chargers and we'll recycle them responsibly, plus give you a discount on your next purchase."
        }
      ]
    }
  ];

  const allFaqs = faqCategories.flatMap((category, categoryIndex) =>
    category.faqs.map((faq, faqIndex) => ({
      ...faq,
      id: categoryIndex * 100 + faqIndex,
      category: category.title
    }))
  );

  const filteredFaqs = allFaqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl transform translate-x-32 translate-y-32"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-violet-500/5 rounded-full blur-2xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Find answers to common questions about our products, shipping, and more.
          </p>
          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/90 backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {searchTerm ? (
            // Search Results
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">
                Search Results ({filteredFaqs.length})
              </h2>
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <Card key={faq.id}>
                    <CardContent className="p-0">
                      <button
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
                        onClick={() => toggleItem(faq.id)}
                      >
                        <div>
                          <h3 className="font-semibold text-lg">{faq.question}</h3>
                          <span className="text-sm text-primary">{faq.category}</span>
                        </div>
                        {openItems.includes(faq.id) ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      {openItems.includes(faq.id) && (
                        <div className="px-6 pb-6">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // Category View
            <div className="max-w-4xl mx-auto">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const faqId = categoryIndex * 100 + faqIndex;
                      return (
                        <Card key={faqId}>
                          <CardContent className="p-0">
                            <button
                              className="w-full p-6 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
                              onClick={() => toggleItem(faqId)}
                            >
                              <h3 className="font-semibold text-lg">{faq.question}</h3>
                              {openItems.includes(faqId) ? (
                                <ChevronUp className="w-5 h-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                              )}
                            </button>
                            {openItems.includes(faqId) && (
                              <div className="px-6 pb-6">
                                <p className="text-muted-foreground">{faq.answer}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Contact Support
            </a>
            <a
              href="mailto:hello@ergocharge.com"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <NewsletterSection />

      <Footer />
    </div>
  );
};

export default FAQ;
