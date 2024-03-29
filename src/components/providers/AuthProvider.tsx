import { useState, useEffect, createContext } from "react";

import { fbase } from "functions/firebase";

import Loader from "../Loader";

export const AuthContext = createContext({
  currentUser: null,
});

export const AuthProvider = ({ children }: any) => {
  const [currentUserState, setCurrentUserState] = useState<any>(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    fbase.auth().onAuthStateChanged((user: any) => {
      setCurrentUserState(user);
      setBusy(false);
    });
  }, []);

  return (
    <>
      {busy === true ? (
        <Loader />
      ) : (
        <AuthContext.Provider
          value={{
            currentUser: currentUserState,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};
