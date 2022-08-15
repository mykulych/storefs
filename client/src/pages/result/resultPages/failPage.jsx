import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from '../../../components/common';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

function FailPage() {
  const location = useLocation();

  return (
    <div className="container mx-auto max-w-4xl mt-6">
      <Card className="flex flex-col items-center space-y-6 p-12">
        <ExclamationCircleIcon className="w-40 h-40 dark:text-white" />
        <h1 className="text-3xl dark:text-white">{location.state?.message}</h1>

        <Link to="/">
          <span
            className="block py-2 pr-4 pl-3 text-xl text-gray-700 border-b border-gray-100 hover:bg-gray-50
          md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400
          md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Main page
          </span>
        </Link>
      </Card>
    </div>
  );
}
export default FailPage;
