import React from 'react';
import PropTypes from 'prop-types';

function CheckboxField({ register, label, id }) {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={id}
          type="checkbox"
          value=""
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300
                 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
          {...register('remember')}
        />
      </div>
      <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
    </div>
  );
}

CheckboxField.propTypes = {
  register: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default CheckboxField;
