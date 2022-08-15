import React from 'react';
import PropTypes from 'prop-types';

function SelectField({ register, label, id, items, options }) {
  return (
    <>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        {label}
      </label>
      <select
        id={id}
        {...register(id, { ...options })}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
}

SelectField.defaultProps = {
  label: '',
};

SelectField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  items: PropTypes.array,
  register: PropTypes.func.isRequired,
  options: PropTypes.object,
};

export default SelectField;
