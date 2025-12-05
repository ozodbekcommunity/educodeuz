import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import type { Assignment, Lesson } from '@/types';
import { ArrowLeft } from 'lucide-react';

export default function AdminAssignmentForm() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    starter_code: '',
    language: 'javascript'
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!lessonId) return;

      try {
        const [lessonData, assignmentData] = await Promise.all([
          api.lessons.getById(lessonId),
          api.assignments.getByLessonId(lessonId)
        ]);

        setLesson(lessonData);
        if (assignmentData) {
          setAssignment(assignmentData);
          setFormData({
            title: assignmentData.title,
            description: assignmentData.description,
            starter_code: assignmentData.starter_code || '',
            language: assignmentData.language
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lessonId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: 'Xato',
        description: 'Barcha majburiy maydonlarni to\'ldiring',
        variant: 'destructive'
      });
      return;
    }

    setSaving(true);
    try {
      const assignmentData = {
        lesson_id: lessonId!,
        ...formData,
        test_cases: null
      };

      if (assignment) {
        await api.assignments.update(assignment.id, assignmentData);
        toast({
          title: 'Muvaffaqiyatli',
          description: 'Topshiriq yangilandi'
        });
      } else {
        await api.assignments.create(assignmentData);
        toast({
          title: 'Muvaffaqiyatli',
          description: 'Topshiriq yaratildi'
        });
      }

      navigate(-1);
    } catch (error: any) {
      toast({
        title: 'Xato',
        description: error.message || 'Topshiriqni saqlashda xatolik yuz berdi',
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

  if (!lesson) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium text-muted-foreground">Dars topilmadi</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Orqaga
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{assignment ? 'Topshiriqni tahrirlash' : 'Yangi topshiriq yaratish'}</CardTitle>
          <CardDescription>Dars: {lesson.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Topshiriq nomi *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Masalan: Sonlarni qo'shish funksiyasi"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Tavsif *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Topshiriq shartlarini batafsil yozing..."
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Dasturlash tili</Label>
              <Input
                id="language"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                placeholder="javascript, python, java, cpp, va hokazo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="starter_code">Boshlang'ich kod (ixtiyoriy)</Label>
              <Textarea
                id="starter_code"
                value={formData.starter_code}
                onChange={(e) => setFormData({ ...formData, starter_code: e.target.value })}
                placeholder="Talaba uchun shablon kod..."
                rows={10}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Talaba ushbu koddan boshlab ishlaydi
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Bekor qilish
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Saqlanmoqda...' : assignment ? 'Yangilash' : 'Yaratish'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
