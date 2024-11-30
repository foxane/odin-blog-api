import { createBrowserRouter } from 'react-router';
import Layout from './layouts/Layout';
import Author from './pages/authorPage/Author';
import AuthPage from './pages/authPage/AuthPage';
import { AuthorRoute, UserRoute } from './ProtectedRoutes';

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
    ],
  },
]);

export default routes;
