import React, { useEffect, useState } from 'react';
import { AdDetailsLayout } from '../../components/ui';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdById } from '../../store/ads/ads.actions';
import { getAds } from '../../store/ads/ads.selectors';
import { AdsLoader } from '../../hoc';
import { updateCart, updateWishlist } from '../../store/account/account.actions';
import { getAccountData } from '../../store/account/account.selectors';
import { toast } from 'react-toastify';
import { getLoggedInStatus } from '../../store/auth/auth.selectors';

function AdDetails() {
  const { adId } = useParams();
  const dispatch = useDispatch();
  const ads = useSelector(getAds());
  const ad = ads?.find(() => true);
  const accountData = useSelector(getAccountData());
  const isLoggedIn = useSelector(getLoggedInStatus());
  const [inWishlist, setInWishlist] = useState(accountData?.wishlist?.includes(adId));
  const [inCart, setInCart] = useState(accountData?.cart?.includes(adId));

  useEffect(() => {
    dispatch(loadAdById(adId));
  }, []);

  function handleWishlist() {
    if (isLoggedIn) {
      dispatch(updateWishlist(adId));
      setInWishlist((prev) => !prev);
    } else {
      toast.error('Register or log in to use the wish list');
    }
  }

  function handleCart() {
    if (isLoggedIn) {
      dispatch(updateCart(adId));
      setInCart((prev) => !prev);
    } else {
      toast.error('Regiter or log in to use cart');
    }
  }

  return (
    <AdsLoader>
      <AdDetailsLayout
        ad={ad}
        adId={adId}
        inWishlist={inWishlist}
        inCart={inCart}
        handleWishlist={handleWishlist}
        handleCart={handleCart}
      />
    </AdsLoader>
  );
}
export default AdDetails;
