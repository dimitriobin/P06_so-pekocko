import './App.css';
import AuthProvider from './components/auth/AuthProvider';
import { Router } from './components/Router';
// import Sauce from "./components/Sauce";

function App() {
  return (
    <AuthProvider>
      <div className="App min-h-screen flex flex-col justify-between items-center relative">
        <Router />
      </div>
    </AuthProvider>
  );
}

export default App;
