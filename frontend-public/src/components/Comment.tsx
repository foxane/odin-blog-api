import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Entity } from './PostCard';
import { formatDate } from '../utils/utils';
import useUser from '../hooks/useUser';

export default function Comment() {
  const { id } = useParams();
  const {
    data: comments,
    loading,
    error,
  } = useFetch<Com[]>(`/posts/${id || ''}/comments`);
  const { user } = useUser();

  return (
    <div className="p-2 mt-10">
      <p className="text-lg font-semibold">Comments</p>

      <form className="mt-3 p-2 flex flex-col gap-3 border border-neutral-300 rounded">
        {user ? (
          <>
            <p className="font-semibold">Post comment</p>
            <textarea
              className="bg-neutral-600 text-white rounded"
              required
              name="comment"
              id="comment"></textarea>
            <button
              type="submit"
              className="py-1 px-3 me-auto rounded bg-neutral-200 text-black">
              Submit
            </button>
          </>
        ) : (
          <p>You need to login to post comment</p>
        )}
      </form>

      <div className="mt-4 space-y-3">
        {loading && <p>loading..</p>}
        {error && <p>{error}</p>}
        {comments &&
          comments.map(com => (
            <div key={com.id} className="p-2 border rounded border-neutral-500">
              <p className="font-semibold">{com.User.name}</p>
              <p className="text-xs italic">
                {formatDate(com.createdAt, {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="mt-2">{com.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

type Com = {
  id: string;
  content: string;
  createdAt: string;
  User: Entity;
};
