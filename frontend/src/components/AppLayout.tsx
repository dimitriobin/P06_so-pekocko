import CustomNavLink from "./CustomNavLink";
import logo from "../logo.svg";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AppLayout() {
  const { currentUser, handleLogout } = useContext(AuthContext);
  return (
    <>
      <nav className="container relative flex items-center justify-center mb-10 lg:mb-20">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo de l'application"
            className="inline my-10"
          ></img>
        </Link>
        {currentUser ? (
          <button
            onClick={handleLogout}
            className="absolute top-5 md:top-10 lg:top-20 right-5 md:right-10 lg:right-20"
          >
            <i className="fas fa-sign-out-alt fa-3x"></i>
          </button>
        ) : (
          <div className="absolute top-5 md:top-10 lg:top-20 right-5 md:right-10 lg:right-20">
            <CustomNavLink to={"/signup"}>Signup</CustomNavLink>
            <CustomNavLink to={"/login"}>Login</CustomNavLink>
          </div>
        )}
      </nav>

      <Outlet />

      <footer className="bg-gray-900 text-white w-full p-10 flex flex-wrap justify-evenly items-center mt-20">
        <p className="my-1">Copyright 2021</p>
        <a className="underline my-1" href="https://dimitriobin.com">
          dimitriobin.com
        </a>
        <a className="underline my-1" href="mailto:dimitriobin@gmail.com">
          Reach me out here
        </a>
      </footer>
    </>
  );
}

export default AppLayout;
