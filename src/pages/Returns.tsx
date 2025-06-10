
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Shield, Calendar, CreditCard } from 'lucide-react';

const Returns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Returns & Exchanges</h1>
            <p className="text-muted-foreground">
              Easy returns and exchanges for your peace of mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">30-Day Returns</h3>
                <p className="text-muted-foreground">
                  Return any item within 30 days of purchase
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Full Refunds</h3>
                <p className="text-muted-foreground">
                  Get your money back with no restocking fees
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <RotateCcw className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Free Exchanges</h3>
                <p className="text-muted-foreground">
                  Exchange for different colors or models
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground">
                  Defective items replaced immediately
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Start Your Return</h3>
            <p className="text-center text-muted-foreground mb-4">
              Need to return an item? Click below to begin the process
            </p>
            <div className="text-center">
              <Button size="lg">Initiate Return</Button>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We want you to be completely satisfied with your ErgoCharge purchase. If you're not happy with your order, you can return it within 30 days of the delivery date for a full refund.
                </p>
                <p>
                  Items must be in original condition with all packaging, accessories, and documentation included. Custom or personalized items cannot be returned unless defective.
                </p>
                <p>
                  Refunds will be processed to your original payment method within 5-7 business days after we receive your return.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How to Return Items</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                  <div>
                    <h3 className="font-semibold mb-1">Initiate Your Return</h3>
                    <p className="text-muted-foreground">
                      Contact us at returns@ergocharge.com or use our online return form with your order number.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                  <div>
                    <h3 className="font-semibold mb-1">Get Your Return Label</h3>
                    <p className="text-muted-foreground">
                      We'll email you a prepaid return shipping label within 24 hours.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                  <div>
                    <h3 className="font-semibold mb-1">Pack Your Items</h3>
                    <p className="text-muted-foreground">
                      Securely pack the items in the original packaging if possible, or any sturdy box.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">4</div>
                  <div>
                    <h3 className="font-semibold mb-1">Ship Your Return</h3>
                    <p className="text-muted-foreground">
                      Drop off your package at any authorized shipping location or schedule a pickup.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">5</div>
                  <div>
                    <h3 className="font-semibold mb-1">Receive Your Refund</h3>
                    <p className="text-muted-foreground">
                      Once we receive and process your return, your refund will be issued within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Want to exchange for a different color, size, or model? We offer free exchanges within 30 days of purchase.
                </p>
                <p>
                  Simply return the original item and place a new order for the item you want. We'll refund the return and you'll only pay any price difference.
                </p>
                <p>
                  For faster exchanges, you can also choose our advance exchange option where we ship the new item before receiving your return (credit card authorization required).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Warranty Claims</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  All ErgoCharge products come with a 2-year manufacturer warranty covering defects in materials and workmanship.
                </p>
                <p>
                  If you experience issues with your product within the warranty period, contact us at warranty@ergocharge.com with your order number and a description of the issue.
                </p>
                <p>
                  Warranty replacements are provided free of charge and do not require you to return the defective item first.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">International Returns</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  International customers can return items within 30 days. However, return shipping costs are the responsibility of the customer unless the item is defective.
                </p>
                <p>
                  Please contact us before returning international orders to get specific instructions and ensure smooth processing.
                </p>
                <p>
                  Refunds for international orders may take 7-14 business days due to international banking processes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
              <p className="text-muted-foreground">
                Have questions about returns or exchanges? Contact our customer service team at returns@ergocharge.com or through our contact page. We're here to help make the process as easy as possible.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Returns;
