import { createBrowserRouter } from 'react-router-dom';
import IndexPage from './pages/Index';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/post/:id',
  },
]);

export default routes;
