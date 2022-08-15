import React from 'react';
import PropTypes from 'prop-types';

function TextAreaField({ register, label, id, placeholder, options, rows }) {
  return (
    <>
      <label htmlFor={id} className="block mb-2 ml-1 text-xl font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows || 3}
        {...register(id, { ...options })}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder || ''}
      />
    </>
  );
}

TextAreaField.propTypes = {
  register: PropTypes.func.isRequired,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  options: PropTypes.object,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.string,
};

export default TextAreaField;
