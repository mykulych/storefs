import React from 'react';
import { PostAdForm } from '../../components/ui';
import { useDispatch } from 'react-redux';
import { editAd } from '../../store/ads/ads.actions';
import { customHistory } from '../../utils/helpers';

function EditAd() {
  const dispatch = useDispatch();
  const handleSubmit = (data) => {
    dispatch(editAd(data));
    customHistory.push('/result', { private: true });
  };
  return (
    <div className="container mx-auto mb-10 bg-gray-50 dark:bg-gray-900">
      <h1 className="my-6 text-4xl font-medium dark:text-white">Edit ad</h1>
      <PostAdForm handleOnSubmit={handleSubmit} />
    </div>
  );
}

export default EditAd;
