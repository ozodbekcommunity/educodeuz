import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/db/api';
import { BookOpen } from 'lucide-react';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || !password) {
      toast({
        title: 'Xato',
        description: 'Iltimos, barcha maydonlarni to\'ldiring',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      await api.auth.signIn(phone, password);
      toast({
        title: 'Muvaffaqiyatli',
        description: 'Tizimga muvaffaqiyatli kirdingiz'
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Xato',
        description: error.message || 'Kirish jarayonida xatolik yuz berdi',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">EduCode.uz</CardTitle>
          <CardDescription>
            Tizimga kirish uchun telefon raqam va parolingizni kiriting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon raqam</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+998901234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Yuklanmoqda...' : 'Kirish'}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Hisobingiz yo'qmi?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Ro'yxatdan o'tish
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
