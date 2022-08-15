import React from 'react';
import PropTypes from 'prop-types';

function SliderIndicators({ items, selected, handleIndicators }) {
  return (
    <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
      {items?.map((_, index) => (
        <button
          key={index}
          type="button"
          className={
            'w-3 h-3 rounded-full bg-white' +
            (selected === index ? ' bg-gray-200 dark:bg-gray-800' : ' bg-gray-600 dark:bg-gray-600')
          }
          aria-current="false"
          aria-label="Slide 1"
          data-carousel-slide-to="0"
          onClick={() => handleIndicators(index)}
        ></button>
      ))}
    </div>
  );
}

SliderIndicators.propTypes = {
  items: PropTypes.array,
  selected: PropTypes.number,
  handleIndicators: PropTypes.func,
};

export default SliderIndicators;
