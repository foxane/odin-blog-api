import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import parse from 'html-react-parser';

import { Post } from '../components/PostCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Comment from '../components/Comment';

export default function PostPage() {
  const { id } = useParams();
  const { data: post, loading, error } = useFetch<Post>(`/posts/${id || ''}`);

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto bg-neutral-900 text-neutral-100">
      <Header></Header>
      <main className="mx-auto px-5 max-w-screen-lg">
        <p className="text-lg font-bold my-5">Latest Post</p>
        {post && (
          <>
            <p className="text-2xl">{post.title}</p>
            <div className="prose">{parse(post.content)}</div>
          </>
        )}
        {error && <p>{error}</p>}
        {loading && <p>Loading..</p>}

        <Comment />
      </main>
      <Footer></Footer>
    </div>
  );
}
