import React from 'react';
import PropTypes from 'prop-types';
import { ShoppingCartIcon as ShoppingCartIconOutline } from '@heroicons/react/outline';
import { ShoppingCartIcon as ShoppingCartIconSolid } from '@heroicons/react/solid';

function CartBtn({ children, className: classes, iconClassName, inCart, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className={
        'focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 ' +
        'focus:ring-purple-300 font-medium rounded-lg text-sm ' +
        'dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ' +
        (classes || '')
      }
    >
      {inCart ? (
        <ShoppingCartIconSolid className={iconClassName} />
      ) : (
        <ShoppingCartIconOutline className={iconClassName} />
      )}
      {children}
    </button>
  );
}

CartBtn.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  inCart: PropTypes.bool,
  handleClick: PropTypes.func,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
};

export default CartBtn;
