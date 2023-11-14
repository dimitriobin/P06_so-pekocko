import React, { useEffect, useState } from 'react';
import authService from '../../services/AuthServices';
import { User } from '../../types/User';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const login = async ({ email, password }: Record<string, string>): Promise<void> => {
    try {
      const user = await authService.login({
        email,
        password
      });

      if (user) {
        setCurrentUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(undefined);
    navigate('/login');
  };

  const value = { currentUser, login, handleLogout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
