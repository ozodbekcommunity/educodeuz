import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { api } from '@/db/api';
import type { Course, StudentBadge, Badge as BadgeType } from '@/types';
import { BookOpen, Award, TrendingUp, Target } from 'lucide-react';

export default function Home() {
  const { profile } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [studentBadges, setStudentBadges] = useState<(StudentBadge & { badge: BadgeType })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesData, badgesData] = await Promise.all([
          api.courses.getPublished(),
          profile ? api.badges.getStudentBadges(profile.id) : []
        ]);
        setCourses(coursesData);
        setStudentBadges(badgesData as any);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [profile]);

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
        <h1 className="text-3xl font-bold">Xush kelibsiz, {profile?.full_name}! 👋</h1>
        <p className="text-muted-foreground">
          O'quv jarayoningizni davom ettiring va yangi bilimlar oling
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kurslar</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">Mavjud kurslar soni</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nishonlar</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentBadges.length}</div>
            <p className="text-xs text-muted-foreground">Qo'lga kiritilgan nishonlar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maqsad</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">Barcha kurslarni yakunlash</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">O'sish</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">O'tgan haftaga nisbatan</p>
          </CardContent>
        </Card>
      </div>

      {studentBadges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Qo'lga kiritilgan nishonlar</CardTitle>
            <CardDescription>Siz quyidagi yutuqlarga erishdingiz</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {studentBadges.map((sb) => (
                <div key={sb.id} className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
                  <div className="text-4xl">{sb.badge.icon}</div>
                  <div className="text-center">
                    <p className="font-medium">{sb.badge.name}</p>
                    <p className="text-xs text-muted-foreground">{sb.badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Mavjud kurslar</CardTitle>
          <CardDescription>O'qishni boshlash uchun kursni tanlang</CardDescription>
        </CardHeader>
        <CardContent>
          {courses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Hozircha kurslar mavjud emas
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description || 'Tavsif mavjud emas'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link to={`/courses/${course.id}`}>Boshlash</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>💡 Motivatsion xabar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            "Bilim olish - hayotning eng qimmatli investitsiyasi. Har bir yangi dars sizni maqsadingizga yaqinlashtiradi!"
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
