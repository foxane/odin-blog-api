import { createBrowserRouter } from 'react-router-dom';
import IndexPage from './pages/Index';
import PostPage from './pages/PostPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/post/:id',
    element: <PostPage />,
  },
]);

export default routes;
