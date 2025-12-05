import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { api } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import type { Course } from '@/types';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function AdminCourses() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    is_published: false
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await api.courses.getAll();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({
        title: 'Xato',
        description: 'Kurs nomini kiriting',
        variant: 'destructive'
      });
      return;
    }

    if (!profile?.id) {
      toast({
        title: 'Xato',
        description: 'Foydalanuvchi ma\'lumotlari topilmadi',
        variant: 'destructive'
      });
      return;
    }

    setSubmitting(true);
    try {
      if (editingCourse) {
        await api.courses.update(editingCourse.id, formData);
        toast({
          title: 'Muvaffaqiyatli',
          description: 'Kurs yangilandi'
        });
      } else {
        await api.courses.create({
          ...formData,
          created_by: profile.id
        });
        toast({
          title: 'Muvaffaqiyatli',
          description: 'Kurs yaratildi'
        });
      }

      setDialogOpen(false);
      resetForm();
      fetchCourses();
    } catch (error: any) {
      console.error('Course creation error:', error);
      toast({
        title: 'Xato',
        description: error.message || 'Kursni saqlashda xatolik yuz berdi',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description || '',
      thumbnail: course.thumbnail || '',
      is_published: course.is_published
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Kursni o\'chirmoqchimisiz?')) return;

    try {
      await api.courses.delete(id);
      toast({
        title: 'Muvaffaqiyatli',
        description: 'Kurs o\'chirildi'
      });
      fetchCourses();
    } catch (error: any) {
      toast({
        title: 'Xato',
        description: error.message || 'Kursni o\'chirishda xatolik yuz berdi',
        variant: 'destructive'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      thumbnail: '',
      is_published: false
    });
    setEditingCourse(null);
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
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Kurslar boshqaruvi</h1>
          <p className="text-muted-foreground">Kurslarni yaratish va tahrirlash</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Yangi kurs
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingCourse ? 'Kursni tahrirlash' : 'Yangi kurs yaratish'}</DialogTitle>
            <DialogDescription>
              Kurs ma'lumotlarini kiriting
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Kurs nomi *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Masalan: JavaScript asoslari"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Tavsif</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Kurs haqida qisqacha ma'lumot"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Rasm URL</Label>
              <Input
                id="thumbnail"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.is_published}
                onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
              />
              <Label htmlFor="published">Kursni nashr qilish</Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Bekor qilish
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Yuklanmoqda...' : (editingCourse ? 'Yangilash' : 'Yaratish')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium text-muted-foreground">
              Hozircha kurslar mavjud emas
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {course.description || 'Tavsif mavjud emas'}
                    </CardDescription>
                  </div>
                  {course.is_published && (
                    <span className="px-2 py-1 text-xs bg-success text-success-foreground rounded">
                      Nashr
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/admin/courses/${course.id}/lessons`}>
                    <Eye className="w-4 h-4 mr-2" />
                    Darslarni ko'rish
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => handleEdit(course)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Tahrirlash
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(course.id)}>
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
