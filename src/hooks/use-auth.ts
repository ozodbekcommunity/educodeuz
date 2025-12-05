import { useState, useEffect } from 'react';
import { supabase } from '@/db/supabase';
import { api } from '@/db/api';
import type { Profile } from '@/types';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await api.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          const userProfile = await api.profiles.getProfile(session.user.id);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const userProfile = await api.profiles.getProfile(session.user.id);
          setProfile(userProfile);
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const isAdmin = profile?.role === 'admin';
  const isStudent = profile?.role === 'student';

  const refreshProfile = async () => {
    if (user?.id) {
      const userProfile = await api.profiles.getProfile(user.id);
      setProfile(userProfile);
    }
  };

  return {
    user,
    profile,
    loading,
    isAdmin,
    isStudent,
    isAuthenticated: !!user,
    refreshProfile
  };
}
