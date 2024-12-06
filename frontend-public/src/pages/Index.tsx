import Header from '../components/Header';
import Footer from '../components/Footer';
import PostCard, { Post } from '../components/PostCard';
import useFetch from '../hooks/useFetch';

export default function IndexPage() {
  const { data: posts, loading, error } = useFetch<Post[]>('/posts');

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto bg-neutral-900 text-neutral-100">
      <Header></Header>
      <main className="mx-auto px-5 w-fit">
        <p className="text-3xl py-5 font-bold text-center">Welcome~</p>

        <p className="text-lg font-bold my-5">Latest Post</p>
        <div className="flex flex-col justify-start gap-5 md:grid md:grid-cols-3">
          {error && <p>{error}</p>}
          {loading && <p>Loading..</p>}
          {posts && posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
