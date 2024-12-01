import PropTypes from 'prop-types';

import editIcon from '../../assets/edit.svg';
import trashIcon from '../../assets/trash.svg';
import { formatDate } from '../../lib/utils';

export default function PostCard({ post }) {
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
          <p className="text-sm text-neutral-800">
            Published at:
            <span className="font-semibold italic p-2">
              {post.publishedAt ? formatDate(post.publishedAt) : 'Unpublished'}
            </span>
          </p>
          <p className="text-sm text-neutral-800">
            Comments:
            <span className="font-semibold italic p-2">
              {post.comments.length}
            </span>
          </p>
        </div>
        <div className="flex flex-row mt-2 sm:flex-col gap-1 sm:w-8">
          <button className="rounded-md p-1 border border-gray-200 hover:bg-slate-200">
            <img src={editIcon} alt="edit icon" className="w-6" />
          </button>
          <button className="rounded-md p-1 border border-gray-200 hover:bg-slate-200">
            <img src={trashIcon} alt="trash icon" className="w-6" />
          </button>
        </div>
      </div>
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
};
