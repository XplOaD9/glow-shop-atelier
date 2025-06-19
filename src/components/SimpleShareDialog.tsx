import { useState, useEffect } from 'react';
import { Share2, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface SimpleShareDialogProps {
  url: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const SimpleShareDialog = ({ url, title, description, children }: SimpleShareDialogProps) => {
  const [copied, setCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFullUrl(`${window.location.origin}${url}`);
    }
  }, [url]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success('Link copiat în clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Nu s-a putut copia linkul');
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Articol interesant: ${title}`);
    const body = encodeURIComponent(
      `Salut!\n\nAm găsit acest articol interesant și am vrut să îl împărtășesc cu tine:\n\n${title}\n${description}\n\n${fullUrl}\n\nCitire plăcută!`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${title}\n${description}\n${fullUrl}`);
    const whatsAppUrl = `https://wa.me/?text=${text}`;
    window.open(whatsAppUrl, '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Distribuie articolul
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Copy Link Section */}
          <div className="space-y-2">
            <Label htmlFor="link">Link articol</Label>
            <div className="flex space-x-2">
              <Input
                id="link"
                value={fullUrl}
                readOnly
                className="flex-1"
              />
              <Button
                type="button"
                size="sm"
                className="px-3"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Share Options */}
          <div className="space-y-3">
            <Label>Opțiuni de distribuire</Label>
            <div className="grid gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-start"
                onClick={shareViaEmail}
              >
                <Mail className="w-4 h-4" />
                Trimite prin email
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-start"
                onClick={shareOnWhatsApp}
              >
                <ExternalLink className="w-4 h-4" />
                Distribuie pe WhatsApp
              </Button>
            </div>
          </div>

          <Separator />

          {/* Tip */}
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <p className="font-medium mb-1">💡 Sfat:</p>
            <p>Copiază linkul pentru a-l trimite direct prietenilor tăi!</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 