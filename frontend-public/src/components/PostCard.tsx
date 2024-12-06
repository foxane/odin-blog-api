import { Link } from 'react-router-dom';

export default function PostCard({ post }: Props) {
  return (
    <div className="flex space-x-2 text-neutral-300 md:flex-col md:items-center">
      <img
        src={post.image}
        alt="post image"
        className="w-44 rounded-md sm:w-52 md:w-80"
      />
      <div className="pe-3 pt-2 pb-1 flex flex-col gap-1 md:items-center">
        <Link to={`/post/${post.id}`}>
          <p className="text-md font-semibold text-neutral-100 md:pb-4">
            {post.title}
          </p>
        </Link>
        <p className="text-xs">{post.content}</p>
        <p className="text-sm text-neutral-400 mt-auto">{post.publishedAt}</p>
      </div>
    </div>
  );
}

type Props = {
  post: Post;
};

type Post = {
  id: string;
  title: string;
  content: string;
  image: string;

  publishedAt: string;
  editedAt: string;

  categories: Array<Entity>;
  User: Entity;
};

interface Entity {
  id: string;
  name: string;
}
