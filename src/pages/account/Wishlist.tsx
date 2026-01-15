import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Wishlist() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2">{t('wishlist.title')}</h1>
        <p className="text-muted-foreground">{t('wishlist.subtitle')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            {t('wishlist.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t('wishlist.empty')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
