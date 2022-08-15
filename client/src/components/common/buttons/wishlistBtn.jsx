import React from 'react';
import PropTypes from 'prop-types';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';

function WishlistBtn({ children, className: classes, iconClassName, handleClick, inWishlist }) {
  return (
    <button
      type="button"
      className={
        'text-gray-900 bg-white border border-gray-300 focus:outline-none ' +
        'hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg ' +
        'text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 ' +
        'dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ' +
        (classes && classes)
      }
      onClick={handleClick}
    >
      {inWishlist ? <HeartIconSolid className={iconClassName} /> : <HeartIconOutline className={iconClassName} />}
      {children}
    </button>
  );
}

WishlistBtn.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  handleClick: PropTypes.func,
  inWishlist: PropTypes.bool,
};

export default WishlistBtn;
