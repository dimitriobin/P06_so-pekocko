import { Route, Routes } from "react-router-dom";
import "./App.css";
import SaucesList from "./components/SaucesList";
import Login from "./components/Login";
import Register from "./views/Register";
import AppLayout from "./components/AppLayout";
import AuthProvider from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";
// import Sauce from "./components/Sauce";

function App() {
  return (
    <AuthProvider>
      <div className="App min-h-screen flex flex-col justify-between items-center relative">
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              path="/sauces"
              element={
                <RequireAuth>
                  <SaucesList />
                </RequireAuth>
              }
            >
              {/* <Route path={"/:id"} element={<Sauce />} /> */}
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Register />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
