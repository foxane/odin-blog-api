import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from '../../components/Modal';
import Button from '../../components/ui/Button';
import editIcon from '../../assets/edit.svg';
import trashIcon from '../../assets/trash.svg';
import checkIcon from '../../assets/check.svg';
import crossIcon from '../../assets/cross.svg';
import loadingIcon from '../../assets/loading.svg';
import { formatDate } from '../../lib/utils';
import usePost from '../../hooks/usePost';

export default function PostCard({ post, onRemove }) {
  const { deletePost, loading, error } = usePost();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const onDeleteConfirm = () => {
    const token = localStorage.getItem('token');
    deletePost(post.id, token).then(() => {
      if (!error) {
        toast.success('Post deleted successfully');
        onRemove(post.id);
      }
    });
  };

  useEffect(() => {
    // Show a toast if there's an error
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  return (
    <>
      <div className="flex flex-col sm:grid sm:grid-cols-[_1fr,30px] rounded-md shadow-md shadow-gray-00 p-4">
        <div className="">
          <h5 className="font-semibold text-lg mb-2">{post.title}</h5>
          <p className="text-sm text-neutral-800">
            Categories:
            <span className="font-semibold italic ps-2">
              {post.categories.map(cat => cat.name).join(', ')}
            </span>
          </p>
          <p className="text-sm text-neutral-800 flex items-start gap-1">
            Published at:
            <span className="font-semibold italic">
              {post.publishedAt ? formatDate(post.publishedAt) : 'Unpublished'}
            </span>
            <img
              src={post.publishedAt ? checkIcon : crossIcon}
              alt="status icon"
              className="w-5"
            />
          </p>
          <p className="text-sm text-neutral-800">
            Comments:
            <span className="font-semibold italic p-2">
              {post.comments.length}
            </span>
          </p>
        </div>
        <div className="flex flex-row mt-2 sm:flex-col gap-1 sm:w-8">
          <Link
            to={`/editor`}
            state={post}
            className="rounded-md p-1 border border-gray-200 hover:bg-slate-200">
            <img src={editIcon} alt="edit icon" className="w-6" />
          </Link>
          <Link
            className="rounded-md p-1 border border-gray-200 hover:bg-slate-200"
            onClick={openModal}>
            <img src={trashIcon} alt="trash icon" className="w-6" />
          </Link>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-3 relative">
          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-50 z-10 flex flex-col items-center justify-center">
              <img src={loadingIcon} alt="loading icon" className="w-14" />
            </div>
          )}

          <h2 className="text-xl font-semibold text-center border-b-2 border-slate-600 pb-2">
            Delete post
          </h2>

          <div className="text-center">
            <p className="mt-2 text-gray-700">
              Are you sure you want to delete
            </p>
            <p className="font-semibold text-lg">&quot;{post.title}&quot;</p>
          </div>

          <div className="flex justify-center gap-2">
            <Button className={'hover:bg-gray-200'} onClick={closeModal}>
              Cancel
            </Button>
            <Button
              className={
                'bg-red-500 text-white border-red-600 hover:bg-red-600'
              }
              onClick={onDeleteConfirm}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
  onRemove: PropTypes.func,
};
