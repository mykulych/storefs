import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function EmptyPage({ title, btnTitle, path }) {
  return (
    <>
      <p className="mb-2 text-3xl font-semibold tracking-normal text-gray-900 dark:text-white">{title}</p>
      <Link to={path}>
        <button
          type="button"
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800
            focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2
            dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          {btnTitle}
        </button>{' '}
      </Link>
    </>
  );
}

EmptyPage.propTypes = {
  title: PropTypes.string,
  btnTitle: PropTypes.string,
  path: PropTypes.string,
};

export default EmptyPage;
