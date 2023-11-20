import React from 'react';
import { User } from '../types/User';
import { LoginPayload, RegisterPayload } from '../types/api/Auth';

interface AuthContextType {
  currentUser: User | undefined;
  register: (payload: RegisterPayload) => Promise<User>;
  login: ({ email, password }: LoginPayload) => Promise<User>;
  handleLogout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);
