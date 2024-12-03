import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Footer = () => {
  return (
    <footer className="border-slate-300 bg-slate-100 border-t-2">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto border-t p-2 sm:px-20">
        <Link to={'/'} className="flex items-end">
          <img src={logo} className="w-8 md:w-10" />
          <p className="underline-offset-8 font-bold text-xl md:text-2xl">
            _blogName
          </p>
        </Link>

        <a
          href="http://github.com/foxane"
          target="_blank"
          rel="noopener noreferrer">
          foxane
        </a>
      </div>
    </footer>
  );
};

export default Footer;
