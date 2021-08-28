import { useState, useEffect, useContext, createContext } from "react";

import { fbase, getCurrentUser } from "functions/firebase";
import { UserData } from "models";

import Loader from "../Loader";

import { AuthContext } from ".";

const initialUser: UserData = {
  id: "abcde",
  name: "hari yang baik",
  email: "abcd@efgh.com",
  public_id: "public_id",
};

export const UserProfileContext = createContext({
  user: initialUser,
});

export const UserProfileProvider = ({ children }: any) => {
  const [userProfile, setUserProfile] = useState<UserData>(initialUser);
  const [busy, setBusy] = useState<boolean>(true);

  const { currentUser } = useContext(AuthContext);

  const user = getCurrentUser();

  useEffect(() => {
    // setBusy(true);
    if (user) {
      fbase
        .database()
        .ref(`users/${user.uid}`)
        .on("value", (snap: any) => {
          setUserProfile(initialUser);
          setUserProfile(snap.val());
        });
    } else {
      setUserProfile(initialUser);
    }
    setBusy(false);
  }, [user, currentUser]);

  return (
    <>
      {busy ? (
        <Loader />
      ) : (
        <UserProfileContext.Provider
          value={{
            user: userProfile,
          }}
        >
          {children}
        </UserProfileContext.Provider>
      )}
    </>
  );
};
