import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GroupList } from '../../common';

function CategoriesDropdown({ mainCategories, subCategories, onMainCategory, onSubCategory }) {
  const [selected, setSelected] = useState({});
  const selectedSubCategories = subCategories.filter((x) => x.parent_id === selected.id);

  useEffect(() => {
    onMainCategory(selected);
  }, [selected]);

  const handleMouseOver = (category) => {
    setSelected(category);
  };

  const handleSubCategory = (subCategory) => {
    onSubCategory(subCategory);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-h-[430px] overflow-y-auto">
        <GroupList items={mainCategories} onMouseOver={handleMouseOver} />
      </div>
      <div className="w-full max-h-[430px] overflow-y-auto">
        <GroupList items={selectedSubCategories} onClick={handleSubCategory} />
      </div>
    </div>
  );
}

CategoriesDropdown.propTypes = {
  mainCategories: PropTypes.array.isRequired,
  subCategories: PropTypes.array.isRequired,
  onMainCategory: PropTypes.func.isRequired,
  onSubCategory: PropTypes.func.isRequired,
};

export default CategoriesDropdown;
