import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Editor } from '@tinymce/tinymce-react';

import Categories from './Categories';
import Button from '../../components/ui/Button';
import usePost from '../../hooks/usePost';
import loadingIcon from '../../assets/loading.svg';

export default function EditorPage() {
  const { state } = useLocation();
  const { loading, error, edit, create, publish } = usePost();
  const [post, setPost] = useState(state);
  const editorRef = useRef(null);

  useEffect(() => {
    // Show a toast if there's an error
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  function onChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit() {
    const token = localStorage.getItem('token');
    // Get content from editor
    if (editorRef.current) post.content = editorRef.current.getContent();

    const data = {
      ...post,
      // Map categories from server to name only
      categories: post.categories.map(el => el.name),
    };

    if (data.id) {
      edit(data, token).then(() => {
        if (!error) toast.success('Post saved successfully!');
      });
    } else {
      create(data, token).then(res => {
        // Edit post state to reflect server's
        if (!error) {
          setPost(res.data);
          toast.success('Post created successfully!');
        }
      });
    }
  }

  function onPublish() {
    const token = localStorage.getItem('token');
    const data = { id: post.id, publish: !post.published };

    publish(data, token).then(res => {
      if (!error) {
        setPost(res.data);
        toast.success(
          `Post ${
            res.data.published ? 'published' : 'unpublished'
          } successfully!`,
        );
      }
    });
  }

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
        <div className="col-span-5 sm:col-span-4">
          <Editor
            apiKey={import.meta.env.VITE_TINY_API}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue={post.content}
            init={{
              height: 800,
              menubar: true,
              selector: 'textarea',
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | image ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | link autolink anchor visualblocks code preview | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col items-center gap-2 col-span-5 sm:col-span-1">
          {loading ? (
            <Button disabled={true}>
              <img
                src={loadingIcon}
                alt="loading icon"
                className="w-6 block mx-auto"
              />
            </Button>
          ) : (
            <Button
              onClick={onSubmit}
              className={`text-white ${
                post.id ? 'bg-blue-500' : 'bg-green-500'
              }`}>
              {post.id ? 'Save post' : 'Create post'}
            </Button>
          )}

          {post.id &&
            // No post id will hide publish button
            (loading ? (
              <Button disabled={true}>
                <img
                  src={loadingIcon}
                  alt="loading icon"
                  className="w-6 block mx-auto"
                />
              </Button>
            ) : (
              <Button
                onClick={onPublish}
                disabled={post.id ? false : true}
                className={`text-white ${
                  post.published ? 'bg-red-500' : 'bg-green-500'
                }`}>
                {post.published ? 'Unpublish' : 'Publish'}
              </Button>
            ))}

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
