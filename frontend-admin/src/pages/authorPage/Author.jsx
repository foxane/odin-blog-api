import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../AuthProvider';
import PostCard from './PostCard';
import loadingIcon from '../../assets/loading.svg';
import useFetch from '../../hooks/useFetch';
import Button from '../../components/ui/Button';

export default function Author() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    error,
    data: posts,
  } = useFetch(`/users/${user.id}/posts/all`, 'posts');

  if (error) return <>{error}</>;
  return (
    <div className="max-w-screen-xl p-2 mx-auto relative">
      <Link
        className="mx-auto block w-fit bg-slate-400 rounded-md"
        to={'/editor'}
        state={{ title: '', content: '', categories: [] }}>
        <Button className={'bg-blue-500 text-white'}>New Post</Button>
      </Link>

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
