export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export type UserRole = 'student' | 'admin';

export interface Profile {
  id: string;
  phone: string | null;
  full_name: string;
  role: UserRole;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  content: string;
  order_index: number;
  created_at: string;
}

export interface TestQuestion {
  question: string;
  options: string[];
  correct_answer: number;
}

export interface Test {
  id: string;
  lesson_id: string;
  title: string;
  questions: TestQuestion[];
  passing_score: number;
  created_at: string;
}

export interface Assignment {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  starter_code: string | null;
  test_cases: any;
  language: string;
  created_at: string;
}

export interface StudentProgress {
  id: string;
  student_id: string;
  course_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export interface TestSubmission {
  id: string;
  student_id: string;
  test_id: string;
  answers: any;
  score: number;
  passed: boolean;
  submitted_at: string;
}

export interface AssignmentSubmission {
  id: string;
  student_id: string;
  assignment_id: string;
  code: string;
  ai_feedback: string | null;
  score: number | null;
  passed: boolean | null;
  submitted_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  criteria: any;
  created_at: string;
}

export interface StudentBadge {
  id: string;
  student_id: string;
  badge_id: string;
  earned_at: string;
}

export interface Certificate {
  id: string;
  student_id: string;
  course_id: string;
  issued_at: string;
  certificate_url: string | null;
}

export interface Settings {
  id: string;
  key: string;
  value: string | null;
  updated_at: string;
}

export interface CourseWithProgress extends Course {
  total_lessons?: number;
  completed_lessons?: number;
  progress_percentage?: number;
}

export interface LessonWithContent extends Lesson {
  test?: Test;
  assignment?: Assignment;
  is_completed?: boolean;
}
