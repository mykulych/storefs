import subcategoriesSlice from './subcategories.slice';
import { handleError } from '../errors/errors.actions';
import constantsService from '../../services/constants.service';

const { requested, received, failed } = subcategoriesSlice.actions;

const loadSubcategoriesByParentId = (parentId) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await constantsService.getSubcategoriesByParentId(parentId);
    dispatch(received(content));
  } catch (error) {
    dispatch(failed());
    dispatch(handleError(error));
  }
};

const loadSubcategories = () => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await constantsService.getSubcategories();
    dispatch(received(content));
  } catch (error) {
    dispatch(failed());
    dispatch(handleError(error));
  }
};

export { loadSubcategoriesByParentId, loadSubcategories };
