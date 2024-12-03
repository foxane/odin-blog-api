import PropTypes from 'prop-types';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';

import Button from '../../components/ui/Button';
import arrowDown from '../../assets/arrow-down.svg';
import loadingIcon from '../../assets/loading.svg';

export default function Categories({ selectedCat, post, setPost }) {
  const [selected, setSelected] = useState(selectedCat);
  const [hidden, setHidden] = useState(true);

  const {
    loading,
    error,
    data: categories,
  } = useFetch('/categories', 'categories');

  function handleChange(e) {
    const { id, name, checked } = e.target;

    if (checked) {
      // Add selected category
      const newSelected = [...selected, { id, name }];
      setSelected(newSelected);
      setPost({ ...post, categories: newSelected });
    } else {
      // Remove unselected category
      const newSelected = selected.filter(cat => cat.id !== id);
      setSelected(newSelected);
      setPost({ ...post, categories: newSelected });
    }
  }

  if (error) return <>{error}</>;
  return (
    <div className="flex flex-col rounded-sm p-0 border border-slate-500">
      <button
        className="cursor-pointer flex justify-between p-2 rounded-sm border-b border-slate-500"
        onClick={() => setHidden(!hidden)}>
        Categories
        <img
          src={arrowDown}
          alt="arrow icon"
          className={`${
            hidden ? 'rotate-0' : 'rotate-180'
          } w-6 transition-transform`}
        />
      </button>
      <div className={`${hidden ? 'hidden' : ''} flex flex-col px-3 pb-2 mt-2`}>
        {loading && (
          <img src={loadingIcon} alt="loading icon" className="w-10 mx-auto" />
        )}
        {categories &&
          categories.map(cat => {
            const isChecked = selected.some(
              selectedCat => selectedCat.id === cat.id,
            );
            return (
              <label
                htmlFor={cat.id}
                key={cat.name}
                className="flex gap-2 items-center cursor-pointer p-0.5 rounded-sm hover:bg-slate-300">
                <input
                  type="checkbox"
                  id={cat.id}
                  name={cat.name}
                  checked={isChecked}
                  onChange={handleChange}
                />
                {cat.name}
              </label>
            );
          })}

        <Button className="mt-3">Add new</Button>
      </div>
    </div>
  );
}

Categories.propTypes = {
  selectedCat: PropTypes.array.isRequired,
  post: PropTypes.object.isRequired,
  setPost: PropTypes.func.isRequired,
};
