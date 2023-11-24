import { Route, Routes } from 'react-router-dom';
import RequireAuth from './auth/RequireAuth';
import SaucesList from '../views/Sauces';
import Login from '../views/Login';
import Register from '../views/Register';
import Sauce from '../views/Sauce';

export function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <SaucesList />
          </RequireAuth>
        }
      />
      <Route
        path={'sauces/:id'}
        element={
          <RequireAuth>
            <Sauce />
          </RequireAuth>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Register />} />
    </Routes>
  );
}
