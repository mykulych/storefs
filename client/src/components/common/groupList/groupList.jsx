import React from 'react';
import PropTypes from 'prop-types';
import GroupItem from './groupItem/groupItem';

function GroupList({ items, ...rest }) {
  return (
    <ul className="w-full pr-2 text-gray-900 dark:text-white">
      {items.map((item) => (
        <GroupItem key={item.id} item={item} {...rest} />
      ))}
    </ul>
  );
}

GroupList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default GroupList;
