import { Outlet } from 'react-router-dom';
import Header from './Header';

function AppLayout() {
  return (
    <>
      <Header />

      <Outlet />

      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>
            Want to work with me ?{' '}
            <a href="mailto:dimitriobin@gmail.com" className="link text-md">
              Reach me out
            </a>
          </p>
        </aside>
      </footer>
    </>
  );
}

export default AppLayout;
