import React, { useEffect, useState } from 'react';
import CartItem from './cartItem/cartItem';
import { useDispatch, useSelector } from 'react-redux';
import EmptyPage from '../../../pages/empty/empty';
import { getAccountData } from '../../../store/account/account.selectors';
import { sellAds } from '../../../store/ads/ads.actions';
import CartImage from '../../../assets/cart-image.png';
import { useModal } from '../../../hooks';
import { adsService } from '../../../services';
import { Spinner } from '../../layout';
import { customHistory } from '../../../utils/helpers';

function Cart() {
  const accountData = useSelector(getAccountData());
  const [ads, setAds] = useState();
  const [loading, setLoading] = useState(true);
  const { hideModal } = useModal();
  const dispatch = useDispatch();

  const handleOrder = () => {
    console.log('ordered all');
    hideModal();
    customHistory.push('/result', { private: true });
    dispatch(sellAds(ads));
  };

  useEffect(() => {
    setAds([]);
    async function loadAds() {
      setLoading(true);
      const { content } = await adsService.getCollection(accountData.cart);
      setAds(content);
    }

    if (accountData?.cart?.length) {
      loadAds().then(() => setLoading(false));
    } else {
      setAds([]);
    }
  }, [accountData.cart]);

  const getSumOfAllAds = () => {
    return ads?.reduce((acc, item) => {
      return acc + +item.price;
    }, 0);
  };

  if (!accountData?.cart?.length) {
    return (
      <div className="flex flex-col w-full items-center justify-center space-y-4">
        <img className="w-40" src={CartImage} alt="" />
        <EmptyPage title="Cart is empty" btnTitle="Main page" path="/" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-80">
        <Spinner />
        <p className="text-lg dark:text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full space-y-7">
      {accountData?.cart?.length && ads?.length ? ads.map((item) => <CartItem key={item.id} item={item} />) : null}

      <div className="w-full flex justify-between items-center">
        <button
          type="button"
          onClick={hideModal}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Continue shopping
        </button>
        <div className="flex flex-col space-y-4 px-14 py-4 rounded-lg border border-gray-200 dark:border-gray-600">
          <span className="text-4xl font-semibold text-gray-900 dark:text-white">{getSumOfAllAds()} $</span>
          <button
            type="button"
            onClick={handleOrder}
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Order all
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
