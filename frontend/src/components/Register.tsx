import { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/AuthServices";

const required = (value) => {
  if (!value) {
    return (
      <div className="" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

function Register() {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register({ email, password })
        .then((response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.Data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        });
    }
  };

  return (
    <>
      <Form
        onSubmit={handleRegister}
        ref={form}
        className="flex flex-col content-center justify-center items-center"
      >
        {!successful && (
          <>
            <div className="mb-2">
              <label htmlFor="email" className="font-medium mb-1">
                Email
              </label>
              <Input
                type="text"
                className="border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="font-medium mb-1">
                Password
              </label>
              <Input
                type="password"
                className="border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />
            </div>

            <button className="bg-green-500 hover:bg-green-900 focus:bg-green-900 active:bg-green-900 rounded-full p-3 w-5/12 uppercase font-bold text-white text-xl focus:outline-none transition-all">
              Sign Up
            </button>
          </>
        )}

        {message && (
          <div className="">
            <p
              className={successful ? "text-green-500" : "text-red-500"}
              role="alert"
            >
              {message}
            </p>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </>
  );
}

export default Register;
