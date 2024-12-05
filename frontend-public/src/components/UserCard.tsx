import { convertAuth } from '../utils/utils';

export default function UserCard({ user }: Props) {
  return (
    <div className="p-4 bg-neutral-700 rounded text-sm">
      <div className="">
        <p className="mb-4 font-semibold text-base ">{user.name}</p>
        <p className="text-neutral-300 italic font-semibold">
          {convertAuth(user.authValue)}
        </p>
        <p className="text-neutral-300 italic">{user.email}</p>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="px-2 py-1 border border-neutral-400 rounded hover:bg-neutral-600">
          Logout
        </button>
      </div>
    </div>
  );
}

type Props = {
  user: {
    name: string;
    email: string;
    authValue: number;
  };
};
