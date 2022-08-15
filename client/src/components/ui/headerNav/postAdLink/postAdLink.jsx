import React from 'react';
import { Link } from 'react-router-dom';

function PostAdLink() {
  return (
    <Link
      to="/post-new-ad"
      className="text-gray-900 bg-white border border-gray-300 focus:outline-none
    hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm
      px-3.5 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700
    dark:hover:border-gray-600 dark:focus:ring-gray-700"
    >
      Post new ad
    </Link>
  );
}

export default PostAdLink;
