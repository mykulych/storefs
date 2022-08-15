import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxField, TextField } from '../../common';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useModal } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { singIn } from '../../../store/auth/auth.actions';
import { customHistory } from '../../../utils/helpers';

function LoginForm({ from }) {
  const dispatch = useDispatch();
  const { hideModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleHideModal = () => {
    hideModal();
    if (from?.pathname) {
      customHistory.push(from.pathname);
    }
  };

  const onSubmit = async (data) => {
    dispatch(singIn({ ...data, handleHideModal }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        register={register}
        type="text"
        id="email"
        label="Email"
        options={{
          required: 'Email is required field',
        }}
        error={errors.email?.message}
      />
      <TextField
        register={register}
        type="password"
        id="password"
        label="Password"
        options={{
          required: 'Password is required',
        }}
        error={errors.password?.message}
      />
      <div className="flex justify-between items-center mb-6">
        <CheckboxField register={register} id="remember" label="Remember me" />
        <div>
          <button
            type="button"
            className="text-blue-600 text-sm hover:underline dark:text-blue-500"
            onClick={() => toast.info('forgot password!')}
          >
            Forgot password
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
         font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login to your account
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  from: PropTypes.object,
};

export default LoginForm;
