import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { api } from '@/db/api';
import type { Course, Lesson, StudentProgress } from '@/types';
import { BookOpen, CheckCircle2, Circle, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const { profile } = useAuth();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId || !profile) return;

      try {
        const [courseData, lessonsData, progressData] = await Promise.all([
          api.courses.getById(courseId),
          api.lessons.getByCourseId(courseId),
          api.progress.getByStudentAndCourse(profile.id, courseId)
        ]);

        setCourse(courseData);
        setLessons(lessonsData);
        setProgress(progressData);
      } catch (error) {
        console.error('Error fetching course data:', error);
        toast({
          title: 'Xato',
          description: 'Kurs ma\'lumotlarini yuklashda xatolik yuz berdi',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, profile]);

  const completedLessons = progress.filter(p => p.completed).length;
  const progressPercentage = lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0;

  const isLessonCompleted = (lessonId: string) => {
    return progress.some(p => p.lesson_id === lessonId && p.completed);
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
            <Button asChild className="mt-4">
              <Link to="/courses">Kurslarga qaytish</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-3xl">{course.title}</CardTitle>
              <CardDescription className="text-base">
                {course.description || 'Tavsif mavjud emas'}
              </CardDescription>
            </div>
            {progressPercentage === 100 && (
              <Badge variant="default" className="bg-success">
                <Award className="w-4 h-4 mr-1" />
                Yakunlangan
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">O'quv jarayoni</span>
              <span className="font-medium">{completedLessons} / {lessons.length} dars</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Darslar</h2>
        {lessons.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                Bu kursda hozircha darslar mavjud emas
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {lessons.map((lesson, index) => {
              const completed = isLessonCompleted(lesson.id);
              return (
                <Card key={lesson.id} className={completed ? 'border-success' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                          {completed ? (
                            <CheckCircle2 className="w-6 h-6 text-success" />
                          ) : (
                            <Circle className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            {index + 1}. {lesson.title}
                          </CardTitle>
                          {completed && (
                            <Badge variant="outline" className="mt-1 text-success border-success">
                              Yakunlangan
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button asChild>
                        <Link to={`/lessons/${lesson.id}`}>
                          {completed ? 'Qayta ko\'rish' : 'Boshlash'}
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
