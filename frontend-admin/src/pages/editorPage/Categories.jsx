import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';

import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Modal from '../../components/Modal';
import arrowDown from '../../assets/arrow-down.svg';
import loadingIcon from '../../assets/loading.svg';

export default function Categories({ selectedCat, post, setPost }) {
  const { loading, error, data } = useFetch('/categories');

  const [selected, setSelected] = useState(selectedCat);
  const [hidden, setHidden] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    setCategories(data);
  }, [data]);

  function handleChange(e) {
    const { id, name, checked } = e.target;

    if (checked) {
      // Add selected category
      const newSelected = [...selected, { id, name }];
      setSelected(newSelected);
      setPost({ ...post, categories: newSelected });
    } else {
      // Remove unselected category
      const newSelected = selected.filter(cat => cat.name !== name);
      setSelected(newSelected);
      setPost({ ...post, categories: newSelected });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (categories.some(el => el.name === input)) return;
    setCategories([...categories, { name: input }]);
    closeModal();
    setInput('');
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (error) return <>{error}</>;
  return (
    <>
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
        <div
          className={`${hidden ? 'hidden' : ''} flex flex-col px-3 pb-2 mt-2`}>
          {loading && (
            <img
              src={loadingIcon}
              alt="loading icon"
              className="w-10 mx-auto"
            />
          )}
          {categories &&
            categories.map(cat => {
              const isChecked = selected.some(
                current => current.name === cat.name,
              );
              return (
                <label
                  htmlFor={cat.id || cat.name}
                  key={cat.name}
                  className="flex gap-2 items-center cursor-pointer p-0.5 rounded-sm hover:bg-slate-300">
                  <input
                    type="checkbox"
                    id={cat.id || cat.name} // Use name when id is undefined
                    name={cat.name}
                    checked={isChecked}
                    onChange={handleChange}
                  />
                  {cat.name}
                </label>
              );
            })}

          <Button className="mt-3" onClick={openModal}>
            Add new
          </Button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form
          onSubmit={handleSubmit}
          method="dialog"
          className="flex flex-col gap-3 relative">
          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-50 z-10 flex flex-col items-center justify-center">
              <img src={loadingIcon} alt="loading icon" className="w-14" />
            </div>
          )}

          <h2 className="text-xl font-semibold text-center">
            Add new category
          </h2>

          <FormControl>
            <label htmlFor="name">Category name</label>
            <Input
              id="name"
              name="name"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </FormControl>

          <div className="flex justify-center gap-2">
            <Button
              type="reset"
              className={'hover:bg-gray-200'}
              onClick={closeModal}>
              Cancel
            </Button>
            <Button
              className={
                'bg-green-500 text-white border-green-400 hover:bg-green-600'
              }
              type="submit">
              Confirm
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

Categories.propTypes = {
  selectedCat: PropTypes.array.isRequired,
  post: PropTypes.object.isRequired,
  setPost: PropTypes.func.isRequired,
};
