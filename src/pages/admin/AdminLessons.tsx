import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import type { Course, Lesson, Test, Assignment } from '@/types';
import { Plus, Edit, Trash2, ArrowLeft, FileText, Code } from 'lucide-react';

export default function AdminLessons() {
  const { courseId } = useParams<{ courseId: string }>();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    order_index: 0
  });

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fetchData = async () => {
    if (!courseId) return;

    try {
      const [courseData, lessonsData] = await Promise.all([
        api.courses.getById(courseId),
        api.lessons.getByCourseId(courseId)
      ]);

      setCourse(courseData);
      setLessons(lessonsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: 'Xato',
        description: 'Barcha maydonlarni to\'ldiring',
        variant: 'destructive'
      });
      return;
    }

    try {
      if (editingLesson) {
        await api.lessons.update(editingLesson.id, formData);
        toast({
          title: 'Muvaffaqiyatli',
          description: 'Dars yangilandi'
        });
      } else {
        await api.lessons.create({
          ...formData,
          course_id: courseId!
        });
        toast({
          title: 'Muvaffaqiyatli',
          description: 'Dars yaratildi'
        });
      }

      setDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Xato',
        description: error.message || 'Darsni saqlashda xatolik yuz berdi',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setFormData({
      title: lesson.title,
      content: lesson.content,
      order_index: lesson.order_index
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Darsni o\'chirmoqchimisiz?')) return;

    try {
      await api.lessons.delete(id);
      toast({
        title: 'Muvaffaqiyatli',
        description: 'Dars o\'chirildi'
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Xato',
        description: error.message || 'Darsni o\'chirishda xatolik yuz berdi',
        variant: 'destructive'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      order_index: lessons.length
    });
    setEditingLesson(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium text-muted-foreground">Kurs topilmadi</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Button variant="ghost" asChild>
            <Link to="/admin/courses">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kurslarga qaytish
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">Darslarni boshqarish</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yangi dars
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingLesson ? 'Darsni tahrirlash' : 'Yangi dars yaratish'}</DialogTitle>
              <DialogDescription>
                Dars ma'lumotlarini kiriting
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Dars nomi *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Masalan: O'zgaruvchilar va ma'lumot turlari"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Tartib raqami</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Dars matni (HTML) *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="<h2>Kirish</h2><p>Bu darsda...</p>"
                  rows={12}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  HTML formatida yozing. Masalan: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;code&gt;
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Bekor qilish
                </Button>
                <Button type="submit">
                  {editingLesson ? 'Yangilash' : 'Yaratish'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {lessons.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium text-muted-foreground">
              Hozircha darslar mavjud emas
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>
                      {lesson.order_index + 1}. {lesson.title}
                    </CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {lesson.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => handleEdit(lesson)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Tahrirlash
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/admin/lessons/${lesson.id}/test`}>
                      <FileText className="w-4 h-4 mr-2" />
                      Test
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/admin/lessons/${lesson.id}/assignment`}>
                      <Code className="w-4 h-4 mr-2" />
                      Topshiriq
                    </Link>
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(lesson.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
