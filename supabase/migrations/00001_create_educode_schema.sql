/*
# EduCode.uz Database Schema

## 1. Overview
This migration creates the complete database structure for the EduCode.uz learning platform,
including user profiles, courses, lessons, tests, assignments, progress tracking, badges, and certificates.

## 2. New Tables

### 2.1 profiles
User profile information synced from auth.users
- `id` (uuid, primary key, references auth.users)
- `phone` (text, unique)
- `full_name` (text, not null)
- `role` (user_role enum: 'student', 'admin')
- `created_at` (timestamptz)

### 2.2 courses
Course information created by admin
- `id` (uuid, primary key)
- `title` (text, not null)
- `description` (text)
- `thumbnail` (text)
- `is_published` (boolean, default false)
- `created_by` (uuid, references profiles)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### 2.3 lessons
Individual lessons within courses
- `id` (uuid, primary key)
- `course_id` (uuid, references courses)
- `title` (text, not null)
- `content` (text, not null)
- `order_index` (integer, not null)
- `created_at` (timestamptz)

### 2.4 tests
Tests associated with lessons
- `id` (uuid, primary key)
- `lesson_id` (uuid, references lessons)
- `title` (text, not null)
- `questions` (jsonb, not null) - Array of question objects
- `passing_score` (integer, default 70)
- `created_at` (timestamptz)

### 2.5 assignments
Practical coding assignments
- `id` (uuid, primary key)
- `lesson_id` (uuid, references lessons)
- `title` (text, not null)
- `description` (text, not null)
- `starter_code` (text)
- `test_cases` (jsonb) - Array of test case objects
- `language` (text, default 'javascript')
- `created_at` (timestamptz)

### 2.6 student_progress
Track student progress through courses
- `id` (uuid, primary key)
- `student_id` (uuid, references profiles)
- `course_id` (uuid, references courses)
- `lesson_id` (uuid, references lessons)
- `completed` (boolean, default false)
- `completed_at` (timestamptz)
- `created_at` (timestamptz)

### 2.7 test_submissions
Student test submissions and scores
- `id` (uuid, primary key)
- `student_id` (uuid, references profiles)
- `test_id` (uuid, references tests)
- `answers` (jsonb, not null)
- `score` (integer, not null)
- `passed` (boolean, not null)
- `submitted_at` (timestamptz)

### 2.8 assignment_submissions
Student assignment submissions
- `id` (uuid, primary key)
- `student_id` (uuid, references profiles)
- `assignment_id` (uuid, references assignments)
- `code` (text, not null)
- `ai_feedback` (text)
- `score` (integer)
- `passed` (boolean)
- `submitted_at` (timestamptz)

### 2.9 badges
Achievement badges
- `id` (uuid, primary key)
- `name` (text, not null)
- `description` (text)
- `icon` (text)
- `criteria` (jsonb) - Criteria for earning badge
- `created_at` (timestamptz)

### 2.10 student_badges
Badges earned by students
- `id` (uuid, primary key)
- `student_id` (uuid, references profiles)
- `badge_id` (uuid, references badges)
- `earned_at` (timestamptz)

### 2.11 certificates
Course completion certificates
- `id` (uuid, primary key)
- `student_id` (uuid, references profiles)
- `course_id` (uuid, references courses)
- `issued_at` (timestamptz)
- `certificate_url` (text)

### 2.12 settings
System settings including OpenRouter API configuration
- `id` (uuid, primary key)
- `key` (text, unique, not null)
- `value` (text)
- `updated_at` (timestamptz)

## 3. Security
- Enable RLS on all tables
- Create is_admin helper function
- Admins have full access to all tables
- Students can read published courses and their own progress/submissions
- Students can create their own submissions and progress records
- Settings table is admin-only

## 4. Triggers
- Auto-sync new users to profiles table (first user becomes admin)
- Auto-update timestamps on updates

## 5. Initial Data
- Create default badges for motivation
*/

-- Create user role enum
CREATE TYPE user_role AS ENUM ('student', 'admin');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone text UNIQUE,
  full_name text NOT NULL,
  role user_role DEFAULT 'student'::user_role NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  thumbnail text,
  is_published boolean DEFAULT false,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create tests table
CREATE TABLE IF NOT EXISTS tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  questions jsonb NOT NULL,
  passing_score integer DEFAULT 70,
  created_at timestamptz DEFAULT now()
);

-- Create assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  starter_code text,
  test_cases jsonb,
  language text DEFAULT 'javascript',
  created_at timestamptz DEFAULT now()
);

-- Create student_progress table
CREATE TABLE IF NOT EXISTS student_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, lesson_id)
);

-- Create test_submissions table
CREATE TABLE IF NOT EXISTS test_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  test_id uuid REFERENCES tests(id) ON DELETE CASCADE NOT NULL,
  answers jsonb NOT NULL,
  score integer NOT NULL,
  passed boolean NOT NULL,
  submitted_at timestamptz DEFAULT now()
);

-- Create assignment_submissions table
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  assignment_id uuid REFERENCES assignments(id) ON DELETE CASCADE NOT NULL,
  code text NOT NULL,
  ai_feedback text,
  score integer,
  passed boolean,
  submitted_at timestamptz DEFAULT now()
);

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  criteria jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create student_badges table
CREATE TABLE IF NOT EXISTS student_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id uuid REFERENCES badges(id) ON DELETE CASCADE NOT NULL,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(student_id, badge_id)
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  issued_at timestamptz DEFAULT now(),
  certificate_url text,
  UNIQUE(student_id, course_id)
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create is_admin helper function
CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- Profiles policies
CREATE POLICY "Admins have full access to profiles" ON profiles
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM profiles WHERE id = auth.uid()));

-- Courses policies
CREATE POLICY "Admins have full access to courses" ON courses
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Students can view published courses" ON courses
  FOR SELECT USING (is_published = true);

-- Lessons policies
CREATE POLICY "Admins have full access to lessons" ON lessons
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Students can view lessons of published courses" ON lessons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses c
      WHERE c.id = lessons.course_id AND c.is_published = true
    )
  );

-- Tests policies
CREATE POLICY "Admins have full access to tests" ON tests
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Students can view tests" ON tests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM lessons l
      JOIN courses c ON c.id = l.course_id
      WHERE l.id = tests.lesson_id AND c.is_published = true
    )
  );

-- Assignments policies
CREATE POLICY "Admins have full access to assignments" ON assignments
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Students can view assignments" ON assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM lessons l
      JOIN courses c ON c.id = l.course_id
      WHERE l.id = assignments.lesson_id AND c.is_published = true
    )
  );

-- Student progress policies
CREATE POLICY "Admins have full access to student_progress" ON student_progress
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Students can view own progress" ON student_progress
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can create own progress" ON student_progress
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own progress" ON student_progress
  FOR UPDATE USING (auth.uid() = student_id);

-- Test submissions policies
CREATE POLICY "Admins have full access to test_submissions" ON test_submissions
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Students can view own submissions" ON test_submissions
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can create own submissions" ON test_submissions
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Assignment submissions policies
CREATE POLICY "Admins have full access to assignment_submissions" ON assignment_submissions
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Students can view own submissions" ON assignment_submissions
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can create own submissions" ON assignment_submissions
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Badges policies
CREATE POLICY "Everyone can view badges" ON badges
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage badges" ON badges
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Student badges policies
CREATE POLICY "Admins have full access to student_badges" ON student_badges
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Students can view own badges" ON student_badges
  FOR SELECT USING (auth.uid() = student_id);

-- Certificates policies
CREATE POLICY "Admins have full access to certificates" ON certificates
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Students can view own certificates" ON certificates
  FOR SELECT USING (auth.uid() = student_id);

-- Settings policies (admin only)
CREATE POLICY "Admins have full access to settings" ON settings
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Create trigger function to sync new users to profiles
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
BEGIN
  SELECT COUNT(*) INTO user_count FROM profiles;
  INSERT INTO profiles (id, phone, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'phone', NEW.phone, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    CASE WHEN user_count = 0 THEN 'admin'::user_role ELSE 'student'::user_role END
  );
  RETURN NEW;
END;
$$;

-- Create trigger on auth.users (for INSERT as well)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add updated_at triggers
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert default badges
INSERT INTO badges (name, description, icon, criteria) VALUES
  ('🎯 Birinchi Qadam', 'Birinchi darsni yakunlang', '🎯', '{"type": "lessons_completed", "count": 1}'),
  ('📚 O''quvchi', '5 ta darsni yakunlang', '📚', '{"type": "lessons_completed", "count": 5}'),
  ('🏆 Ustoz', '10 ta darsni yakunlang', '🏆', '{"type": "lessons_completed", "count": 10}'),
  ('⭐ Yulduz', 'Birinchi testdan o''ting', '⭐', '{"type": "tests_passed", "count": 1}'),
  ('💻 Dasturchi', 'Birinchi topshiriqni bajaring', '💻', '{"type": "assignments_completed", "count": 1}'),
  ('🚀 Professional', 'Birinchi kursni yakunlang', '🚀', '{"type": "courses_completed", "count": 1}');

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('openrouter_api_key', NULL),
  ('openrouter_model', 'openai/gpt-4o-mini');
