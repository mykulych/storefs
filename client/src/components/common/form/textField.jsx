import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

function TextField({ register, label, placeholder, type, id, options, error }) {
  const [showPassword, setShowPassword] = useState(false);

  const getInputClasses = () => {
    return (
      'shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg' +
      ' block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600' +
      ' dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ' +
      (error
        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500')
    );
  };

  const toggleShowPassword = (e) => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2 ml-1 text-xl font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type={showPassword ? 'text' : type}
          id={id}
          className={getInputClasses()}
          placeholder={placeholder || ''}
          {...register(id, { ...options })}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-[#f84147] text-[12px] mt-1 pl-1">{error}</p>}
    </div>
  );
}

TextField.defaultProps = {
  type: 'text',
};

TextField.propTypes = {
  register: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  options: PropTypes.object,
  error: PropTypes.string,
};

export default TextField;
