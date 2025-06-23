import React from 'react';
import { CheckCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface OrderSuccessModalProps {
  isOpen: boolean;
  orderId: string;
  amount: number;
  onClose: () => void;
}

const OrderSuccessModal = ({ isOpen, orderId, amount, onClose }: OrderSuccessModalProps) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[99999] p-4"
      onClick={handleBackgroundClick}
    >
      <Card className="w-full max-w-md animate-in zoom-in duration-200">
        <CardContent className="p-8 text-center space-y-6">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              Plată Completată!
            </h2>
            <p className="text-muted-foreground">
              Comanda ta a fost procesată cu succes
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">ID Comandă:</span>
              <span className="text-sm font-mono font-bold">{orderId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Plătit:</span>
              <span className="text-sm font-bold">${amount.toFixed(2)}</span>
            </div>
          </div>

          {/* Message */}
          <div className="text-sm text-muted-foreground">
            <p>Mulțumim pentru comandă! Vei primi un email de confirmare în scurt timp.</p>
          </div>

          {/* Action Button */}
          <Button 
            onClick={onClose}
            className="w-full"
            size="lg"
          >
            <Home className="w-4 h-4 mr-2" />
            Înapoi la Pagina Principală
          </Button>

          {/* Demo Notice */}
          <div className="text-xs text-muted-foreground bg-blue-50 border border-blue-200 rounded p-2">
            🧪 <strong>Demo Mode:</strong> Aceasta este o simulare - nu s-a efectuat nicio plată reală
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccessModal; 