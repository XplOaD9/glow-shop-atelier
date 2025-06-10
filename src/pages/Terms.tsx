
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Terms & Conditions</h1>
            <p className="text-muted-foreground">
              Last updated: January 1, 2024
            </p>
          </div>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the ErgoCharge website and services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Products and Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ErgoCharge provides premium charging solutions and related accessories. We reserve the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Modify or discontinue products without notice</li>
                <li>Update product specifications as needed</li>
                <li>Change pricing with reasonable notice</li>
                <li>Limit quantities available for purchase</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Orders and Payment</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you place an order, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate and complete information</li>
                <li>Pay all charges at the prices in effect when incurred</li>
                <li>Understand that order confirmation does not guarantee availability</li>
                <li>Accept that we may cancel orders for any reason</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Shipping and Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                Shipping times are estimates and not guaranteed. ErgoCharge is not responsible for delays caused by shipping carriers, customs, or other factors beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Returns and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We offer a 30-day return policy for unused products in original packaging. Conditions include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Items must be in original condition</li>
                <li>Original packaging and accessories must be included</li>
                <li>Customer is responsible for return shipping costs</li>
                <li>Refunds processed within 5-10 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Warranty</h2>
              <p className="text-muted-foreground leading-relaxed">
                All ErgoCharge products come with a 2-year limited warranty covering manufacturing defects. This warranty does not cover damage from misuse, accidents, or normal wear and tear.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including designs, text, graphics, and software, is the property of ErgoCharge and protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                ErgoCharge's liability is limited to the purchase price of the product. We are not liable for indirect, incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated effective date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about these terms, please contact us at legal@ergocharge.com or through our contact page.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
