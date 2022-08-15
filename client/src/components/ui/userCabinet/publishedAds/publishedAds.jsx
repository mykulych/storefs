import React, { useEffect } from 'react';
import { List } from '../../../common';
import Ad from '../../ads/ad';
import { useDispatch, useSelector } from 'react-redux';
import { loadAds } from '../../../../store/ads/ads.actions';
import { getAds } from '../../../../store/ads/ads.selectors';
import { getAccountId } from '../../../../store/auth/auth.selectors';
import { AdsLoader } from '../../../../hoc';
import EmptyPage from '../../../../pages/empty/empty';

function PublishedAds() {
  const currentUserId = useSelector(getAccountId());
  const dispatch = useDispatch();
  const ads = useSelector(getAds());
  const AdsList = List(Ad);

  useEffect(() => {
    dispatch(loadAds('publisher', currentUserId));
  }, []);

  return (
    <AdsLoader>
      {ads?.length ? (
        <AdsList items={ads} columns="4" />
      ) : (
        <div className="w-full h-64 flex flex-col justify-center items-center space-y-2">
          <EmptyPage title="You have not published any ad" btnTitle="Publish" path="/post-new-ad" />
        </div>
      )}
    </AdsLoader>
  );
}

export default PublishedAds;
