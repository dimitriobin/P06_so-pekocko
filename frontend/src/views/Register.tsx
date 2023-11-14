import React, { useState } from 'react';

import AuthService from '../services/AuthServices';
import { AxiosError } from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.currentTarget.value;
    setEmail(email);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.currentTarget.value;
    setPassword(password);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage('');
    setSuccessful(false);

    try {
      const response = await AuthService.register({ email, password });
      const user = await response.data;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   @ts-ignore
      setMessage(user.message);
      setSuccessful(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        const resMessage = error?.response?.data.message || error.message || error.toString();

        setMessage(resMessage);
      }
      setSuccessful(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleRegister}
        className="flex flex-col content-center justify-center items-center">
        {!successful && (
          <>
            <div className="mb-2">
              <label htmlFor="email" className="font-medium mb-1">
                Email
              </label>
              <input
                type="text"
                className="border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
                name="email"
                value={email}
                onChange={onChangeEmail}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
                name="password"
                value={password}
                onChange={onChangePassword}
              />
            </div>

            <button className="bg-green-500 hover:bg-green-900 focus:bg-green-900 active:bg-green-900 rounded-full p-3 w-5/12 uppercase font-bold text-white text-xl focus:outline-none transition-all">
              Sign Up
            </button>
          </>
        )}

        {message && (
          <div className="">
            <p className={successful ? 'text-green-500' : 'text-red-500'} role="alert">
              {message}
            </p>
          </div>
        )}
      </form>
    </>
  );
}

export default Register;
