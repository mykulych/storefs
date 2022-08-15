import errorsSlice from './errors.slice';
import { generateError } from '../../utils/helpers';

const { handled, cleared } = errorsSlice.actions;

const handleError = (error) => (dispatch) => {
  const message = generateError(error);
  dispatch(handled(message));
};

const clearErrors = () => (dispatch) => dispatch(cleared());

export { handleError, clearErrors };
