import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { SearchField } from '../../common';
import { getSubcategoriesList } from '../../../store/subcategories/subcategories.selectors';
import { customHistory } from '../../../utils/helpers';

function SearchForm() {
  const { register, handleSubmit, watch, getValues, reset } = useForm();
  const subcategories = useSelector(getSubcategoriesList());
  const [items, setItems] = useState([]);
  const searchValue = getValues('search');

  useEffect(() => {}, [watch('search')]);

  useEffect(() => {
    if (subcategories.length) {
      if (searchValue) {
        const search = subcategories.filter((subcat) => {
          const dividedValue = searchValue.split();
          const valueLength = searchValue.split('').length;
          const dividedName = subcat.name.split('', valueLength);

          if (dividedName?.join('').trim().toLowerCase() === dividedValue?.join().trim().toLowerCase()) {
            return subcat;
          }
          return null;
        });
        setItems(search);
      } else {
        setItems([]);
      }
    }
  }, [watch('search')]);

  const onSubmit = (data) => {
    if (items[0]) {
      customHistory.push(`/catalog/${items[0].parent_id}/${items[0].id}`);
    }
    reset();
  };

  return (
    <div className="flex flex-col relative">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <SearchField
          register={register}
          type="search"
          id="search"
          placeholder="I search..."
          options={{ require: true }}
        />
      </form>
      {items.length ? (
        <div
          id="dropdown"
          className="absolute top-16 z-10 w-full bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/catalog/${item.parent_id}/${item.id}`}
                  className="flex items-center block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <img className="w-16 h-10 mr-4" src={item.image} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default SearchForm;
