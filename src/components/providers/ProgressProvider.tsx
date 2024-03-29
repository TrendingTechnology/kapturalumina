import { useState, useEffect, useContext, createContext } from "react";

import { fbase, getCurrentUser } from "functions/firebase";
import { Progress } from "models";

import Loader from "../Loader";

import { AuthContext } from "./AuthProvider";

export const UserProgressContext = createContext({
  progress: [] as Progress[],
});

export const UserProgressProvider = ({ children }: any) => {
  const { currentUser } = useContext(AuthContext);
  const [progressState, setProgressState] = useState<Progress[]>([]);
  const [busy, setBusy] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      fbase
        .database()
        .ref("users/" + user.uid + "/progress")
        .on("value", (snapshot: any) => {
          setProgressState([]);
          snapshot.forEach((row: any) => {
            setProgressState((prog) => [...prog, row.val()]);
          });
        });
    } else {
      setProgressState([]);
    }
    setBusy(false);
  }, [currentUser, user]);

  return (
    <>
      {busy ? (
        <Loader />
      ) : (
        <UserProgressContext.Provider
          value={{
            progress: progressState,
          }}
        >
          {children}
        </UserProgressContext.Provider>
      )}
    </>
  );
};
