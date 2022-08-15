import React from 'react';
import PropTypes from 'prop-types';
import { TextAreaField } from '../../../common';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../../../store/comments/comments.actions';
import { getAccountId } from '../../../../store/auth/auth.selectors';
import { nanoid } from 'nanoid';

function CommentsForm({ parentId }) {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const currentUserId = useSelector(getAccountId());

  const onSubmit = (data) => {
    if (!parentId) return;
    dispatch(createComment({ ...data, id: nanoid(), publisher: currentUserId, parentId, created_at: Date.now() }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextAreaField register={register} id="content" placeholder="Leave a comment" rows="3" />
      <button
        type="submit"
        className="text-gray-900 text-sm bg-white border border-gray-300 focus:outline-none
                hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg
                text-bold text-sm px-5 py-2.5 mr-2 mb-2 mt-4 dark:bg-gray-800 dark:text-white dark:border-gray-600
                dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Send
      </button>
    </form>
  );
}

CommentsForm.propTypes = {
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CommentsForm;
