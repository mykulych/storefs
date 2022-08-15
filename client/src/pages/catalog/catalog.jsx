import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Ad, Subcategory } from '../../components/ui';
import { List, Breadcrumb } from '../../components/common';
import { useDispatch, useSelector } from 'react-redux';
import { loadAds } from '../../store/ads/ads.actions';
import { getAds } from '../../store/ads/ads.selectors';
import { getCategoriesList, getCategoriesLoadingStatus } from '../../store/categories/categories.selectors';
import { loadCategories } from '../../store/categories/categories.actions';
import { getSubcategoriesList, getSubcategoriesLoadingStatus } from '../../store/subcategories/subcategories.selectors';
import { loadSubcategoriesByParentId } from '../../store/subcategories/subcategories.actions';
import { AdsLoader } from '../../hoc';
import EmptyPage from '../empty/empty';

function Catalog() {
  const { mainCategory, subCategory } = useParams();
  const dispatch = useDispatch();
  const ads = useSelector(getAds());
  const categories = useSelector(getCategoriesList());
  const categoriesLoadingStatus = useSelector(getCategoriesLoadingStatus());
  const subcategories = useSelector(getSubcategoriesList());
  const subcategoriesLoading = useSelector(getSubcategoriesLoadingStatus());

  const SubCategoriesList = List(Subcategory);
  const AdsList = List(Ad);

  useEffect(() => {
    dispatch(loadSubcategoriesByParentId(mainCategory));
    dispatch(loadCategories());
  }, []);

  useEffect(() => {
    if (subCategory) {
      dispatch(loadAds('category', subCategory));
    }
  }, [subCategory]);

  const getBreadcrumbItems = () => {
    if (subCategory) {
      if (!categoriesLoadingStatus) {
        const selectedItem = categories?.find((item) => item.id === mainCategory);
        return [
          {
            ...selectedItem,
            path: selectedItem?.id,
          },
        ];
      }
    }
    return [];
  };

  const getCurrentSubcategoryData = () => subcategories?.find((item) => item.id === subCategory);

  return (
    <div className="p-6">
      <div className="px-6 pb-4">
        <Breadcrumb items={getBreadcrumbItems()} />
      </div>
      {!subCategory ? (
        !subcategoriesLoading && subcategories.length ? (
          <SubCategoriesList items={subcategories} columns="5" />
        ) : (
          <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-2">
            <EmptyPage title="There are no subcategories yet" btnTitle="Main page" path="/" />
          </div>
        )
      ) : (
        <>
          <h5 className="mb-4 ml-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {getCurrentSubcategoryData()?.name}
          </h5>{' '}
          <AdsLoader>
            {ads?.length ? (
              <AdsList items={ads} columns="5" />
            ) : (
              <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-2">
                <EmptyPage title="There are no ads in this category" btnTitle="Main page" path="/" />
              </div>
            )}
          </AdsLoader>
        </>
      )}
    </div>
  );
}

export default Catalog;
