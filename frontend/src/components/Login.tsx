/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState, useRef } from "react";
import AuthService from "../services/AuthServices";

const Login = (props) => {
  //   const form = useRef();
  //   const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    //   setMessage("");
    setLoading(true);

    //   form.current.validateAll();

    //   if (checkBtn.current.context._errors.length === 0) {
    AuthService.login({ email, password }).then(
      () => {
        props.history.push("/sauces");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
    //   } else {
    //     setLoading(false);
    //   }
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
          {loading && <i className="fas fa-spinner animate-spin"></i>}
          Log in
        </button>
      </form>
    </>
  );
};

export default Login;
