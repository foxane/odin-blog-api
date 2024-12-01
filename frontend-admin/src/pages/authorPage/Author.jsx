import PostCard from './PostCard';

const posts = [
  {
    title: 'Long blog post title about something lorem ipsum dolor sit ame',
    categories: ['cat', 'cat', 'cat'],
    publishedAt: '',
    commentCount: 10,
  },
  {
    title: 'Long blog post title about something',
    categories: ['cat', 'cat', 'cat'],
    publishedAt: '2023-13-02',
    commentCount: 0,
  },
  {
    title: 'Long blog post title about something',
    categories: ['cat', 'cat', 'cat'],
    publishedAt: '2023-13-02',
    commentCount: 0,
  },
];

export default function Author() {
  return (
    <div className="max-w-screen-xl p-2 mx-auto">
      <p className="text-xl text-center font-semibold py-2">All posts</p>
      <div className="grid grid-flow-row gap-3 md:grid-cols-2">
        {posts.map(p => (
          <PostCard key={p.title} post={p} />
        ))}
      </div>
    </div>
  );
}
