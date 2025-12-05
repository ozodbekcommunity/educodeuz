import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/db/api';
import type { Profile } from '@/types';
import { Users, Ban, Lock, CheckCircle, XCircle } from 'lucide-react';

export default function AdminStudents() {
  const { toast } = useToast();
  const [students, setStudents] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Profile | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await api.profiles.getAllProfiles();
      // O'quvchilarni filtrlash (adminlarni ko'rsatmaslik)
      const studentsList = data.filter(profile => profile.role === 'student');
      setStudents(studentsList);
    } catch (error: any) {
      console.error('Fetch students error:', error);
      toast({
        title: 'Xato',
        description: 'O\'quvchilarni yuklashda xatolik yuz berdi',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBanToggle = async (student: Profile) => {
    try {
      const newBanStatus = !student.is_banned;
      const result = await api.profiles.adminBanUser(student.id, newBanStatus);

      if (result.success) {
        toast({
          title: 'Muvaffaqiyatli',
          description: result.message
        });
        fetchStudents();
      } else {
        toast({
          title: 'Xato',
          description: result.message,
          variant: 'destructive'
        });
      }
    } catch (error: any) {
      console.error('Ban toggle error:', error);
      toast({
        title: 'Xato',
        description: error.message || 'Xatolik yuz berdi',
        variant: 'destructive'
      });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudent) return;

    if (!newPassword || !confirmPassword) {
      toast({
        title: 'Xato',
        description: 'Barcha maydonlarni to\'ldiring',
        variant: 'destructive'
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: 'Xato',
        description: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak',
        variant: 'destructive'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Xato',
        description: 'Parollar mos kelmayapti',
        variant: 'destructive'
      });
      return;
    }

    setSubmitting(true);
    try {
      const result = await api.profiles.adminChangeUserPassword(selectedStudent.id, newPassword);

      if (result.success) {
        toast({
          title: 'Muvaffaqiyatli',
          description: result.message
        });
        setPasswordDialogOpen(false);
        setSelectedStudent(null);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast({
          title: 'Xato',
          description: result.message,
          variant: 'destructive'
        });
      }
    } catch (error: any) {
      console.error('Password change error:', error);
      toast({
        title: 'Xato',
        description: error.message || 'Parolni o\'zgartirishda xatolik yuz berdi',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <Users className="w-6 h-6 mr-2" />
                O'quvchilar boshqaruvi
              </CardTitle>
              <CardDescription>
                O'quvchilarni bloklash va parollarini o'zgartirish
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {students.length} ta o'quvchi
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">Hozircha o'quvchilar yo'q</p>
            </div>
          ) : (
            <div className="space-y-4">
              {students.map((student) => (
                <Card key={student.id} className={student.is_banned ? 'border-destructive' : ''}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          student.is_banned ? 'bg-destructive' : 'bg-primary'
                        }`}>
                          <Users className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{student.full_name}</h3>
                          <p className="text-sm text-muted-foreground">{student.phone}</p>
                          <div className="flex items-center mt-1 space-x-2">
                            {student.is_banned ? (
                              <Badge variant="destructive" className="flex items-center">
                                <XCircle className="w-3 h-3 mr-1" />
                                Bloklangan
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="flex items-center">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Faol
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedStudent(student);
                            setPasswordDialogOpen(true);
                          }}
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Parolni o'zgartirish
                        </Button>
                        <Button
                          variant={student.is_banned ? 'default' : 'destructive'}
                          size="sm"
                          onClick={() => handleBanToggle(student)}
                        >
                          <Ban className="w-4 h-4 mr-2" />
                          {student.is_banned ? 'Blokdan chiqarish' : 'Bloklash'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>O'quvchi parolini o'zgartirish</DialogTitle>
            <DialogDescription>
              {selectedStudent?.full_name} uchun yangi parol kiriting
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new_password">Yangi parol *</Label>
              <Input
                id="new_password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Yangi parol (kamida 6 ta belgi)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Parolni tasdiqlang *</Label>
              <Input
                id="confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Yangi parolni qayta kiriting"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setPasswordDialogOpen(false);
                  setSelectedStudent(null);
                  setNewPassword('');
                  setConfirmPassword('');
                }}
              >
                Bekor qilish
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'O\'zgartirilmoqda...' : 'O\'zgartirish'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
