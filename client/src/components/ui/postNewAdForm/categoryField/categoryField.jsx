import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

function CategoryField({ selectedSubCategory, selectedMainCategory, categoriesModal, label }) {
  return (
    <div className="mb-6">
      <p className="block mb-2 ml-1 text-xl font-medium text-gray-900 dark:text-gray-300">{label}</p>
      <div
        className="cursor-pointer  bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg
focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-2.5 ml-0.3 dark:bg-gray-700 dark:border-gray-600
dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onClick={categoriesModal}
      >
        <div className="flex justify-between">
          {Object.keys(selectedSubCategory).length ? (
            <div className="flex">
              <img width={70} src={selectedSubCategory.image} alt="" />
              <div className="flex justify-center flex-col ml-2">
                <h3>{selectedSubCategory.name}</h3>
                <p className="font-normal text-gray-700 dark:text-gray-400">{selectedMainCategory.name}</p>
              </div>
            </div>
          ) : (
            <p className="font-normal text-gray-700 dark:text-gray-400">Choose category...</p>
          )}
          <div className="flex items-center justify-center px-4">
            <FontAwesomeIcon
              className="h-5 text-gray-700 dark:text-gray-400"
              icon={Object.keys(selectedSubCategory).length ? faAngleRight : faAngleDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

CategoryField.propTypes = {
  selectedSubCategory: PropTypes.object.isRequired,
  selectedMainCategory: PropTypes.object.isRequired,
  imageUrl: PropTypes.string,
  categoriesModal: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default CategoryField;
