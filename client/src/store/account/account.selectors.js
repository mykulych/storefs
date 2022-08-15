const getAccountData = () => (state) => {
  return state.account.entity;
};

const getAccountLoadingStatus = () => (state) => {
  return state.account.loading;
};

export { getAccountData, getAccountLoadingStatus };
