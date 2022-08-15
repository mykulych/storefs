import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useModal } from '../../hooks';
import { Registration } from '../../components/layout';
import { useSelector } from 'react-redux';
import { getLoggedInStatus } from '../../store/auth/auth.selectors';
import { customHistory } from '../../utils/helpers';

function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(getLoggedInStatus());
  const { showModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      customHistory.push('/');
      showModal({ closable: true, title: 'Sign up', content: <Registration from={location} /> });
    }
  }, []);

  return isLoggedIn && children;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
