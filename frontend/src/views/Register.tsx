import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const schema = z
  .object({
    email: z.string().email(),
    name: z.string().min(5).max(15),
    password: z.string().min(5).max(15),
    passwordConfirm: z.string().min(5).max(15)
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm']
  });

type Schema = z.infer<typeof schema>;

function Register() {
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
  const auth = useAuth();

  const handleRegister = async ({ email, name, password }: Schema) => {
    try {
      setLoading(true);
      const user = await auth.register({ email, name, password });
      if (user) {
        navigate('/login');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const resMessage = error?.response?.data.message || error.message || error.toString();
        console.error(resMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => reset(), [isSubmitSuccessful, reset]);

  return (
    <>
      <div className="min-w-full min-h-screen bg-base-200 flex items-center justify-center flex-col">
        <h1 className="text-5xl font-bold mb-6 text-center">Sign up</h1>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mr-5">
          <form onSubmit={handleSubmit(handleRegister)} className="card-body">
            <div className="form-control w-full max-w-xs">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="text"
                {...register('email')}
                className={`input input-bordered w-full max-w-xs ${errors.email && 'input-error'}`}
              />
              {errors.email && (
                <span className="label-text-alt text-error ml-4 mt-1">{errors.email.message}</span>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label htmlFor="name" className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={`input input-bordered w-full max-w-xs ${errors.name && 'input-error'}`}
              />
              {errors.name && (
                <span className="label-text-alt text-error ml-4 mt-1">{errors.name.message}</span>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className={`input input-bordered w-full max-w-xs ${
                  errors.password && 'input-error'
                }`}
              />
              {errors.password && (
                <span className="label-text-alt text-error ml-4 mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label htmlFor="passwordConfirm" className="label">
                <span className="label-text">Confirm password</span>
              </label>
              <input
                id="passwordConfirm"
                type="password"
                {...register('passwordConfirm')}
                className={`input input-bordered w-full max-w-xs ${
                  errors.passwordConfirm && 'input-error'
                }`}
              />
              {errors.passwordConfirm && (
                <span className="label-text-alt text-error ml-4 mt-1">
                  {errors.passwordConfirm.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn btn-full btn-success text-white mt-6">
              {loading && <span className="loading loading-spinner"></span>}
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
