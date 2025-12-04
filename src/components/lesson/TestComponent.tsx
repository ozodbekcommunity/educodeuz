import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/use-auth';
import { api } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import type { Test, TestSubmission } from '@/types';
import { CheckCircle2, XCircle, Trophy } from 'lucide-react';

interface TestComponentProps {
  test: Test;
  lessonId: string;
  courseId: string;
}

export default function TestComponent({ test, lessonId, courseId }: TestComponentProps) {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<TestSubmission | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubmission = async () => {
      if (!profile) return;
      try {
        const submission = await api.testSubmissions.getByStudentAndTest(profile.id, test.id);
        if (submission) {
          setResult(submission);
          setSubmitted(true);
        }
      } catch (error) {
        console.error('Error fetching test submission:', error);
      }
    };

    fetchSubmission();
  }, [profile, test.id]);

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionIndex]: answerIndex });
  };

  const handleSubmit = async () => {
    if (!profile) return;

    const answeredCount = Object.keys(answers).length;
    if (answeredCount < test.questions.length) {
      toast({
        title: 'Diqqat',
        description: 'Iltimos, barcha savollarga javob bering',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      let correctCount = 0;
      test.questions.forEach((question, index) => {
        if (answers[index] === question.correct_answer) {
          correctCount++;
        }
      });

      const score = Math.round((correctCount / test.questions.length) * 100);
      const passed = score >= test.passing_score;

      const submission = await api.testSubmissions.create({
        student_id: profile.id,
        test_id: test.id,
        answers,
        score,
        passed
      });

      setResult(submission);
      setSubmitted(true);

      if (passed) {
        await api.progress.markComplete(profile.id, courseId, lessonId);
        toast({
          title: 'Tabriklaymiz! 🎉',
          description: `Testdan muvaffaqiyatli o'tdingiz! Ball: ${score}%`
        });
      } else {
        toast({
          title: 'Afsuski',
          description: `Test topshirilmadi. Ball: ${score}%. O'tish balli: ${test.passing_score}%`,
          variant: 'destructive'
        });
      }
    } catch (error: any) {
      toast({
        title: 'Xato',
        description: error.message || 'Testni topshirishda xatolik yuz berdi',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
  };

  if (submitted && result) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Test natijalari</CardTitle>
              <CardDescription>Sizning natijangiz</CardDescription>
            </div>
            {result.passed ? (
              <Trophy className="w-12 h-12 text-success" />
            ) : (
              <XCircle className="w-12 h-12 text-destructive" />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Ball</span>
              <span className="font-bold text-lg">{result.score}%</span>
            </div>
            <Progress value={result.score} className="h-3" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">O'tish balli</p>
                  <p className="text-2xl font-bold">{test.passing_score}%</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Holat</p>
                  <p className={`text-2xl font-bold ${result.passed ? 'text-success' : 'text-destructive'}`}>
                    {result.passed ? 'O\'tdi' : 'O\'tmadi'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {!result.passed && (
            <Button onClick={handleRetry} className="w-full">
              Qayta urinish
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{test.title}</CardTitle>
        <CardDescription>
          Barcha savollarga javob bering. O'tish balli: {test.passing_score}%
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {test.questions.map((question, qIndex) => (
          <Card key={qIndex}>
            <CardHeader>
              <CardTitle className="text-lg">
                {qIndex + 1}. {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[qIndex]?.toString()}
                onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))}
              >
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                    <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} />
                    <Label htmlFor={`q${qIndex}-o${oIndex}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}

        <Button onClick={handleSubmit} disabled={loading} className="w-full" size="lg">
          {loading ? 'Yuklanmoqda...' : 'Testni topshirish'}
        </Button>
      </CardContent>
    </Card>
  );
}
