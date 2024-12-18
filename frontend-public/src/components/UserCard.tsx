import useUser from '../hooks/useUser';
import { convertAuth } from '../utils/utils';

export default function UserCard() {
  const { user, logout } = useUser();

  return (
    user && (
      <div className="p-4 bg-neutral-700 rounded text-sm">
        <div className="">
          <p className="mb-4 font-semibold text-base text-white text-ellipsis">
            {user.name}
          </p>
          <p className="text-neutral-300 italic font-semibold">
            {convertAuth(user.authValue)}
          </p>
          <p className="text-neutral-300 italic font-thin break-words">
            {user.email}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={logout}
            className="px-2 py-1 border border-neutral-400 rounded hover:bg-neutral-600">
            Logout
          </button>
        </div>
      </div>
    )
  );
}
