import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import * as icons from '@fortawesome/free-solid-svg-icons';

function GroupItem({ item, onClick, onMouseOver }) {
  return (
    <li
      onClick={() => (onClick ? onClick(item) : null)}
      onMouseOver={() => (onMouseOver ? onMouseOver(item) : null)}
      role="button"
      className="relative mb-1 inline-flex items-center justify-between rounded w-full px-5 py-3 text-sm font-medium
    hover:bg-gray-200 hover:text-blue-700 focus:bg-gray-200 focus:ring-blue-700 focus:text-blue-700
    dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500
    dark:focus:text-white dark:focus:bg-gray-600"
    >
      <div className="flex items-center">
        {item.icon && (
          <span className="mr-5">
            <FontAwesomeIcon className="w-4 h-4" icon={icons[item.icon]} />
          </span>
        )}
        <p className="mr-2">{item.name}</p>
      </div>
      <FontAwesomeIcon icon={faAngleRight} />
    </li>
  );
}

GroupItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
};

export default GroupItem;
