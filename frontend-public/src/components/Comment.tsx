import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { formatDate } from '../utils/utils';
import { Entity } from './PostCard';
import useFetch from '../hooks/useFetch';
import useUser from '../hooks/useUser';
import axios from 'axios';

export default function Comment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: comments,
    loading,
    error,
  } = useFetch<Com[]>(`/posts/${id || ''}/comments`);
  const { user } = useUser();
  const [comment, setComment] = useState('');

  const submitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/comments?postId=${id || ''}`,
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        },
      )
      .then(() => navigate(0))
      .catch(() => navigate(0)); // Placeholder for error, i'll come back later. maybe
  };

  return (
    <div className="p-2 mt-10">
      <p className="text-lg font-semibold">Comments</p>

      <form
        onSubmit={submitComment}
        className="mt-3 p-2 flex flex-col gap-3 border border-neutral-300 rounded">
        {user ? (
          <>
            <p className="font-semibold">Post comment</p>
            <textarea
              onChange={e => {
                setComment(e.target.value);
              }}
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
