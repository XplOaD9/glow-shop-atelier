import { useState, useEffect } from 'react';
import { ThumbsUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  articleId: number;
  title: string;
  variant?: 'thumbs' | 'heart';
  size?: 'sm' | 'default' | 'lg';
  showCount?: boolean;
  className?: string;
}

interface ArticleLike {
  id: number;
  title: string;
  likedAt: string;
}

export const LikeButton = ({ 
  articleId, 
  title, 
  variant = 'thumbs',
  size = 'default',
  showCount = true,
  className 
}: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likedArticles, setLikedArticles] = useState<ArticleLike[]>([]);

  useEffect(() => {
    // Load liked articles from localStorage
    const liked = localStorage.getItem('ergocharge-liked-articles');
    if (liked) {
      const articles: ArticleLike[] = JSON.parse(liked);
      setLikedArticles(articles);
      setIsLiked(articles.some(article => article.id === articleId));
    }

    // Load like count (în realitate ar veni de la server)
    const counts = localStorage.getItem('ergocharge-article-likes');
    if (counts) {
      const likeCounts: { [key: number]: number } = JSON.parse(counts);
      setLikeCount(likeCounts[articleId] || 0);
    } else {
      // Generăm un număr random pentru demo
      setLikeCount(Math.floor(Math.random() * 50) + 5);
    }
  }, [articleId]);

  const toggleLike = () => {
    let updatedArticles: ArticleLike[];
    let newLikeCount = likeCount;

    if (isLiked) {
      // Remove like
      updatedArticles = likedArticles.filter(article => article.id !== articleId);
      newLikeCount = Math.max(0, likeCount - 1);
      setIsLiked(false);
      toast.success('Apreciere eliminată');
    } else {
      // Add like
      const newLike: ArticleLike = {
        id: articleId,
        title,
        likedAt: new Date().toISOString()
      };
      updatedArticles = [...likedArticles, newLike];
      newLikeCount = likeCount + 1;
      setIsLiked(true);
      toast.success('Mulțumim pentru apreciere! ❤️');
    }

    // Update localStorage
    setLikedArticles(updatedArticles);
    localStorage.setItem('ergocharge-liked-articles', JSON.stringify(updatedArticles));
    
    // Update like count
    setLikeCount(newLikeCount);
    const counts = localStorage.getItem('ergocharge-article-likes');
    const likeCounts: { [key: number]: number } = counts ? JSON.parse(counts) : {};
    likeCounts[articleId] = newLikeCount;
    localStorage.setItem('ergocharge-article-likes', JSON.stringify(likeCounts));
  };

  const Icon = variant === 'heart' ? Heart : ThumbsUp;
  
  const getButtonSize = () => {
    switch (size) {
      case 'sm': return 'sm';
      case 'lg': return 'lg';
      default: return 'default';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'w-3 h-3';
      case 'lg': return 'w-5 h-5';
      default: return 'w-4 h-4';
    }
  };

  return (
    <Button
      variant="outline"
      size={getButtonSize()}
      onClick={toggleLike}
      className={cn(
        "transition-all duration-200",
        isLiked && variant === 'heart' && "text-red-600 border-red-200 bg-red-50 hover:bg-red-100",
        isLiked && variant === 'thumbs' && "text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100",
        !isLiked && "hover:scale-105",
        className
      )}
    >
      <Icon 
        className={cn(
          getIconSize(),
          "mr-2 transition-transform duration-200",
          isLiked && "scale-110",
          isLiked && variant === 'heart' && "fill-current"
        )} 
      />
      {variant === 'heart' ? 'Îmi place' : 'Apreciază'}
      {showCount && (
        <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">
          {likeCount}
        </span>
      )}
    </Button>
  );
}; 