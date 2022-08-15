const getAds = () => (state) => {
  return state.ads.entities;
};

const getAdsLoadingStatus = () => (state) => {
  return state.ads.loading;
};

export { getAds, getAdsLoadingStatus };
