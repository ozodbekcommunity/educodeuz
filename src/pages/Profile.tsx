import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/use-auth';
import { api } from '@/db/api';
import type { StudentBadge, Badge as BadgeType, Course, StudentProgress } from '@/types';
import { User, Award, BookOpen, TrendingUp } from 'lucide-react';

export default function Profile() {
  const { profile } = useAuth();
  const [badges, setBadges] = useState<(StudentBadge & { badge: BadgeType })[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile) return;

      try {
        const [badgesData, coursesData] = await Promise.all([
          api.badges.getStudentBadges(profile.id),
          api.courses.getPublished()
        ]);

        setBadges(badgesData as any);
        setCourses(coursesData);

        const allProgress: StudentProgress[] = [];
        for (const course of coursesData) {
          const courseProgress = await api.progress.getByStudentAndCourse(profile.id, course.id);
          allProgress.push(...courseProgress);
        }
        setProgress(allProgress);
      } catch (error) {
        console.error('Error fetching profile data:', error);
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

  const completedLessons = progress.filter(p => p.completed).length;
  const totalLessons = progress.length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="container py-8 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl">{profile?.full_name}</CardTitle>
              <CardDescription>{profile?.phone}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yakunlangan darslar</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedLessons}</div>
            <p className="text-xs text-muted-foreground">Jami {totalLessons} darsdan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nishonlar</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{badges.length}</div>
            <p className="text-xs text-muted-foreground">Qo'lga kiritilgan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">O'quv jarayoni</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
            <p className="text-xs text-muted-foreground">Umumiy progress</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>O'quv jarayoni</CardTitle>
          <CardDescription>Barcha kurslar bo'yicha umumiy progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="h-3" />
        </CardContent>
      </Card>

      {badges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Qo'lga kiritilgan nishonlar</CardTitle>
            <CardDescription>Sizning yutuqlaringiz</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {badges.map((sb) => (
                <Card key={sb.id}>
                  <CardContent className="flex flex-col items-center justify-center py-6 space-y-2">
                    <div className="text-5xl">{sb.badge.icon}</div>
                    <div className="text-center">
                      <p className="font-medium">{sb.badge.name}</p>
                      <p className="text-sm text-muted-foreground">{sb.badge.description}</p>
                    </div>
                    <Badge variant="outline">
                      {new Date(sb.earned_at).toLocaleDateString('uz-UZ')}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
