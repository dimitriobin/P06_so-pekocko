import { IoMdLogOut } from 'react-icons/io';

import { useAuth } from '../hooks/useAuth';
import CustomNavLink from './CustomNavLink';
import SwitchThemeController from './SwitchThemeController';

function Header() {
  const { currentUser, handleLogout } = useAuth();

  return (
    <header className="w-full">
      <div className="container mx-auto navbar h-28">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <CustomNavLink to={'/'} className="btn btn-ghost text-xl normal-case">
            <span className="text-black">Hot Rank</span>
          </CustomNavLink>
        </div>
        <nav className="navbar-end">
          <SwitchThemeController className="mr-4" />
          {currentUser ? (
            <button onClick={handleLogout}>
              <IoMdLogOut className="w-6 h-6" />
            </button>
          ) : (
            <>
              <CustomNavLink to={'/signup'} className="btn btn-ghost">
                Signup
              </CustomNavLink>
              <CustomNavLink to={'/login'} className="btn btn-ghost">
                Login
              </CustomNavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
