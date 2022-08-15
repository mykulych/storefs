import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ImageField } from '../../../common';

function AdImagesField({ register, fields, append, remove, getValues, watch }) {
  const uploadedImagesArray = getValues('adImages');
  const watchAdImages = watch('adImages');
  const inputRef = useRef();

  useEffect(() => {}, [watchAdImages]);

  useEffect(() => {
    return () => {
      append({});
    };
  }, []);

  const handleClick = async () => {
    await append({});
    inputRef.current.click();
  };

  return (
    <>
      <h2 className="block mb-1 ml-1 text-xl font-medium text-gray-900 dark:text-gray-300">Photo</h2>

      {fields.length ? (
        <p className="mb-2 ml-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
      ) : null}
      <div className="grid grid-cols-4">
        {fields.map((field, index) => (
          <ImageField
            key={field.id}
            uploadedFile={uploadedImagesArray[index]}
            remove={remove}
            index={index}
            register={register}
            inputRef={inputRef}
            id={`adImages.${index}`}
          />
        ))}
      </div>
      {fields.length < 8 && (
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none
        hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5
        py-2.5 mr-2 mb-2 mt-2 dark:bg-gray-800 dark:text-white dark:border-gray-600
        dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={handleClick}
        >
          Add one more photo
        </button>
      )}
    </>
  );
}

AdImagesField.propTypes = {
  register: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  append: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  watch: PropTypes.func,
};

export default AdImagesField;
