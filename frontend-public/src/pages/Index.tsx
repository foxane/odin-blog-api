import Header from '../components/Header';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import { mockPost } from '../utils/utils';

export default function IndexPage() {
  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto bg-neutral-900 text-neutral-100">
      <Header></Header>
      <main className="mx-auto px-5 w-fit">
        <p className="text-3xl py-5 font-bold text-center">Welcome~</p>

        <p className="text-lg font-bold my-5">Latest Post</p>
        <div className="flex flex-col justify-start gap-5 md:grid md:grid-cols-3">
          {mockPost.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
