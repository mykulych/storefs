import React from 'react';
import { PostAdForm } from '../../components/ui';
import { customHistory } from '../../utils/helpers';
import { useDispatch } from 'react-redux';
import { createAd } from '../../store/ads/ads.actions';

function PostAd() {
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    customHistory.push('/result', { private: true });
    dispatch(createAd(data));
  };

  return (
    <div className="container mx-auto mb-10 bg-gray-50 dark:bg-gray-900">
      <h1 className="my-6 text-4xl font-medium dark:text-white">Post new ad</h1>
      <PostAdForm handleOnSubmit={handleSubmit} />
    </div>
  );
}

export default PostAd;
