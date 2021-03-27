import logo from "./logo.svg";
import { Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import SauceList from "./components/SaucesList";
import Sauce from "./components/Sauce";
import Login from "./components/Login";
import Signup from "./components/Register";
import AuthService from "./services/AuthServices";

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handelLogout = (e) => {
    e.preventDefault();

    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div className="App min-h-screen flex flex-col justify-between items-center relative">
      <nav className="container relative flex items-center justify-center mb-10 lg:mb-20">
        <Link to={currentUser ? "/" : "/login"}>
          <img
            src={logo}
            alt="logo de l'application"
            className="inline my-10"
          ></img>
        </Link>
        {currentUser ? (
          <button
            onClick={handelLogout}
            className="absolute top-5 md:top-10 lg:top-20 right-5 md:right-10 lg:right-20"
          >
            <i className="fas fa-sign-out-alt fa-3x"></i>
          </button>
        ) : (
          <div className="absolute top-5 md:top-10 lg:top-20 right-5 md:right-10 lg:right-20">
            <Link to={"/signup"} className="mr-5">
              Signup
            </Link>
            <Link to={"/login"}>Login</Link>
          </div>
        )}
      </nav>

      {currentUser ? (
        <>
          <div className="container mx-auto">
            <Switch>
              <Route exact path={"/"} component={SauceList} />
              <Route path={"/sauce/:id"} component={Sauce} />
            </Switch>
          </div>
        </>
      ) : (
        <div className="container mx-auto">
          <Switch>
            <Route exact path={"/login"} component={Login} />
            <Route path={"/signup"} component={Signup} />
          </Switch>
        </div>
      )}
      <footer className="bg-gray-900 text-white w-full p-10 flex flex-wrap justify-evenly items-center mt-20">
        <p className="my-1">Copyright 2021</p>
        <a className="underline my-1" href="https://dimitriobin.com">
          dimitriobin.com
        </a>
        <a className="underline my-1" href="mailto:dimitriobin@gmail.com">
          Reach me out here
        </a>
      </footer>
    </div>
  );
}

export default App;
