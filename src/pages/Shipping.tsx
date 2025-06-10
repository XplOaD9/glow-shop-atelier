
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Clock, MapPin, Package } from 'lucide-react';

const Shipping = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Shipping Information</h1>
            <p className="text-muted-foreground">
              Fast, reliable shipping for all your ErgoCharge products
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-muted-foreground">
                  On orders over $75 within the continental US
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
                <p className="text-muted-foreground">
                  Orders ship within 1-2 business days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Shipping</h3>
                <p className="text-muted-foreground">
                  We ship to over 50 countries worldwide
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Package className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure Packaging</h3>
                <p className="text-muted-foreground">
                  Eco-friendly packaging with tracking included
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Rates & Times</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="border border-border p-3 text-left">Shipping Method</th>
                      <th className="border border-border p-3 text-left">Cost</th>
                      <th className="border border-border p-3 text-left">Delivery Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3">Standard Shipping (US)</td>
                      <td className="border border-border p-3">$5.99 (Free over $75)</td>
                      <td className="border border-border p-3">3-5 business days</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Express Shipping (US)</td>
                      <td className="border border-border p-3">$12.99</td>
                      <td className="border border-border p-3">1-2 business days</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Overnight Shipping (US)</td>
                      <td className="border border-border p-3">$24.99</td>
                      <td className="border border-border p-3">Next business day</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">International Standard</td>
                      <td className="border border-border p-3">$15.99</td>
                      <td className="border border-border p-3">7-14 business days</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">International Express</td>
                      <td className="border border-border p-3">$29.99</td>
                      <td className="border border-border p-3">3-7 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Order Processing</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Orders are processed Monday through Friday, excluding holidays. Orders placed after 2 PM EST will be processed the following business day.
                </p>
                <p>
                  You will receive an email confirmation when your order is placed and another when it ships, including tracking information.
                </p>
                <p>
                  Custom orders or personalized items may require additional processing time of 3-5 business days.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">International Shipping</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We ship to most countries worldwide. International customers are responsible for any customs duties, taxes, or fees imposed by their country.
                </p>
                <p>
                  Shipping times may vary depending on customs processing and local delivery services. Remote areas may require additional delivery time.
                </p>
                <p>
                  All international shipments include tracking information and insurance coverage.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We currently do not ship to PO Boxes, APO/FPO addresses, or certain remote locations. Please provide a physical address for delivery.
                </p>
                <p>
                  Some products may have shipping restrictions due to battery regulations. These restrictions will be noted on the product page.
                </p>
                <p>
                  Weather conditions or carrier delays may occasionally impact delivery times, especially during peak seasons.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Lost or Damaged Packages</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If your package is lost or damaged during shipping, please contact us immediately at shipping@ergocharge.com with your order number and tracking information.
                </p>
                <p>
                  We will work with the shipping carrier to resolve the issue and ensure you receive your products or a full replacement.
                </p>
                <p>
                  All shipments are insured against loss or damage during transit.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                For any shipping questions or concerns, please contact our customer service team at shipping@ergocharge.com or through our contact page.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shipping;
