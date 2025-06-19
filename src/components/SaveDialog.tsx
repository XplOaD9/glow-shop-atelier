import { useState, useEffect } from 'react';
import { BookmarkPlus, BookmarkCheck, Calendar, Bell, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface SaveDialogProps {
  articleId: number;
  title: string;
  category: string;
  children: React.ReactNode;
}

interface SavedArticle {
  id: number;
  title: string;
  category: string;
  savedAt: string;
  readLater: boolean;
}

export const SaveDialog = ({ articleId, title, category, children }: SaveDialogProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);

  useEffect(() => {
    // Load saved articles from localStorage
    const saved = localStorage.getItem('ergocharge-saved-articles');
    if (saved) {
      const articles: SavedArticle[] = JSON.parse(saved);
      setSavedArticles(articles);
      setIsSaved(articles.some(article => article.id === articleId));
    }
  }, [articleId]);

  const saveArticle = (readLater: boolean = false) => {
    const newArticle: SavedArticle = {
      id: articleId,
      title,
      category,
      savedAt: new Date().toISOString(),
      readLater
    };

    const existingIndex = savedArticles.findIndex(article => article.id === articleId);
    let updatedArticles: SavedArticle[];

    if (existingIndex >= 0) {
      // Update existing
      updatedArticles = [...savedArticles];
      updatedArticles[existingIndex] = newArticle;
    } else {
      // Add new
      updatedArticles = [...savedArticles, newArticle];
    }

    setSavedArticles(updatedArticles);
    localStorage.setItem('ergocharge-saved-articles', JSON.stringify(updatedArticles));
    setIsSaved(true);

    if (readLater) {
      toast.success('Articol salvat pentru citire ulterioară!');
    } else {
      toast.success('Articol salvat în biblioteca ta!');
    }
  };

  const removeArticle = () => {
    const updatedArticles = savedArticles.filter(article => article.id !== articleId);
    setSavedArticles(updatedArticles);
    localStorage.setItem('ergocharge-saved-articles', JSON.stringify(updatedArticles));
    setIsSaved(false);
    toast.success('Articol eliminat din salvate');
  };

  const getSavedCount = () => {
    return savedArticles.length;
  };

  const getCategoryCounts = () => {
    const counts: { [key: string]: number } = {};
    savedArticles.forEach(article => {
      counts[article.category] = (counts[article.category] || 0) + 1;
    });
    return counts;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-green-600" />
            ) : (
              <BookmarkPlus className="w-5 h-5" />
            )}
            {isSaved ? 'Articol salvat' : 'Salvează articolul'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Article Status */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-medium text-sm mb-2">Articol curent:</h3>
            <p className="text-sm text-muted-foreground mb-2">{title}</p>
            <Badge variant="secondary">{category}</Badge>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {!isSaved ? (
              <>
                <Button
                  className="w-full flex items-center gap-2"
                  onClick={() => saveArticle(false)}
                >
                  <BookmarkPlus className="w-4 h-4" />
                  Salvează în biblioteca mea
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => saveArticle(true)}
                >
                  <Calendar className="w-4 h-4" />
                  Salvează pentru citire ulterioară
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={removeArticle}
              >
                <BookmarkCheck className="w-4 h-4" />
                Elimină din salvate
              </Button>
            )}
          </div>

          {savedArticles.length > 0 && (
            <>
              <Separator />
              
              {/* Saved Articles Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Biblioteca ta</Label>
                  <Badge variant="outline">{getSavedCount()} articole</Badge>
                </div>
                
                {/* Categories breakdown */}
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(getCategoryCounts()).map(([cat, count]) => (
                    <div key={cat} className="flex items-center justify-between text-sm p-2 bg-muted/30 rounded">
                      <span>{cat}</span>
                      <Badge variant="secondary" className="text-xs">{count}</Badge>
                    </div>
                  ))}
                </div>

                {/* Quick access to library */}
                <Button
                  variant="ghost"
                  className="w-full text-sm"
                  onClick={() => {
                    // În viitor poți adăuga o pagină dedicată pentru articolele salvate
                    toast.info('Funcționalitate în dezvoltare: Pagina cu articolele salvate');
                  }}
                >
                  Vezi toate articolele salvate →
                </Button>
              </div>
            </>
          )}

          {/* Tips */}
          <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="font-medium mb-1 text-blue-900">💡 Știai că:</p>
            <ul className="text-blue-800 space-y-1 text-xs">
              <li>• Articolele salvate rămân în browser-ul tău</li>
              <li>• Poți accesa articolele salvate oricând</li>
              <li>• Organizarea pe categorii te ajută să găsești rapid ce cauți</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 