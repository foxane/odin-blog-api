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
        index: true,
        element: <Author />,
      },
      {
        // Not logged in user redirected here
        path: '/auth',
        element: <AuthPage />,
      },
    ],
  },
]);

export default routes;
