import type { ReactNode } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LessonView from './pages/LessonView';
import Profile from './pages/Profile';
import Certificates from './pages/Certificates';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourses from './pages/admin/AdminCourses';
import AdminLessons from './pages/admin/AdminLessons';
import AdminTestForm from './pages/admin/AdminTestForm';
import AdminAssignmentForm from './pages/admin/AdminAssignmentForm';
import AdminSettings from './pages/admin/AdminSettings';
import ProtectedRoute from './components/common/ProtectedRoute';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
    visible: false
  },
  {
    name: 'Register',
    path: '/register',
    element: <Register />,
    visible: false
  },
  {
    name: 'Home',
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    requireAuth: true
  },
  {
    name: 'Courses',
    path: '/courses',
    element: (
      <ProtectedRoute>
        <Courses />
      </ProtectedRoute>
    ),
    requireAuth: true
  },
  {
    name: 'Course Detail',
    path: '/courses/:courseId',
    element: (
      <ProtectedRoute>
        <CourseDetail />
      </ProtectedRoute>
    ),
    visible: false,
    requireAuth: true
  },
  {
    name: 'Lesson',
    path: '/lessons/:lessonId',
    element: (
      <ProtectedRoute>
        <LessonView />
      </ProtectedRoute>
    ),
    visible: false,
    requireAuth: true
  },
  {
    name: 'Profile',
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    requireAuth: true
  },
  {
    name: 'Certificates',
    path: '/certificates',
    element: (
      <ProtectedRoute>
        <Certificates />
      </ProtectedRoute>
    ),
    requireAuth: true
  },
  {
    name: 'Admin',
    path: '/admin',
    element: (
      <ProtectedRoute requireAdmin>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    requireAuth: true,
    requireAdmin: true
  },
  {
    name: 'Admin Courses',
    path: '/admin/courses',
    element: (
      <ProtectedRoute requireAdmin>
        <AdminCourses />
      </ProtectedRoute>
    ),
    visible: false,
    requireAuth: true,
    requireAdmin: true
  },
  {
    name: 'Admin Lessons',
    path: '/admin/courses/:courseId/lessons',
    element: (
      <ProtectedRoute requireAdmin>
        <AdminLessons />
      </ProtectedRoute>
    ),
    visible: false,
    requireAuth: true,
    requireAdmin: true
  },
  {
    name: 'Admin Test Form',
    path: '/admin/lessons/:lessonId/test',
    element: (
      <ProtectedRoute requireAdmin>
        <AdminTestForm />
      </ProtectedRoute>
    ),
    visible: false,
    requireAuth: true,
    requireAdmin: true
  },
  {
    name: 'Admin Assignment Form',
    path: '/admin/lessons/:lessonId/assignment',
    element: (
      <ProtectedRoute requireAdmin>
        <AdminAssignmentForm />
      </ProtectedRoute>
    ),
    visible: false,
    requireAuth: true,
    requireAdmin: true
  },
  {
    name: 'Admin Settings',
    path: '/admin/settings',
    element: (
      <ProtectedRoute requireAdmin>
        <AdminSettings />
      </ProtectedRoute>
    ),
    visible: false,
    requireAuth: true,
    requireAdmin: true
  }
];

export default routes;
