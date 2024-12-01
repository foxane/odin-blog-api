import { useContext } from 'react';

import { AuthContext } from '../../AuthProvider';
import PostCard from './PostCard';
import usePost from '../../hooks/usePost';
import loadingIcon from '../../assets/loading.svg';

export default function Author() {
  const { user } = useContext(AuthContext);
  const { loading, error, posts } = usePost(user.id);

  if (error) return <>{error}</>;
  return (
    <div className="max-w-screen-xl p-2 mx-auto relative">
      <p className="text-xl text-center font-semibold py-2">All posts</p>

      {/* Loading overlay */}
      {loading && (
        <div className="inset-0 bg-white bg-opacity-50 z-10 flex flex-col items-center justify-center">
          <img src={loadingIcon} alt="loading icon" className="w-14" />
          <p className="italic font-semibold">Fetching your post...</p>
        </div>
      )}

      <div className="grid grid-flow-row gap-3 md:grid-cols-2">
        {posts && posts.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </div>
  );
}
