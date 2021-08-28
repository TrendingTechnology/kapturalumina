import { useState, useEffect, createContext } from "react";

import { fbase } from "functions/firebase";
import { Chapter } from "models";

import Loader from "../Loader";

export const LearnContext = createContext({
  chapters: [] as Chapter[],
});

export const LearnProvider = ({ children }: any) => {
  const [chaptersState, setChaptersState] = useState<Chapter[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    fbase.auth().onAuthStateChanged(() => {
      const rootRef = fbase.database().ref();
      const chaptersRef = rootRef.child("chapters");
      setChaptersState([]);

      chaptersRef.on("value", (snap: any) => {
        setChaptersState(snap.val());
      });

      setBusy(false);
    });
  }, []);

  return (
    <>
      {busy ? (
        <Loader />
      ) : (
        <LearnContext.Provider
          value={{
            chapters: chaptersState,
          }}
        >
          {children}
        </LearnContext.Provider>
      )}
    </>
  );
};
