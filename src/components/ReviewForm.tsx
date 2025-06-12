import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useReviews } from '@/contexts/ReviewContext';
import { toast } from '@/hooks/use-toast';

interface ReviewFormProps {
  productId: string;
  productName: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, productName }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addReview } = useReviews();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim() || !comment.trim() || rating === 0) {
      toast({
        title: "Eroare",
        description: "Vă rugăm să completați toate câmpurile și să selectați un rating.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      addReview({
        productId,
        userName: userName.trim(),
        rating,
        comment: comment.trim()
      });
      
      toast({
        title: "Review adăugat!",
        description: "Mulțumim pentru feedback-ul dumneavoastră!",
      });
      
      // Reset form
      setRating(0);
      setUserName('');
      setComment('');
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A apărut o eroare la adăugarea review-ului. Încercați din nou.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scrieți un review pentru {productName}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Rating *
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 hover:scale-110 transition-transform"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 && `${rating} din 5 stele`}
              </span>
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="userName" className="text-sm font-medium mb-2 block">
              Numele dumneavoastră *
            </label>
            <Input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ex: Maria P."
              maxLength={50}
            />
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="text-sm font-medium mb-2 block">
              Review-ul dumneavoastră *
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Spuneți-ne ce părere aveți despre acest produs..."
              rows={4}
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground mt-1">
              {comment.length}/500 caractere
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Se adaugă...'
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Adaugă Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm; 