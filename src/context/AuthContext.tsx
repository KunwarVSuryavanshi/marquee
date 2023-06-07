/* eslint-disable*/
import { createContext, useState } from "react";

export interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthInfo: (authInfo: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setAuthInfo: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthInfo] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  )
};