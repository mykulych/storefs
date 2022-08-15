import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../../store/auth/auth.actions';
import { TextField } from '../../../common';
import { updateAccount } from '../../../../store/account/account.actions';
import { getAccountData } from '../../../../store/account/account.selectors';

function PersonalData() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const accountData = useSelector(getAccountData());
  const dispatch = useDispatch();

  useEffect(() => {
    setValue('name', accountData?.name);
    setValue('surname', accountData?.surname);
    setValue('email', accountData?.email);
  }, []);

  console.log('accountData: ', accountData);

  const onSubmit = (data) => {
    dispatch(updateAccount({ ...data, id: accountData.id }));
    console.log(data);
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="w-full flex flex-col justify-start px-8 space-y-4">
      <h5 className="mb-2 text-4xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">
        Personal data
      </h5>
      <form className="w-full max-w-3xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="name"
          register={register}
          label="Name"
          options={{
            required: 'Name is required field',
            pattern: {
              value: /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/g,
              message: 'Name entered incorrectly',
            },
          }}
          error={errors.name?.message}
        />
        <TextField
          id="surname"
          register={register}
          label="Surname"
          options={{
            required: 'Surname is required field',
            pattern: {
              value: /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/g,
              message: 'Name entered incorrectly',
            },
          }}
          error={errors.surname?.message}
        />
        <TextField
          id="email"
          register={register}
          label="Email"
          options={{
            required: 'Email is required field',
            pattern: {
              value: /^\S+@\S+\.\S+$/g,
              message: 'Email entered incorrectly',
            },
          }}
          error={errors.email?.message}
        />
        <div className="w-full max-w-md p-5 rounded-lg border border-gray-200 space-y-4 mx-auto flex flex-col justify-center dark:border-gray-800">
          <button
            type="submit"
            className="focus:outline-none text-white text-base bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleLogOut}
            className="text-gray-900 bg-white border border-gray-300
  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium
  rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white
  dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Log out
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalData;
