import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GroupList, List } from '../../components/common';
import { Ad, SearchForm } from '../../components/ui';
import { AdsLoader } from '../../hoc';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesList, getCategoriesLoadingStatus } from '../../store/categories/categories.selectors';
import { getAds } from '../../store/ads/ads.selectors';
import { loadCategories } from '../../store/categories/categories.actions';
import { loadSubcategories } from '../../store/subcategories/subcategories.actions';
import { loadRecentlyAds } from '../../store/ads/ads.actions';
import { customHistory } from '../../utils/helpers';
import { EmojiSadIcon } from '@heroicons/react/outline';

function Main() {
  const dispatch = useDispatch();
  const categories = useSelector(getCategoriesList());
  const categoriesLoading = useSelector(getCategoriesLoadingStatus());
  const ads = useSelector(getAds());
  const AdsList = List(Ad);

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadSubcategories());
    dispatch(loadRecentlyAds());
  }, []);

  const handleMainCategoriesList = ({ id }) => {
    customHistory.push(`/catalog/${id}`);
  };

  return (
    <div className="relative container mx-auto flex">
      <div className="w-[26%]">
        <div className="border-r border-gray-200 dark:border-gray-600 pt-6">
          {!categoriesLoading && <GroupList items={categories} onClick={handleMainCategoriesList} />}
        </div>
      </div>
      <div className="w-full pt-6">
        <div className="w-full max-w-2xl mx-auto mb-6">
          <SearchForm />
        </div>
        <div className="px-2">
          <AdsLoader>
            {ads?.length ? (
              <>
                <h5 className="mb-4 ml-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Latest ads
                </h5>
                <AdsList items={ads} columns="4" />
              </>
            ) : (
              <div className="w-full h-96 flex flex-col justify-center items-center">
                <EmojiSadIcon className="w-56 h-56 mb-5 text-gray-700 dark:text-gray-300" />
                <h5 className="mb-4 ml-8 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  There are no published ads yet
                </h5>

                <Link to="/post-new-ad">
                  <span
                    className="block py-2 pr-4 pl-3 text-2xl text-gray-700 border-b border-gray-100 hover:bg-gray-50
          md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400
          md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Publish
                  </span>
                </Link>
              </div>
            )}
          </AdsLoader>
        </div>
      </div>
    </div>
  );
}

export default Main;
