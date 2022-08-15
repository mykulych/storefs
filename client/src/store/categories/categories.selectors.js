const getCategoriesList = () => (state) => {
  return state.categories.entities;
};

const getCategoriesLoadingStatus = () => (state) => {
  return state.categories.loading;
};

export { getCategoriesList, getCategoriesLoadingStatus };
