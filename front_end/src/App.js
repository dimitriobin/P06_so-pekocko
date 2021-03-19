import logo from './logo.svg';
import { Switch, Route, Link } from "react-router-dom";
import './App.css';

import SauceList from './components/SaucesList';
import Sauce from './components/Sauce';
import AddSauce from './components/AddSauce';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to={"/sauces"} >  
          <img src={logo} alt="logo de l'application" className="inline my-10"></img>
        </Link>
        <button className="absolute top-5 md:top-10 lg:top-20 right-5 md:right-10 lg:right-20" >
          <i class="fas fa-sign-out-alt fa-3x"></i>
        </button>
      </nav>
      <Switch>
        <Route exact path={['/', '/sauces']} component={SauceList} />
      </Switch>
    </div>
  );
}

export default App;
