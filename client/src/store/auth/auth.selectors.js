const getAccountId = () => (state) => {
  return state.auth.accountId;
};

const getLoggedInStatus = () => (state) => {
  return state.auth.isLoggedIn;
};

export { getAccountId, getLoggedInStatus };
