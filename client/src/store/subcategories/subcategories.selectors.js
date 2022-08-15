const getSubcategoriesList = () => (state) => {
  return state.subcategories.entities;
};

const getSubcategoriesLoadingStatus = () => (state) => {
  return state.subcategories.loading;
};

export { getSubcategoriesList, getSubcategoriesLoadingStatus };
