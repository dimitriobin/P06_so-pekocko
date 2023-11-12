import React, { useEffect, useState } from "react";
import authService from "../../services/AuthServices";
import { User } from "../../types/User";
import { AuthContext } from "../../context/AuthContext";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(undefined);
  };

  const value = { currentUser, handleLogout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
