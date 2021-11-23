import { createContext, useContext } from "react";

export interface AuthContextProps {
  signIn: (email: string, password: string) => Promise<void>;
  credentialError: boolean;
  setCredentialError: (value: boolean) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};
