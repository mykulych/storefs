import React from 'react';
import { Login } from '../index';
import { RegistrationForm } from '../../ui';
import { useModal } from '../../../hooks';

function Registration({ ...rest }) {
  const { setModalContent } = useModal();

  return (
    <>
      <RegistrationForm {...rest} />
      <div className="flex items-center">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-300">Already registered? </p>
        <button
          type="button"
          className="text-blue-600 font-medium px-1 hover:underline dark:text-blue-500"
          onClick={() => setModalContent({ title: 'Sing in', closable: true, content: <Login {...rest} /> })}
        >
          Sing in
        </button>
      </div>
    </>
  );
}

export default Registration;
