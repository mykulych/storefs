import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getErrors } from '../../store/errors/errors.selectors';
import { clearErrors } from '../../store/errors/errors.actions';

function ErrorHandler({ children }) {
  const dispatch = useDispatch();
  const errors = useSelector(getErrors());

  useEffect(() => {
    if (errors) {
      errors.forEach((error) => {
        toast.error(error);
      });
      dispatch(clearErrors());
    }
  }, [errors]);

  return children;
}

ErrorHandler.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default ErrorHandler;
