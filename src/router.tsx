import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import CourseOutline from '@/pages/CourseOutline';
import CourseCover from '@/pages/CourseCover';
import LessonsMap from '@/pages/LessonsMap';
import LessonDetail from '@/pages/LessonDetail';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to="/courses/learning-how-to-learn/lessons" replace />,
      },
      { path: '/courses/new', element: <CourseOutline /> },
      { path: '/courses/:id/outline', element: <CourseOutline /> },
      { path: '/courses/:id', element: <CourseCover /> },
      { path: '/courses/:id/lessons', element: <LessonsMap /> },
      { path: '/lessons/:id', element: <LessonDetail /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
