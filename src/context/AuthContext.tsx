/* eslint-disable*/
import { createContext, useState } from "react";

export interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthInfo: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setAuthInfo: () => { },
});

export const AuthProvider = (props: any) => {
  const [isAuthenticated, setAuthInfo] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthInfo }
    }>
      {props?.children}
    </AuthContext.Provider>
  )
};