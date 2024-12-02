import PropTypes from 'prop-types';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';

import Button from '../../components/ui/Button';

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
    <div className="flex flex-col rounded-sm p-1">
      <div
        className="flex justify-between items-center cursor-pointer rounded-md"
        onClick={() => setHidden(!hidden)}>
        <p className="font-semibold text-lg">Categories</p>
        <p className="text-sm">{hidden ? 'Show' : 'Hide'}</p>
      </div>
      <div className={`${hidden ? 'hidden' : ''} flex flex-col gap-0.5 px-2`}>
        {loading && <p>Loading...</p>}
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

        <Button>Add new</Button>
      </div>
    </div>
  );
}

Categories.propTypes = {
  selectedCat: PropTypes.array.isRequired,
  post: PropTypes.object.isRequired,
  setPost: PropTypes.func.isRequired,
};
