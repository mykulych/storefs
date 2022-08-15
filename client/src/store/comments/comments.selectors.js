const getCommentsList = () => (state) => {
  return state.comments.entities;
};

const getCommentsLoadingStatus = () => (state) => {
  return state.comments.loading;
};

export { getCommentsList, getCommentsLoadingStatus };
