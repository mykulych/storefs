import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { userService } from '../../../../services';
import { toast } from 'react-toastify';
import { getDateHelper } from '../../../../utils/helpers';
import { XIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import { getAccountData } from '../../../../store/account/account.selectors';

function Comment({ comment, onRemove }) {
  const [user, setUser] = useState();
  const currentUser = useSelector(getAccountData());
  console.log('current: ', currentUser);

  useEffect(() => {
    async function loadUserById() {
      try {
        const { content } = await userService.getUserById(comment?.publisher);
        setUser(content);
      } catch (error) {
        toast.error(error.message);
      }
    }
    loadUserById();
  }, []);

  console.log('publisher: ', comment.publisher);

  const getRemoveButton = () => {
    if (currentUser?.id === comment.publisher || currentUser?.role === 'admin') {
      return (
        <button
          type="button"
          onClick={() => onRemove(comment.id)}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none
        hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg
        text-sm px-4 py-2 dark:bg-gray-800 dark:text-white
        dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <XIcon className="w-4 h-4 dark:text-white" />
        </button>
      );
    }
  };

  return (
    <div className="flex flex-col px-6 py-4 mb-3 space-y-3 bg-gray-200 dark:bg-gray-700">
      <div className="flex items-center justify-between">
        <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
          {user?.name} {user?.surname} - {getDateHelper(comment?.createdAt)}
        </h5>
        {getRemoveButton()}
      </div>

      <p className="font-normal text-gray-900 dark:text-gray-50">{comment.content}</p>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  onRemove: PropTypes.func,
};

export default Comment;
