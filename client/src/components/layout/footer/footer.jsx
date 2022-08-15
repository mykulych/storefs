import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="w-full h-12 border-t-2">
      <div className="container mx-auto flex justify-between items-center h-full">
        <div className="h-full flex items-center">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Store</span>
          </Link>
        </div>
        <div className="h-full flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">some information</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
