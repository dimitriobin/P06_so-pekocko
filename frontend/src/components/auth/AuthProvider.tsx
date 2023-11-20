import React, { useState } from 'react';
import { AuthenticatedUser, User } from '../../types/User';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginPayload, RegisterPayload } from '../../types/api/Auth';
import { serverInstance } from '../../http-common';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = localStorage.getItem('user');
  const [currentUser, setCurrentUser] = useState<User | undefined>(
    user ? JSON.parse(user).user : undefined
  );
  const navigate = useNavigate();

  const register = async (payload: RegisterPayload): Promise<User> => {
    const response = await serverInstance.post<User>('auth/register', payload);
    const user = response.data;
    return user;
  };

  const login = async ({ email, password }: LoginPayload): Promise<User> => {
    const { data } = await serverInstance.post<AuthenticatedUser>('auth/login', {
      email,
      password
    });
    const authenticatedUser = data;
    if (authenticatedUser?.token) {
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
    }
    setCurrentUser(authenticatedUser.user);
    return authenticatedUser.user;
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(undefined);
    navigate('/login');
  };

  const value = { currentUser, register, login, handleLogout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
