import React from 'react';
import PropTypes from 'prop-types';

function Card({ children, className: classes }) {
  return (
    <div className="p-6 mb-6 bg-gray-100 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className={classes || 'w-full max-w-2xl'}>{children}</div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  className: PropTypes.string,
};

export default Card;
