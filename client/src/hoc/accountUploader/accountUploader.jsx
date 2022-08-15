import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountId, getLoggedInStatus } from '../../store/auth/auth.selectors';
import { loadAccountById } from '../../store/account/account.actions';
import { getAccountData } from '../../store/account/account.selectors';
import { Spinner } from '../../components/layout';

function AccountUploader({ children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getLoggedInStatus());
  const accountData = useSelector(getAccountData());
  const accountId = useSelector(getAccountId());

  useEffect(() => {
    if (isLoggedIn && !accountData) {
      dispatch(loadAccountById(accountId));
    }
  }, [isLoggedIn, accountId]);

  if (isLoggedIn && !accountData) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Spinner />
        <p className="dark:text-white">Loading...</p>
      </div>
    );
  }
  return children;
}

AccountUploader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default AccountUploader;
