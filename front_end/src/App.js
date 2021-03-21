import logo from "./logo.svg";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import SauceList from "./components/SaucesList";
import Sauce from "./components/Sauce";

function App() {
  return (
    <div className="App">
      <nav className="w-full flex items-center justify-center mb-20">
        <Link to={"/sauces"}>
          <img
            src={logo}
            alt="logo de l'application"
            className="inline my-10"
          ></img>
        </Link>
        <button className="absolute top-5 md:top-10 lg:top-20 right-5 md:right-10 lg:right-20">
          <i className="fas fa-sign-out-alt fa-3x"></i>
        </button>
      </nav>
      <Switch>
        <div className="container mx-auto">
          <Route exact path={["/", "/sauces"]} component={SauceList} />
          <Route path={"/sauce/:id"} component={Sauce} />
        </div>
      </Switch>
      <footer className="bg-gray-900 text-white w-full p-10 flex flex-wrap justify-evenly items-center mt-20">
        <p className="my-1">Copyright 2021</p>
        <a className="underline my-1" href="dimitriobin.com">
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
