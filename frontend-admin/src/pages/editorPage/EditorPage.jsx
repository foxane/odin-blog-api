import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Categories from './Categories';
import Button from '../../components/ui/Button';

export default function EditorPage() {
  const { state } = useLocation();
  const [post, setPost] = useState(state);

  function onChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }

  // function savePost() {
  //   const data = {
  //     ...post,
  //     categories: post.categories.map(el => el.name),
  //   };
  // }

  return (
    <div className="flex flex-1 bg-slate-100">
      <div className="flex-1 grid grid-cols-5 grid-rows-[auto,_1fr] gap-2 max-w-screen-xl mx-auto p-2">
        {/* Title */}
        <label htmlFor="" className="col-span-5 font-semibold">
          Title
          <input
            className="w-full p-2 resize-none border-b-4 border-orange-200 focus:border-b-orange-400 outline-none"
            name="title"
            value={post.title}
            onChange={onChange}
          />
        </label>

        {/* Editor */}
        <textarea
          className="col-span-4 border-2 p-2"
          name="content"
          onChange={onChange}
          value={post.content}
        />

        {/* Sidebar */}
        <div className="flex flex-col gap-2">
          <Button>Save</Button>
          <Button>Publish</Button>
          <Categories
            selectedCat={post.categories}
            post={post}
            setPost={setPost}
          />
        </div>
      </div>
    </div>
  );
}
