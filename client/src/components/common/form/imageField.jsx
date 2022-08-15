import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CameraIcon, TrashIcon } from '@heroicons/react/outline';

function ImageField({ register, id, index, remove, uploadedFile, inputRef, description }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [removeVisible, setRemoveVisible] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (typeof uploadedFile === 'string') {
      setImageUrl(uploadedFile);
    } else if ((typeof uploadedFile === 'object' && uploadedFile?.name) || uploadedFile?.image) {
      setImageUrl(uploadedFile.image);
      setData(uploadedFile.name);
    }
  }, []);

  useEffect(() => {
    if (isFileList(uploadedFile)) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedFile[0]);
      fileReader.onload = () => setImageUrl(() => fileReader.result);
    }
  }, [uploadedFile]);

  function isFileList(fileList) {
    return fileList && typeof fileList === 'object' && fileList[0]?.type && Object.keys(fileList).length;
  }

  return (
    <div className="flex flex-col justify-center">
      {data && <p className="dark:text-white">{data}</p>}
      <div className="flex justify-center items-center w-full max-w-[200px]">
        <label htmlFor={id} className="w-full mr-2 mb-2" ref={inputRef}>
          {!imageUrl ? (
            <div
              className="flex flex-col justify-center items-center w-full h-32
          bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed
          cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100
          dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <CameraIcon className="w-10 h-10 text-gray-400" />
              {description && <p className="dark:text-white">{description}</p>}
            </div>
          ) : (
            <div className="relative w-full h-32 cursor-pointer">
              {removeVisible && (
                <div className="absolute w-full h-32  flex items-center justify-center">
                  <TrashIcon className="w-10 h-10 text-gray-600 dark:text-gray-400" />
                </div>
              )}
              <img
                onMouseOver={() => setRemoveVisible(true)}
                onMouseOut={() => setRemoveVisible(false)}
                onClick={() => remove(index)}
                className="w-full h-full rounded-sm hover:opacity-20"
                src={imageUrl}
              />
            </div>
          )}
          {!imageUrl && <input {...register(id)} id={id} type="file" className="hidden" />}
        </label>
      </div>
    </div>
  );
}

ImageField.propTypes = {
  register: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  uploadedFile: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  remove: PropTypes.func,
  inputRef: PropTypes.object,
  description: PropTypes.string,
};

export default ImageField;
