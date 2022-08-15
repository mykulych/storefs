import { createAction } from '@reduxjs/toolkit';
import { commentsService } from '../../services';
import { handleError } from '../errors/errors.actions';
import commentsSlice from './comments.slice';
import { sortHelper } from '../../utils/helpers';

const { created, requested, received, failed, removed } = commentsSlice.actions;
const creationRequested = createAction('comments/creationRequested');
const creationFailed = createAction('comments/creationFailed');
const removeRequested = createAction('comments/removeRequested');
const removeFailed = createAction('comments/removeFailed');

const createComment = (payload) => async (dispatch) => {
  dispatch(creationRequested());
  try {
    const { content } = await commentsService.create(payload);
    dispatch(created(content));
  } catch (error) {
    dispatch(creationFailed());
    dispatch(handleError(error));
  }
};

const loadComments = (parentId) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await commentsService.get(parentId);
    const sortedContent = sortHelper(content);
    dispatch(received(sortedContent));
  } catch (error) {
    dispatch(failed());
    dispatch(handleError(error));
  }
};

const removeComment = (id) => async (dispatch) => {
  dispatch(removeRequested());
  try {
    const { content } = await commentsService.remove(id);
    console.log('conetnt: ', content);
    if (!content) {
      dispatch(removed(id));
    }
  } catch (error) {
    dispatch(removeFailed());
    dispatch(handleError(error));
  }
};

export { createComment, loadComments, removeComment };
