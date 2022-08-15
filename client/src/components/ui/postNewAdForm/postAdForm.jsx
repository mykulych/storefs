import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { Card, TextField, TextAreaField } from '../../common';
import CategoriesDropdown from '../categories/categoriesDropdown';
import { useModal } from '../../../hooks';
import { CategoryField, AdImagesField, PostSubmitBtn, PreviewBtn } from './';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdById } from '../../../store/ads/ads.actions';
import { getCategoriesList } from '../../../store/categories/categories.selectors';
import { getSubcategoriesList } from '../../../store/subcategories/subcategories.selectors';
import { getAds } from '../../../store/ads/ads.selectors';
import { getAccountData } from '../../../store/account/account.selectors';
import { loadCategories } from '../../../store/categories/categories.actions';
import { loadSubcategories } from '../../../store/subcategories/subcategories.actions';
import { customHistory } from '../../../utils/helpers';
import { AdDetailsLayout } from '../';

function PostAdForm({ handleOnSubmit }) {
  const { register, control, handleSubmit, getValues, setValue, watch } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'adImages',
  });
  const [selectedMainCategory, setSelectedMainCategory] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState({});
  const dispatch = useDispatch();
  const categories = useSelector(getCategoriesList());
  const subcategories = useSelector(getSubcategoriesList());
  const ads = useSelector(getAds());
  const ad = ads?.find(() => true);
  const { showModal, hideModal } = useModal();
  const currentUser = useSelector(getAccountData());
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadSubcategories(selectedMainCategory.id));
    if (id) {
      dispatch(loadAdById(id));
    }
  }, []);

  useEffect(() => {
    if (ad && id) {
      if (currentUser.id !== ad.publisher._id && currentUser.role !== 'admin') {
        return customHistory.push(`/${id}`);
      }
      if (subcategories.length && categories.length) {
        const subcategory = subcategories?.find((x) => x.id === ad?.category);
        const category = categories?.find((x) => x.id === subcategory.parent_id);
        setSelectedSubCategory(subcategory);
        setSelectedMainCategory(category);
        setValue('name', ad?.name);
        setValue('adImages', ad?.adImagesUrl);
        setValue('description', ad?.description);
        setValue('price', ad?.price);
      }
    }
  }, [id, ad]);

  const onSubmit = async (data) => {
    if (!Object.keys(selectedSubCategory).length) {
      return toast.error('Choose category');
    } else if (!Object.keys(data.adImages[0]).length) {
      return toast.error('Upload a photo');
    }

    let newData = {
      ...data,
      category: selectedSubCategory.id,
    };
    if (id) {
      newData = {
        ...newData,
        id: ad.id,
      };
    }

    handleOnSubmit(newData);
  };

  const handlePreview = async () => {
    const ad = getValues();
    const adImagesUrl = [];
    let validation = true;
    Object.keys(ad).forEach((item) => {
      if (!ad[item]) {
        validation = false;
      }
    });
    if (!Object.keys(selectedSubCategory).length) {
      return toast.error('Choose category');
    } else if (!Object.keys(ad.adImages[0]).length) {
      return toast.error('Upload a photo');
    } else if (!validation) {
      return toast.error('First, fill all the fields');
    }

    if (typeof ad.adImages[0] === 'string') {
      adDetailsModal({ ...ad, adImagesUrl: ad.adImages, category: selectedSubCategory.id });
    } else {
      ad.adImages.forEach((file, index, array) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file[0]);
        fileReader.onload = () => {
          adImagesUrl.push(fileReader.result);
          if (index === array.length - 1) {
            adDetailsModal({ ...ad, adImagesUrl, category: selectedSubCategory.id });
          }
        };
      });
    }
  };

  const adDetailsModal = (ad) => {
    return showModal({
      title: 'Preview',
      closable: true,
      content: <AdDetailsLayout ad={ad} user={currentUser} />,
      width: '1300px',
    });
  };

  const handleMainCategory = (mainCategory) => {
    setSelectedMainCategory(mainCategory);
  };

  const handleSubCategory = (subCategory) => {
    hideModal();
    setSelectedSubCategory(subCategory);
  };

  const categoriesModal = () =>
    showModal({
      title: 'Choose category',
      closable: true,
      content: (
        <CategoriesDropdown
          mainCategories={categories}
          subCategories={subcategories}
          onMainCategory={handleMainCategory}
          onSubCategory={handleSubCategory}
        />
      ),
      width: '700px',
    });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <TextField id="name" register={register} label="Name" placeholder="Ad name..." options={{ required: true }} />
          <CategoryField
            selectedSubCategory={selectedSubCategory}
            selectedMainCategory={selectedMainCategory}
            categoriesModal={categoriesModal}
            label="Category"
          />
        </Card>
        <Card>
          <AdImagesField
            register={register}
            fields={fields}
            append={append}
            remove={remove}
            getValues={getValues}
            watch={watch}
          />
        </Card>
        <Card>
          <TextAreaField
            register={register}
            id="description"
            placeholder="Leave a description..."
            options={{ required: true }}
            label="Description"
          />
        </Card>
        <Card>
          <div className="w-1/3">
            <TextField
              id="price"
              register={register}
              placeholder="Price..."
              label="Price"
              options={{
                required: true,
                pattern: {
                  value: /^(\d){1,13}$/g,
                  message: 'The price is entered incorrectly',
                },
              }}
            />
          </div>
        </Card>
        <div className="w-full flex justify-end px-4">
          <PreviewBtn handleClick={handlePreview} />
          <PostSubmitBtn />
        </div>
      </form>
    </>
  );
}

PostAdForm.propTypes = {
  handleOnSubmit: PropTypes.func,
};

export default PostAdForm;
