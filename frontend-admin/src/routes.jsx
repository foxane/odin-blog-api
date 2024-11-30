import { createBrowserRouter } from 'react-router';
import Layout from './layouts/Layout';
import Author from './pages/Author';
import AuthPage from './pages/AuthPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        index: true,
        element: <Author />,
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
