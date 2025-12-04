import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { api } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, LogOut, User, Settings, Home, BookMarked, Award } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const { user, profile, isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await api.auth.signOut();
      toast({
        title: 'Muvaffaqiyatli',
        description: 'Tizimdan chiqdingiz'
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: 'Xato',
        description: error.message || 'Chiqishda xatolik yuz berdi',
        variant: 'destructive'
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">EduCode.uz</span>
        </Link>

        <nav className="flex items-center space-x-4">
          {isAuthenticated && (
            <>
              <Button variant="ghost" asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Bosh sahifa
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/courses">
                  <BookMarked className="w-4 h-4 mr-2" />
                  Kurslar
                </Link>
              </Button>
              {isAdmin && (
                <Button variant="ghost" asChild>
                  <Link to="/admin">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Link>
                </Button>
              )}
            </>
          )}

          <ThemeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{profile?.full_name}</p>
                  <p className="text-xs text-muted-foreground">{profile?.phone}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/certificates" className="cursor-pointer">
                    <Award className="w-4 h-4 mr-2" />
                    Sertifikatlar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Chiqish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link to="/login">Kirish</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
