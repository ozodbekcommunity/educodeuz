import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/use-auth';
import { api } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import type { Assignment, AssignmentSubmission } from '@/types';
import { CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react';
import Editor from '@monaco-editor/react';

interface AssignmentComponentProps {
  assignment: Assignment;
  lessonId: string;
  courseId: string;
}

export default function AssignmentComponent({ assignment, lessonId, courseId }: AssignmentComponentProps) {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [code, setCode] = useState(assignment.starter_code || '');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<AssignmentSubmission | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const fetchSubmission = async () => {
      if (!profile) return;
      try {
        const submission = await api.assignmentSubmissions.getByStudentAndAssignment(profile.id, assignment.id);
        if (submission) {
          setResult(submission);
          setSubmitted(true);
          setCode(submission.code);
        }
      } catch (error) {
        console.error('Error fetching assignment submission:', error);
      }
    };

    fetchSubmission();
  }, [profile, assignment.id]);

  const checkWithAI = async (code: string): Promise<{ passed: boolean; feedback: string; score: number }> => {
    try {
      const apiKey = await api.settings.get('openrouter_api_key');
      const model = await api.settings.get('openrouter_model');

      if (!apiKey?.value) {
        return {
          passed: false,
          feedback: 'AI tekshiruv sozlanmagan. Admin OpenRouter API kalitini sozlashi kerak.',
          score: 0
        };
      }

      const prompt = `
Quyidagi kod topshirig'ini tekshiring:

Topshiriq: ${assignment.title}
Tavsif: ${assignment.description}

Talaba kodi:
\`\`\`${assignment.language}
${code}
\`\`\`

Iltimos, kodni tekshiring va quyidagi formatda javob bering:
1. Kod to'g'ri ishlayaptimi? (ha/yo'q)
2. Qanday xatolar bor?
3. Takomillashtirish bo'yicha tavsiyalar
4. Ball (0-100)

Javobni JSON formatida bering:
{
  "passed": true/false,
  "feedback": "batafsil fikr",
  "score": 0-100
}
`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey.value}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model?.value || 'openai/gpt-4o-mini',
          messages: [
            { role: 'user', content: prompt }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('AI tekshiruvda xatolik yuz berdi');
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          passed: parsed.passed || false,
          feedback: parsed.feedback || aiResponse,
          score: parsed.score || 0
        };
      }

      return {
        passed: false,
        feedback: aiResponse,
        score: 0
      };
    } catch (error: any) {
      console.error('AI check error:', error);
      return {
        passed: false,
        feedback: `AI tekshiruvda xatolik: ${error.message}`,
        score: 0
      };
    }
  };

  const handleSubmit = async () => {
    if (!profile) return;

    if (!code.trim()) {
      toast({
        title: 'Diqqat',
        description: 'Iltimos, kod yozing',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    setChecking(true);

    try {
      const aiResult = await checkWithAI(code);

      const submission = await api.assignmentSubmissions.create({
        student_id: profile.id,
        assignment_id: assignment.id,
        code,
        ai_feedback: aiResult.feedback,
        score: aiResult.score,
        passed: aiResult.passed
      });

      setResult(submission);
      setSubmitted(true);

      if (aiResult.passed) {
        await api.progress.markComplete(profile.id, courseId, lessonId);
        toast({
          title: 'Tabriklaymiz! 🎉',
          description: `Topshiriq muvaffaqiyatli bajarildi! Ball: ${aiResult.score}`
        });
      } else {
        toast({
          title: 'Topshiriq bajarilmadi',
          description: 'AI fikr-mulohazasini ko\'ring',
          variant: 'destructive'
        });
      }
    } catch (error: any) {
      toast({
        title: 'Xato',
        description: error.message || 'Topshiriqni topshirishda xatolik yuz berdi',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
      setChecking(false);
    }
  };

  const handleRetry = () => {
    setCode(assignment.starter_code || '');
    setSubmitted(false);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{assignment.title}</CardTitle>
          <CardDescription>{assignment.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {submitted && result && (
            <Alert variant={result.passed ? 'default' : 'destructive'}>
              <div className="flex items-start space-x-2">
                {result.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <div className="flex-1 space-y-2">
                  <AlertDescription>
                    <p className="font-medium mb-2">
                      {result.passed ? 'Topshiriq bajarildi!' : 'Topshiriq bajarilmadi'}
                    </p>
                    <p className="text-sm">Ball: {result.score}/100</p>
                    {result.ai_feedback && (
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">AI fikr-mulohazasi:</p>
                        <p className="text-sm whitespace-pre-wrap">{result.ai_feedback}</p>
                      </div>
                    )}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}

          <div className="border rounded-lg overflow-hidden">
            <Editor
              height="400px"
              language={assignment.language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                readOnly: submitted && result?.passed
              }}
            />
          </div>

          {checking && (
            <Alert>
              <Loader2 className="w-4 h-4 animate-spin" />
              <AlertDescription>
                AI kod tekshirmoqda... Bu bir necha soniya davom etishi mumkin.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3">
            {(!submitted || !result?.passed) && (
              <Button onClick={handleSubmit} disabled={loading} className="flex-1" size="lg">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Tekshirilmoqda...
                  </>
                ) : (
                  'Topshiriqni topshirish'
                )}
              </Button>
            )}
            {submitted && !result?.passed && (
              <Button onClick={handleRetry} variant="outline" size="lg">
                Qayta urinish
              </Button>
            )}
          </div>

          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              Kodingiz AI tomonidan tekshiriladi. Natija bir necha soniya ichida tayyor bo'ladi.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
