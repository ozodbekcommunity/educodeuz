import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { api } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import type { Lesson, Test, Assignment, StudentProgress } from '@/types';
import { BookOpen, FileText, Code, CheckCircle2 } from 'lucide-react';
import TestComponent from '@/components/lesson/TestComponent';
import AssignmentComponent from '@/components/lesson/AssignmentComponent';

export default function LessonView() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [test, setTest] = useState<Test | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    const fetchData = async () => {
      if (!lessonId || !profile) return;

      try {
        const [lessonData, testData, assignmentData, progressData] = await Promise.all([
          api.lessons.getById(lessonId),
          api.tests.getByLessonId(lessonId),
          api.assignments.getByLessonId(lessonId),
          api.progress.getByStudentAndLesson(profile.id, lessonId)
        ]);

        setLesson(lessonData);
        setTest(testData);
        setAssignment(assignmentData);
        setProgress(progressData);
      } catch (error) {
        console.error('Error fetching lesson data:', error);
        toast({
          title: 'Xato',
          description: 'Dars ma\'lumotlarini yuklashda xatolik yuz berdi',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lessonId, profile]);

  const handleMarkComplete = async () => {
    if (!lesson || !profile) return;

    try {
      await api.progress.markComplete(profile.id, lesson.course_id, lesson.id);
      setProgress({ ...progress!, completed: true, completed_at: new Date().toISOString() });
      toast({
        title: 'Tabriklaymiz! 🎉',
        description: 'Darsni muvaffaqiyatli yakunladingiz'
      });
      navigate(`/courses/${lesson.course_id}`);
    } catch (error: any) {
      toast({
        title: 'Xato',
        description: error.message || 'Darsni yakunlashda xatolik yuz berdi',
        variant: 'destructive'
      });
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

  const hasTest = !!test;
  const hasAssignment = !!assignment;
  const isCompleted = progress?.completed || false;

  return (
    <div className="container py-8 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl">{lesson.title}</CardTitle>
              {isCompleted && (
                <div className="flex items-center text-success">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  <span className="font-medium">Yakunlangan</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className={`grid w-full ${hasTest && hasAssignment ? 'grid-cols-3' : hasTest || hasAssignment ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <TabsTrigger value="content">
            <BookOpen className="w-4 h-4 mr-2" />
            Dars matni
          </TabsTrigger>
          {hasTest && (
            <TabsTrigger value="test">
              <FileText className="w-4 h-4 mr-2" />
              Test
            </TabsTrigger>
          )}
          {hasAssignment && (
            <TabsTrigger value="assignment">
              <Code className="w-4 h-4 mr-2" />
              Amaliy topshiriq
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
            </CardContent>
          </Card>

          {!isCompleted && (
            <div className="flex justify-end">
              <Button onClick={handleMarkComplete} size="lg">
                Darsni yakunlash
              </Button>
            </div>
          )}
        </TabsContent>

        {hasTest && (
          <TabsContent value="test">
            <TestComponent test={test!} lessonId={lesson.id} courseId={lesson.course_id} />
          </TabsContent>
        )}

        {hasAssignment && (
          <TabsContent value="assignment">
            <AssignmentComponent assignment={assignment!} lessonId={lesson.id} courseId={lesson.course_id} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
