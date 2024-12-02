import { Outlet, useLocation } from 'react-router';
import { ToastContainer } from 'react-toastify';

import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  // '/editor' will make <main> flexbox, making page span entire screen
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-1 ${pathname === '/editor' ? 'flex' : ''}`}>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Layout;
