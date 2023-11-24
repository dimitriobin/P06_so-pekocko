import './App.css';
import AuthProvider from './components/auth/AuthProvider';
import Header from './components/Header';
import { Router } from './components/Router';
// import Sauce from "./components/Sauce";

function App() {
  return (
    <AuthProvider>
      <div className="App min-h-screen flex flex-col justify-between items-center relative">
        <Header />

        <main className="flex-grow w-full px-[5vw]">
          <Router />
        </main>

        <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-16">
          <aside>
            <p>
              Want to work with me ?{' '}
              <a href="mailto:dimitriobin@gmail.com" className="link text-md">
                Reach me out
              </a>
            </p>
          </aside>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
