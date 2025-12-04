import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import { Settings, Save, Key } from 'lucide-react';

export default function AdminSettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    openrouter_api_key: '',
    openrouter_model: 'openai/gpt-4o-mini'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const [apiKey, model] = await Promise.all([
        api.settings.get('openrouter_api_key'),
        api.settings.get('openrouter_model')
      ]);

      setSettings({
        openrouter_api_key: apiKey?.value || '',
        openrouter_model: model?.value || 'openai/gpt-4o-mini'
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        api.settings.set('openrouter_api_key', settings.openrouter_api_key),
        api.settings.set('openrouter_model', settings.openrouter_model)
      ]);

      toast({
        title: 'Muvaffaqiyatli',
        description: 'Sozlamalar saqlandi'
      });
    } catch (error: any) {
      toast({
        title: 'Xato',
        description: error.message || 'Sozlamalarni saqlashda xatolik yuz berdi',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Sozlamalar</h1>
        <p className="text-muted-foreground">
          Tizim sozlamalarini boshqarish
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <CardTitle>OpenRouter API sozlamalari</CardTitle>
          </div>
          <CardDescription>
            AI kod tekshiruv uchun OpenRouter API kaliti va modelini sozlang
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="api_key">API kalit</Label>
            <Input
              id="api_key"
              type="password"
              value={settings.openrouter_api_key}
              onChange={(e) => setSettings({ ...settings, openrouter_api_key: e.target.value })}
              placeholder="sk-or-v1-..."
            />
            <p className="text-sm text-muted-foreground">
              OpenRouter API kalitini{' '}
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                openrouter.ai/keys
              </a>
              {' '}dan oling
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={settings.openrouter_model}
              onChange={(e) => setSettings({ ...settings, openrouter_model: e.target.value })}
              placeholder="openai/gpt-4o-mini"
            />
            <p className="text-sm text-muted-foreground">
              Tavsiya etiladi: openai/gpt-4o-mini (tez va arzon)
            </p>
          </div>

          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saqlanmoqda...' : 'Saqlash'}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-yellow-500/50 bg-yellow-500/5">
        <CardHeader>
          <CardTitle className="text-yellow-600 dark:text-yellow-500">⚠️ Muhim eslatma</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            • API kalit sozlanmagan bo'lsa, AI kod tekshiruv ishlamaydi
          </p>
          <p>
            • API kalitni xavfsiz saqlang va hech kimga bermang
          </p>
          <p>
            • OpenRouter orqali foydalanish uchun hisobingizda mablag' bo'lishi kerak
          </p>
          <p>
            • Har bir kod tekshiruv uchun API so'rov yuboriladi va to'lov olinadi
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
