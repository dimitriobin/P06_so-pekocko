import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    setLoading(true);

    await auth.login({ email, password });
    navigate(from, { replace: true });
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="flex flex-col content-center justify-center items-center"
      >
        <div className="mb-2">
          <label htmlFor="email" className="font-medium mb-1">
            Email
          </label>
          <input
            type="text"
            className="border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
            name="email"
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
          />
        </div>

        <button className="bg-green-500 hover:bg-green-900 focus:bg-green-900 active:bg-green-900 rounded-full p-3 w-5/12 uppercase font-bold text-white text-xl focus:outline-none transition-all">
          {loading && <i className="fas fa-spinner animate-spin"></i>}
          Log in
        </button>
      </form>
    </>
  );
};

export default Login;
