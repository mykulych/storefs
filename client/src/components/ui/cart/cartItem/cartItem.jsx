import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getAccountData } from '../../../../store/account/account.selectors';
import { updateCart, updateWishlist } from '../../../../store/account/account.actions';
import { CartBtn, WishlistBtn } from '../../../common';
import { getDateHelper } from '../../../../utils/helpers';

function CartItem({ item }) {
  const accountData = useSelector(getAccountData());
  const [inWishlist, setInWishlist] = useState(accountData?.wishlist?.includes(item.id));
  const [inCart, setInCart] = useState(accountData?.cart?.includes(item.id));
  const dispatch = useDispatch();

  const handleWishlist = () => {
    dispatch(updateWishlist(item.id));
    setInWishlist((prev) => !prev);
  };

  const handleCart = () => {
    dispatch(updateCart(item.id));
    setInCart((prev) => !prev);
  };

  return (
    <div key={item.id} className="w-full flex space-x-4 pb-6 border-b border-gray-200 dark:border-gray-600">
      <img src={item.adImagesUrl} className="w-28" />
      <div className="w-full space-y-2">
        <div className="w-full flex items-end justify-between">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
          <div className="flex items-center space-x-4 ">
            <WishlistBtn
              className="px-2 py-1 dark:bg-gray-700"
              iconClassName="w-7 h-7"
              inWishlist={inWishlist}
              handleClick={handleWishlist}
            />
            <CartBtn className="px-2 py-[5px]" iconClassName="w-7 h-7" inCart={inCart} handleClick={handleCart} />
          </div>
        </div>
        <div className="w-full flex items-start justify-between">
          <p className="font-normal text-lg text-gray-700 dark:text-gray-400">
            {item.publisher.name} {item.publisher.surname} - {getDateHelper(item.createdAt)}
          </p>
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">{item.price} $</span>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
