import { createBrowserRouter } from 'react-router';
import Layout from './layouts/Layout';
import Author from './pages/authorPage/Author';
import AuthPage from './pages/authPage/AuthPage';
import { AuthorRoute, UserRoute } from './ProtectedRoutes';
import JoinPage from './pages/joinPage/JoinPage';
import EditorPage from './pages/editorPage/EditorPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        index: true,
        element: <UserRoute element={<AuthorRoute element={<Author />} />} />,
      },
      {
        // Not logged in user redirected here
        path: '/login',
        element: <AuthPage />,
      },
      {
        path: '/join',
        element: <UserRoute element={<JoinPage />} />,
      },
      {
        path: '/editor',
        element: (
          <UserRoute element={<AuthorRoute element={<EditorPage />} />} />
        ),
      },
    ],
  },
]);

export default routes;
