import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelSellAds, loadOrders } from '../../../../store/ads/ads.actions';
import { getAds } from '../../../../store/ads/ads.selectors';
import { AdsLoader } from '../../../../hoc';
import { Ad } from '../../';
import { List } from '../../../common';
import { customHistory } from '../../../../utils/helpers';
import { EmptyPage } from '../../../../pages';

function Orders() {
  const dispatch = useDispatch();
  const ads = useSelector(getAds());

  const AdsList = List(Ad);

  useEffect(() => {
    dispatch(loadOrders());
  }, []);

  const handleCancelOrders = () => {
    dispatch(cancelSellAds(ads));
    customHistory.push('/result', { private: true });
  };

  return (
    <AdsLoader>
      {ads?.length ? (
        <>
          <div className="w-full px-4 mb-4">
            <div className="w-full h-full p-2 rounded-lg flex items-center bg-gray-200 dark:bg-gray-800">
              <button
                type="button"
                onClick={handleCancelOrders}
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none
        hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm
        px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700
        dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Cancel orders
              </button>
            </div>
          </div>

          <AdsList items={ads} columns="4" />
        </>
      ) : (
        <div className="w-full h-64 flex flex-col justify-center items-center space-y-2">
          <EmptyPage title="You haven't ordered anything yet" btnTitle='Order' path="/" />
        </div>
      )}
    </AdsLoader>
  );
}

export default Orders;
