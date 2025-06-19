import { useState, useEffect } from 'react';
import { Share2, Mail, Link, MessageCircle, Check, Copy, ExternalLink } from 'lucide-react';
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

interface ShareDialogProps {
  url: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const ShareDialog = ({ url, title, description, children }: ShareDialogProps) => {
  const [copied, setCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    setFullUrl(`${window.location.origin}${url}`);
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

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${title} - ${description}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(fullUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
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

          {/* Social Media Buttons */}
          <div className="space-y-3">
            <Label>Distribuie pe rețelele sociale</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-start"
                onClick={shareViaEmail}
              >
                <Mail className="w-4 h-4" />
                Email
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-start"
                onClick={shareOnWhatsApp}
              >
                <MessageCircle className="w-4 h-4 text-green-600" />
                WhatsApp
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-start"
                onClick={shareOnFacebook}
              >
                <ExternalLink className="w-4 h-4 text-blue-600" />
                Facebook
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-start"
                onClick={shareOnTwitter}
              >
                <ExternalLink className="w-4 h-4 text-blue-400" />
                Twitter
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-start col-span-2"
                onClick={shareOnLinkedIn}
              >
                <ExternalLink className="w-4 h-4 text-blue-700" />
                LinkedIn
              </Button>
            </div>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <p className="font-medium mb-1">💡 Sfat:</p>
            <p>Poți copia linkul și să îl trimiți direct prietenilor tăi sau să îl salvezi pentru mai târziu!</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 