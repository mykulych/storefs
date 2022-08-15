import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CommentsForm from './commentsForm/commentsForm';
import { useDispatch, useSelector } from 'react-redux';
import { loadComments, removeComment } from '../../../store/comments/comments.actions';
import { getCommentsList } from '../../../store/comments/comments.selectors';
import CommentsList from './commentsList/commentsList';

function Comments({ parentId }) {
  const dispatch = useDispatch();
  const comments = useSelector(getCommentsList());

  useEffect(() => {
    if (!parentId) return;
    dispatch(loadComments(parentId));
  }, [parentId]);

  const handleRemove = (id) => {
    dispatch(removeComment(id));
  };

  return (
    <div className="space-y-4">
      <CommentsForm parentId={parentId} />
      <CommentsList comments={parentId ? comments : null} onRemove={handleRemove} />
    </div>
  );
}

Comments.propTypes = {
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Comments;
