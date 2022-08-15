import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Spinner } from '../../components/layout';
import { customHistory } from '../../utils/helpers';
import { Card } from '../../components/common';
import { BadgeCheckIcon, ExclamationCircleIcon } from '@heroicons/react/outline';

function ResultPage() {
  const { status } = useParams();
  const location = useLocation();
  const isSuccess = status === 'success';

  useEffect(() => {
    if (!location.state?.private) {
      if (!location.state?.message) {
        customHistory.push('/');
      }
    }
    location.state.message = null;
  }, []);

  if (!status) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Spinner />
        <p className="dark:text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl mt-6">
      <Card className="flex flex-col items-center space-y-6 p-12">
        {isSuccess ? (
          <BadgeCheckIcon className="w-40 h-40 dark:text-white" />
        ) : (
          <ExclamationCircleIcon className="w-40 h-40 dark:text-white" />
        )}
        <div className="flex flex-col items-center space-y-1">
          <h1 className="text-3xl dark:text-white">{location.state?.message}</h1>
          {!isSuccess && <p className="font-normal text-gray-700 dark:text-gray-400">Try again later</p>}
        </div>
        {isSuccess && (
          <Link to={location.state?.path}>
            <button
              type="button"
              className="text-gray-900 text-lg bg-white border border-gray-300 focus:outline-none hover:bg-gray-100
            focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800
            dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              {location.state?.btnTitle}
            </button>
          </Link>
        )}
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

export default ResultPage;
