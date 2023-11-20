import { Route, Routes } from 'react-router-dom';
import AppLayout from './AppLayout';
import RequireAuth from './auth/RequireAuth';
import SaucesList from '../views/SaucesList';
import Login from '../views/Login';
import Register from '../views/Register';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          path="/sauces"
          element={
            <RequireAuth>
              <SaucesList />
            </RequireAuth>
          }>
          {/* <Route path={"/:id"} element={<Sauce />} /> */}
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
      </Route>
    </Routes>
  );
}
