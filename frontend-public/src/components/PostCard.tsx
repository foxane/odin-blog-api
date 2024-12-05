export default function PostCard({ post }: Props) {
  return <>{post}</>;
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
