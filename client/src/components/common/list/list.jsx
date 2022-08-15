import React from 'react';
import PropTypes from 'prop-types';

const List = (Component) => {
  const wrapper = ({ items, columns }) => {
    return (
      <div
        className="w-full h-full grid px-6"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {items?.map((item) => {
          return <Component key={item.id} item={item} />;
        })}
      </div>
    );
  };
  wrapper.propTypes = {
    items: PropTypes.array,
    columns: PropTypes.string,
  };
  return wrapper;
};

List.propTypes = {
  Component: PropTypes.element,
};

export default List;
