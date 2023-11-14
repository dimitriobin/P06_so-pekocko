import React from 'react';
import { User } from '../types/User';

interface AuthContextType {
  currentUser: User | undefined;
  login: ({ email, password }: { email: string; password: string }) => Promise<void>;
  handleLogout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);
