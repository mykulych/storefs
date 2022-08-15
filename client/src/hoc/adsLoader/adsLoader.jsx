import React from 'react';
import { useSelector } from 'react-redux';
import { getAds, getAdsLoadingStatus } from '../../store/ads/ads.selectors';
import { Spinner } from '../../components/layout';
import PropTypes from 'prop-types';

function AdsLoader({ children }) {
  const isLoading = useSelector(getAdsLoadingStatus());
  const ads = useSelector(getAds());

  if (isLoading || !ads) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Spinner />
        <p className="dark:text-white">Loading ads...</p>
      </div>
    );
  }
  return children;
}

AdsLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default AdsLoader;
