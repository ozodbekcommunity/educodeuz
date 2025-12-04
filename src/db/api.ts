import { supabase } from './supabase';
import type {
  Course,
  Lesson,
  Test,
  Assignment,
  StudentProgress,
  TestSubmission,
  AssignmentSubmission,
  Badge,
  StudentBadge,
  Certificate,
  Settings,
  CourseWithProgress,
  LessonWithContent,
  Profile
} from '@/types';

export const api = {
  auth: {
    signUp: async (phone: string, password: string, fullName: string) => {
      const { data, error } = await supabase.auth.signUp({
        phone,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      if (error) throw error;
      return data;
    },

    signIn: async (phone: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        phone,
        password
      });
      if (error) throw error;
      return data;
    },

    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },

    getSession: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },

    getUser: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    }
  },

  profiles: {
    getProfile: async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },

    updateProfile: async (userId: string, updates: Partial<Profile>) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },

    getAllProfiles: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    }
  },

  courses: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    getPublished: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data as Course | null;
    },

    create: async (course: Omit<Course, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('courses')
        .insert(course)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as Course | null;
    },

    update: async (id: string, updates: Partial<Course>) => {
      const { data, error } = await supabase
        .from('courses')
        .update(updates)
        .eq('id', id)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as Course | null;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },

    getWithProgress: async (userId: string) => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          lessons:lessons(count),
          progress:student_progress(count)
        `)
        .eq('is_published', true)
        .eq('progress.student_id', userId)
        .eq('progress.completed', true);
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    }
  },

  lessons: {
    getByCourseId: async (courseId: string) => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data as Lesson | null;
    },

    create: async (lesson: Omit<Lesson, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('lessons')
        .insert(lesson)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as Lesson | null;
    },

    update: async (id: string, updates: Partial<Lesson>) => {
      const { data, error } = await supabase
        .from('lessons')
        .update(updates)
        .eq('id', id)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as Lesson | null;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', id);
      if (error) throw error;
    }
  },

  tests: {
    getByLessonId: async (lessonId: string) => {
      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .eq('lesson_id', lessonId)
        .maybeSingle();
      if (error) throw error;
      return data as Test | null;
    },

    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data as Test | null;
    },

    create: async (test: Omit<Test, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('tests')
        .insert(test)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as Test | null;
    },

    update: async (id: string, updates: Partial<Test>) => {
      const { data, error } = await supabase
        .from('tests')
        .update(updates)
        .eq('id', id)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as Test | null;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('tests')
        .delete()
        .eq('id', id);
      if (error) throw error;
    }
  },

  assignments: {
    getByLessonId: async (lessonId: string) => {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('lesson_id', lessonId)
        .maybeSingle();
      if (error) throw error;
      return data as Assignment | null;
    },

    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data as Assignment | null;
    },

    create: async (assignment: Omit<Assignment, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('assignments')
        .insert(assignment)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as Assignment | null;
    },

    update: async (id: string, updates: Partial<Assignment>) => {
      const { data, error } = await supabase
        .from('assignments')
        .update(updates)
        .eq('id', id)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as Assignment | null;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', id);
      if (error) throw error;
    }
  },

  progress: {
    getByStudentAndCourse: async (studentId: string, courseId: string) => {
      const { data, error } = await supabase
        .from('student_progress')
        .select('*')
        .eq('student_id', studentId)
        .eq('course_id', courseId);
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    getByStudentAndLesson: async (studentId: string, lessonId: string) => {
      const { data, error } = await supabase
        .from('student_progress')
        .select('*')
        .eq('student_id', studentId)
        .eq('lesson_id', lessonId)
        .maybeSingle();
      if (error) throw error;
      return data as StudentProgress | null;
    },

    markComplete: async (studentId: string, courseId: string, lessonId: string) => {
      const { data, error } = await supabase
        .from('student_progress')
        .upsert({
          student_id: studentId,
          course_id: courseId,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString()
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as StudentProgress | null;
    }
  },

  testSubmissions: {
    create: async (submission: Omit<TestSubmission, 'id' | 'submitted_at'>) => {
      const { data, error } = await supabase
        .from('test_submissions')
        .insert(submission)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as TestSubmission | null;
    },

    getByStudentAndTest: async (studentId: string, testId: string) => {
      const { data, error } = await supabase
        .from('test_submissions')
        .select('*')
        .eq('student_id', studentId)
        .eq('test_id', testId)
        .order('submitted_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as TestSubmission | null;
    }
  },

  assignmentSubmissions: {
    create: async (submission: Omit<AssignmentSubmission, 'id' | 'submitted_at'>) => {
      const { data, error } = await supabase
        .from('assignment_submissions')
        .insert(submission)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as AssignmentSubmission | null;
    },

    getByStudentAndAssignment: async (studentId: string, assignmentId: string) => {
      const { data, error } = await supabase
        .from('assignment_submissions')
        .select('*')
        .eq('student_id', studentId)
        .eq('assignment_id', assignmentId)
        .order('submitted_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as AssignmentSubmission | null;
    }
  },

  badges: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('badges')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    getStudentBadges: async (studentId: string) => {
      const { data, error } = await supabase
        .from('student_badges')
        .select('*, badge:badges(*)')
        .eq('student_id', studentId)
        .order('earned_at', { ascending: false });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    awardBadge: async (studentId: string, badgeId: string) => {
      const { data, error } = await supabase
        .from('student_badges')
        .insert({
          student_id: studentId,
          badge_id: badgeId
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as StudentBadge | null;
    }
  },

  certificates: {
    create: async (studentId: string, courseId: string) => {
      const { data, error } = await supabase
        .from('certificates')
        .insert({
          student_id: studentId,
          course_id: courseId
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as Certificate | null;
    },

    getByStudent: async (studentId: string) => {
      const { data, error } = await supabase
        .from('certificates')
        .select('*, course:courses(*)')
        .eq('student_id', studentId)
        .order('issued_at', { ascending: false });
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    },

    getByCourse: async (studentId: string, courseId: string) => {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('student_id', studentId)
        .eq('course_id', courseId)
        .maybeSingle();
      if (error) throw error;
      return data as Certificate | null;
    }
  },

  settings: {
    get: async (key: string) => {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('key', key)
        .maybeSingle();
      if (error) throw error;
      return data as Settings | null;
    },

    set: async (key: string, value: string) => {
      const { data, error } = await supabase
        .from('settings')
        .upsert({
          key,
          value
        })
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as Settings | null;
    },

    getAll: async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*');
      if (error) throw error;
      return Array.isArray(data) ? data : [];
    }
  }
};
