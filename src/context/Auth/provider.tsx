import { useRouter } from "next/dist/client/router";
import React, { ReactNode, useState } from "react";

import { AuthContext } from "./cotext";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [credentialError, setCredentialError] = useState(false);
  const router = useRouter();

  async function signIn(email: string, password: string): Promise<void> {
    if (email && password) {
      router.push("/dashboard");
    } else {
      setCredentialError(true);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        credentialError,
        setCredentialError,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
