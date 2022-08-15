import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { WishlistBtn, CartBtn, Card, Slider, Breadcrumb } from '../../common';
import { Comments } from '../index';
import { getDateHelper, customHistory } from '../../../utils/helpers';
import { CogIcon, XIcon } from '@heroicons/react/outline';
import { useSelector, useDispatch } from 'react-redux';
import { getAccountData } from '../../../store/account/account.selectors';
import { removeAd } from '../../../store/ads/ads.actions';
import { useModal } from '../../../hooks';
import { getCategoriesList, getCategoriesLoadingStatus } from '../../../store/categories/categories.selectors';
import {
  getSubcategoriesList,
  getSubcategoriesLoadingStatus,
} from '../../../store/subcategories/subcategories.selectors';
import { loadCategories } from '../../../store/categories/categories.actions';
import { loadSubcategories } from '../../../store/subcategories/subcategories.actions';

function AdDetailsLayout({ ad, adId, inWishlist, handleWishlist, inCart, handleCart }) {
  const accountData = useSelector(getAccountData());
  const categories = useSelector(getCategoriesList());
  const categoriesLoadingStatus = useSelector(getCategoriesLoadingStatus());
  const subcategories = useSelector(getSubcategoriesList());
  const subcategoriesLoadingStatus = useSelector(getSubcategoriesLoadingStatus());
  const dispatch = useDispatch();
  const { showModal, hideModal } = useModal();

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadSubcategories());
  }, []);

  const handleEdit = () => {
    customHistory.push(`/${adId}/edit`);
  };

  const handleRemove = (id) => {
    showModal({
      title: 'Remove ad',
      closable: true,
      content: <h1 className="text-lg dark:text-white">Are you sure you want to remove ad?</h1>,
      footerButtons: [
        {
          text: 'Confirm',
          handler() {
            dispatch(removeAd(id));
            customHistory.push('/result', { private: true });
            hideModal();
          },
        },
        {
          text: 'Cancel',
          handler: hideModal,
        },
      ],
    });
  };

  const getBreadcrumbItems = () => {
    if (!categoriesLoadingStatus && !subcategoriesLoadingStatus) {
      const selectedSubcategory = subcategories.find((item) => item.id === ad.category);
      const selectedCategory = categories.find((item) => item.id === selectedSubcategory?.parent_id);
      return [
        {
          ...selectedCategory,
          path: selectedCategory?.id,
        },
        {
          ...selectedSubcategory,
          path: selectedSubcategory?.id,
        },
      ];
    }
  };

  return (
    <div className="container mx-auto px-4 flex flex-col justify-center mt-6 mb-6">
      <div className="mb-4 flex items-center justify-between">
        <Breadcrumb items={getBreadcrumbItems()} />
        {accountData?.id === ad?.publisher?._id || accountData?.role === 'admin' ? (
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleEdit}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <CogIcon className="w-7 h-7" />
            </button>
            <button
              type="button"
              onClick={() => handleRemove(ad?.id)}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <XIcon className="w-7 h-7" />
            </button>
          </div>
        ) : null}
      </div>
      <div className="container relative space-y-6">
        {ad?.adImagesUrl?.length === 1 ? (
          <img
            src={ad?.adImagesUrl[0]}
            className="w-full h-[40rem] 2xl:h-[35rem] xl:h-[30rem] lg:h-[25rem] md:h-[20rem] sm:h-[20rem]"
          />
        ) : (
          <Slider items={ad?.adImagesUrl} />
        )}

        <Card className="w-full space-y-4">
          <h5 className="text-xl font-semibold text-gray-900 dark:text-white">{ad?.name}</h5>
          <div>
            <h6 className="text-base font-normal text-gray-900 dark:text-white">Description:</h6>
            <p className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">{ad?.description}</p>
          </div>
          <div className="space-y-0.5">
            <h5 className="text-base text-gray-500 dark:text-gray-400">
              {ad?.publisher?.name} {ad?.publisher?.surname} {ad?.createdAt ? getDateHelper(ad?.createdAt) : '10:10'}
            </h5>
            <div className="flex w-full justify-between">
              <span className="text-3xl font-semibold text-gray-900 dark:text-white">{ad?.price} $</span>
              <div className="flex items-center px-5">
                <WishlistBtn
                  className="px-3 py-1.5 mr-2 mb-2"
                  iconClassName="w-6 h-6"
                  handleClick={handleWishlist || null}
                  inWishlist={inWishlist || false}
                />
                <CartBtn
                  className="flex items-center px-4 py-2 mb-2"
                  iconClassName="w-5 h-5 mr-2"
                  inCart={inCart || false}
                  handleClick={handleCart || null}
                >
                  {inCart ? 'Remove from cart' : 'Add to cart'}
                </CartBtn>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="text-xl mb-4 font-semibold text-gray-900 dark:text-white">Comments</h3>
          <Comments parentId={adId || ''} />
        </Card>
      </div>
    </div>
  );
}

AdDetailsLayout.propTypes = {
  ad: PropTypes.object,
  adId: PropTypes.string,
  user: PropTypes.object,
  inWishlist: PropTypes.bool,
  inCart: PropTypes.bool,
  handleWishlist: PropTypes.func,
  handleCart: PropTypes.func,
};

export default AdDetailsLayout;
