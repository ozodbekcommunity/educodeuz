import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/db/api';
import { BookOpen, Users, FileText, Code, Settings as SettingsIcon } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    lessons: 0,
    assignments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [courses, profiles] = await Promise.all([
          api.courses.getAll(),
          api.profiles.getAllProfiles()
        ]);

        const students = profiles.filter(p => p.role === 'student');
        
        let totalLessons = 0;
        let totalAssignments = 0;
        
        for (const course of courses) {
          const lessons = await api.lessons.getByCourseId(course.id);
          totalLessons += lessons.length;
          
          for (const lesson of lessons) {
            const assignment = await api.assignments.getByLessonId(lesson.id);
            if (assignment) totalAssignments++;
          }
        }

        setStats({
          courses: courses.length,
          students: students.length,
          lessons: totalLessons,
          assignments: totalAssignments
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground">
          Platformani boshqarish va kuzatish
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kurslar</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.courses}</div>
            <p className="text-xs text-muted-foreground">Jami kurslar soni</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Talabalar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.students}</div>
            <p className="text-xs text-muted-foreground">Ro'yxatdan o'tgan talabalar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Darslar</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lessons}</div>
            <p className="text-xs text-muted-foreground">Jami darslar soni</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Topshiriqlar</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assignments}</div>
            <p className="text-xs text-muted-foreground">Amaliy topshiriqlar</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Kurslar</CardTitle>
            <CardDescription>Kurslarni boshqarish</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/admin/courses">Kurslarni boshqarish</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Talabalar</CardTitle>
            <CardDescription>Talabalar faoliyatini kuzatish</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/admin/students">Talabalarni ko'rish</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Sozlamalar</CardTitle>
            <CardDescription>Tizim sozlamalari</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/admin/settings">Sozlamalar</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
