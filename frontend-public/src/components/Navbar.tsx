import { Link } from 'react-router-dom';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Entity } from './PostCard';

export default function Navbar() {
  const [isCatOpen, setIsCatOpen] = useState(false);
  const {
    data: categories,
    loading,
    error,
  } = useFetch<Entity[]>('/categories');

  return (
    <nav className="flex flex-col flex-1 gap-1 text-lg font-semibold ms-2 mt-5">
      <Link
        className="border-b border-b-transparent hover:text-amber-300 hover:border-b-amber-300"
        to={'/'}>
        Home
      </Link>

      <div className="">
        <div className="flex justify-between flex-row-reverse border-b border-b-transparent hover:border-b-amber-300">
          <button
            className="flex-1 flex justify-end items-center fill-neutral-100 hover:text-amber-300 hover:fill-amber-300 peer"
            onClick={() => {
              setIsCatOpen(!isCatOpen);
            }}>
            <svg
              viewBox="0 -4.5 20 20"
              width="20px"
              className={`${
                isCatOpen ? 'rotate-180' : 'rotate'
              } transition-transform`}>
              <g transform="translate(-220.000000, -6684.000000)">
                <g transform="translate(56.000000, 160.000000)">
                  <path d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"></path>
                </g>
              </g>
            </svg>
          </button>
          <Link
            className="peer-hover:text-amber-300 hover:text-amber-300"
            to={'/'}>
            Categories
          </Link>
        </div>
        {isCatOpen && (
          <ul className="mt-1 ps-2 font-medium mb-5">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {categories &&
              categories.map(cat => (
                <li
                  key={cat.id}
                  className="hover:text-amber-200 cursor-pointer">
                  {cat.name}
                </li>
              ))}
          </ul>
        )}
      </div>
      <Link
        className="border-b border-b-transparent hover:text-amber-300 hover:border-b-amber-300"
        to={'/'}>
        About
      </Link>
    </nav>
  );
}
