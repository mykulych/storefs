import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../comment/comment';

function CommentsList({ comments, onRemove }) {
  return comments?.map((comment) => <Comment key={comment.id} comment={comment} onRemove={onRemove} />);
}

CommentsList.propTypes = {
  comments: PropTypes.array,
  onRemove: PropTypes.func,
};

export default CommentsList;
