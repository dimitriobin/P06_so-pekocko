import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    setLoading(true);

    await auth.login({ email, password });
    navigate(from, { replace: true });
  };

  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-col justify-center items-center">
        <div className="form-control w-full max-w-xs mb-2">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            type="text"
            name="email"
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs mb-8">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <button type="submit" className="btn btn-wide btn-success text-white">
          {loading && <span className="loading loading-spinner"></span>}
          Log In
        </button>
      </form>
    </>
  );
};

export default Login;
