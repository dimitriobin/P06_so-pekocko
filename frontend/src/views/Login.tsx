import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(15)
});

type Schema = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async ({ email, password }: Schema) => {
    try {
      setLoading(true);
      const authUser = await login({ email, password });

      if (authUser) navigate(from, { replace: true });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => reset(), [isSubmitSuccessful, reset]);

  return (
    <>
      <div className="min-w-full min-h-screen bg-base-200 flex items-center justify-center flex-col">
        <h1 className="text-5xl font-bold mb-6 text-center">Log in!</h1>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mr-5">
          <form onSubmit={handleSubmit(handleLogin)} className="card-body">
            <div className="form-control w-full max-w-xs mb-2">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="text"
                {...register('email')}
                className={`input input-bordered w-full max-w-xs  ${errors.email && 'input-error'}`}
              />
              {errors.email && (
                <span className="label-text-alt text-error ml-4 mt-1">{errors.email.message}</span>
              )}
            </div>

            <div className="form-control w-full max-w-xs mb-8">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className={`input input-bordered w-full max-w-xs  ${
                  errors.password && 'input-error'
                }`}
              />
              {errors.password && (
                <span className="label-text-alt text-error ml-4 mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn btn-full btn-success text-white">
              {loading && <span className="loading loading-spinner"></span>}
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
