import categoriesSlice from './categories.slice';
import { handleError } from '../errors/errors.actions';
import constantsService from '../../services/constants.service';

const { requested, received, failed } = categoriesSlice.actions;

const loadCategories = () => async (dispatch, getState) => {
  const { lastFetch } = getState().categories;
  if (isOutdated(lastFetch)) {
    dispatch(requested());
    try {
      const { content } = await constantsService.getCategories();
      dispatch(received(content));
    } catch (error) {
      dispatch(failed());
      dispatch(handleError(error));
    }
  }
};

const isOutdated = (date) => {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
};

export { loadCategories };
