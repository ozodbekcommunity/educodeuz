import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { api } from '@/db/api';
import type { Certificate, Course } from '@/types';
import { Award, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Certificates() {
  const { profile } = useAuth();
  const [certificates, setCertificates] = useState<(Certificate & { course: Course })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!profile) return;

      try {
        const data = await api.certificates.getByStudent(profile.id);
        setCertificates(data as any);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
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
        <h1 className="text-3xl font-bold">Sertifikatlar</h1>
        <p className="text-muted-foreground">
          Yakunlangan kurslar uchun sertifikatlaringiz
        </p>
      </div>

      {certificates.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Award className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
              Hozircha sertifikatlar mavjud emas
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Kurslarni yakunlang va sertifikat oling
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <Card key={cert.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Award className="w-12 h-12 text-primary" />
                  <Badge variant="outline">
                    {new Date(cert.issued_at).toLocaleDateString('uz-UZ')}
                  </Badge>
                </div>
                <CardTitle className="mt-4">{cert.course.title}</CardTitle>
                <CardDescription>
                  Kurs muvaffaqiyatli yakunlandi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Talaba: {profile?.full_name}
                  </p>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Yuklab olish
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
