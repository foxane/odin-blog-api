import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useState } from 'react';

import UserCard from './UserCard';
import Navbar from './Navbar';

import navIcon from '../assets/nav.svg';
import logoIcon from '../assets/logo.svg';
import githubIcon from '../assets/github.svg';
import useUser from '../hooks/useUser';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="py-4 px-5 mx-auto flex justify-between items-center max-w-screen-xl">
      <Link
        to={'/'}
        className="text-xl font-semibold font-serif flex items-end">
        <img src={logoIcon} alt="logo" width={'40'} />
        BlogName
      </Link>

      <button
        className="border p-2 rounded-md border-neutral-700 hover:bg-neutral-700"
        onClick={() => {
          setIsNavOpen(!isNavOpen);
        }}>
        <img src={navIcon} alt="nav icon" />
      </button>

      {/* Navbar */}
      {isNavOpen &&
        createPortal(
          <>
            {/* Overlay */}
            <div
              onClick={() => {
                setIsNavOpen(false);
              }}
              className="fixed top-0 left-0 z-40 h-screen w-screen bg-black opacity-30"
              aria-hidden="true"
            />
            <div
              className="fixed top-0 right-0 z-50 h-screen w-64 bg-neutral-800 p-4 text-neutral-200"
              role="dialog"
              aria-modal="true">
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsNavOpen(false);
                }}
                className="p-2 px-3 bg-neutral-800 rounded absolute -left-12 leading-5 text-2xl hover:bg-neutral-700">
                x
              </button>

              {/* Menu */}
              <div className="flex flex-col gap-2 h-full">
                {user ? (
                  <UserCard />
                ) : (
                  <div className="flex justify-evenly">
                    <button className="px-3 py-1 rounded text-neutral-300 border border-neutral-300 hover:bg-neutral-600">
                      Login
                    </button>
                    <button className="px-3 py-1 rounded text-neutral-900 bg-neutral-300 border hover:bg-neutral-100">
                      Register
                    </button>
                  </div>
                )}

                <Navbar />
                <Link
                  to={'/'}
                  className="font-thin text-center flex items-center gap-1">
                  <img src={githubIcon} alt="github icon" width={20} />
                  GitHub
                </Link>
              </div>
            </div>
          </>,
          document.body,
        )}
    </header>
  );
}
