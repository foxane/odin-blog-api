import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="p-2 px-10 border-b-2 bg-slate-200 shadow shadow-slate-400">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
        <Link to={'/'} className="flex items-center">
          <img src={logo} className="w-8 md:w-10" />
          <p className="underline-offset-8 font-bold text-2xl md:text-3xl">
            blogName
          </p>
        </Link>

        {user && (
          <div className="flex gap-2 items-center">
            <p className="text-sm">
              hello, <span className="italic font-semibold">{user.name}</span>
            </p>
            <a
              target="#"
              onClick={logout}
              className="text-sm underline text-red-500 cursor-pointer hover:text-red-700">
              Logout
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
