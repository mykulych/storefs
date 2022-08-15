import React from 'react';

function PostSubmitBtn() {
  return (
    <button
      type="submit"
      className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4
    focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-3 mb-2 dark:bg-purple-600
    dark:hover:bg-purple-700 dark:focus:ring-purple-900"
    >
      Publish
    </button>
  );
}

export default PostSubmitBtn;
