import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import type { Test, Lesson } from '@/types';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
}

export default function AdminTestForm() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [passingScore, setPassingScore] = useState(70);
  const [questions, setQuestions] = useState<Question[]>([
    { question: '', options: ['', '', '', ''], correct_answer: 0 }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      if (!lessonId) return;

      try {
        const [lessonData, testData] = await Promise.all([
          api.lessons.getById(lessonId),
          api.tests.getByLessonId(lessonId)
        ]);

        setLesson(lessonData);
        if (testData) {
          setTest(testData);
          setTitle(testData.title);
          setPassingScore(testData.passing_score);
          setQuestions(testData.questions as Question[]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lessonId]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correct_answer: 0 }]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        title: 'Xato',
        description: 'Test nomini kiriting',
        variant: 'destructive'
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: 'Xato',
        description: 'Kamida bitta savol qo\'shing',
        variant: 'destructive'
      });
      return;
    }

    for (const q of questions) {
      if (!q.question.trim() || q.options.some(o => !o.trim())) {
        toast({
          title: 'Xato',
          description: 'Barcha savollar va variantlarni to\'ldiring',
          variant: 'destructive'
        });
        return;
      }
    }

    setSaving(true);
    try {
      const testData = {
        lesson_id: lessonId!,
        title,
        questions: questions as any,
        passing_score: passingScore
      };

      if (test) {
        await api.tests.update(test.id, testData);
        toast({
          title: 'Muvaffaqiyatli',
          description: 'Test yangilandi'
        });
      } else {
        await api.tests.create(testData);
        toast({
          title: 'Muvaffaqiyatli',
          description: 'Test yaratildi'
        });
      }

      navigate(-1);
    } catch (error: any) {
      toast({
        title: 'Xato',
        description: error.message || 'Testni saqlashda xatolik yuz berdi',
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
          <CardTitle>{test ? 'Testni tahrirlash' : 'Yangi test yaratish'}</CardTitle>
          <CardDescription>Dars: {lesson.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Test nomi *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masalan: JavaScript o'zgaruvchilar testi"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passing_score">O'tish balli (%) *</Label>
              <Input
                id="passing_score"
                type="number"
                min="0"
                max="100"
                value={passingScore}
                onChange={(e) => setPassingScore(parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Savollar</Label>
                <Button type="button" onClick={handleAddQuestion} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Savol qo'shish
                </Button>
              </div>

              {questions.map((q, qIndex) => (
                <Card key={qIndex}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Savol {qIndex + 1}</CardTitle>
                      {questions.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveQuestion(qIndex)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Savol matni *</Label>
                      <Textarea
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                        placeholder="Savolni kiriting"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Javob variantlari *</Label>
                      {q.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center space-x-2">
                          <Input
                            value={option}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                            placeholder={`Variant ${oIndex + 1}`}
                          />
                          <input
                            type="radio"
                            name={`correct-${qIndex}`}
                            checked={q.correct_answer === oIndex}
                            onChange={() => handleQuestionChange(qIndex, 'correct_answer', oIndex)}
                            className="w-5 h-5"
                          />
                        </div>
                      ))}
                      <p className="text-xs text-muted-foreground">
                        To'g'ri javobni belgilang
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Bekor qilish
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Saqlanmoqda...' : test ? 'Yangilash' : 'Yaratish'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
