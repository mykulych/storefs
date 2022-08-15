import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { WishlistBtn, CartBtn } from '../../common';
import { getDateHelper } from '../../../utils/helpers';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart, updateWishlist } from '../../../store/account/account.actions';
import { getAccountData } from '../../../store/account/account.selectors';
import { getLoggedInStatus } from '../../../store/auth/auth.selectors';

function Ad({ item }) {
  const accountData = useSelector(getAccountData());
  const isLoggedIn = useSelector(getLoggedInStatus());
  const [inWishlist, setInWishlist] = useState(accountData?.wishlist?.includes(item.id));
  const [inCart, setInCart] = useState(accountData?.cart?.includes(item.id));
  const dispatch = useDispatch();

  const handleCart = (event) => {
    if (item.buyer) {
      return event.preventDefault();
    }
    if (isLoggedIn) {
      dispatch(updateCart(item.id));
      setInCart((prev) => !prev);
    } else {
      toast.error('Register or log in to use the cart');
    }
  };

  const handleWishList = (event) => {
    if (item.buyer) {
      return event.preventDefault();
    }
    if (isLoggedIn) {
      dispatch(updateWishlist(item.id));
      setInWishlist((prev) => !prev);
    } else {
      toast.error('Register or log in to use the wish list');
    }
  };

  const handleClick = (event) => {
    if (item.buyer) {
      event.preventDefault();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-[240px] h-[316px] relative border border-gray-200 mb-4 dark:bg-gray-800 p-2 dark:border-gray-700"
    >
      <div className="flex flex-col h-full">
        <Link className={item?.buyer && 'pointer-events-none'} to={`/${item.id}`}>
          <img className="w-full h-48" src={item?.adImagesUrl[0]} alt="" />
        </Link>
        <div className="py-2 space-y-3">
          <Link className={item?.buyer && 'pointer-events-none'} to={`/${item.id}`}>
            <h5 className="text-base mt-2 font-semibold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
          </Link>
          <div>
            <h5 className="text-sm text-gray-500 dark:text-gray-400">
              {item?.publisher?.name} {item?.publisher?.surname} - {getDateHelper(item.createdAt)}
            </h5>
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-gray-900 dark:text-white">
                {item.price ? '$' + item.price : 'Exchange'}
              </span>
              <div className="flex items-center">
                <WishlistBtn
                  className="px-2 py-1 mr-2"
                  iconClassName="w-4 h-4"
                  inWishlist={inWishlist}
                  handleClick={handleWishList}
                />
                <CartBtn
                  className="px-[9px] py-[5px]"
                  iconClassName="w-4 h-4"
                  inCart={inCart}
                  handleClick={handleCart}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Ad.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Ad;
