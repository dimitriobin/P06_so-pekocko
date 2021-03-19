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
        <img className="mx-auto my-5" src={logo} alt="logo de l'application"></img>
        <ul>
          <li>
            <Link to={"/sauces"}>All sauces</Link>
          </li>
          <li>
            <Link to={"/sauce/1"}>One sauce</Link>
          </li>
          <li>
            <Link to={"/add"}>Add sauce</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path={['/', '/sauces']} component={SauceList} />
        <Route exact path='/add' component={AddSauce} />
        <Route path='/sauce/:id' component={Sauce} />
      </Switch>
    </div>
  );
}

export default App;
