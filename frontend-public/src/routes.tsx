import { createBrowserRouter } from 'react-router-dom';
import IndexPage from './pages/Index';
import PostPage from './pages/PostPage';
import AuthPage from './pages/AuthPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/post/:id',
    element: <PostPage />,
  },
  {
    path: 'auth',
    element: <AuthPage />,
  },
]);

export default routes;
