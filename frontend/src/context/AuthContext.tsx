import React from "react";
import { User } from "../types/User";

interface AuthContextType {
  currentUser: User | undefined;
  handleLogout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);
