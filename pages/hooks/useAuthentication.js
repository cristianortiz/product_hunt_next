import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

//custom hook to keep and check the user authenticated through app pages
function useAuthentication() {
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    //firebase method to keep logged user data  session
    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setUserAuth(user);
      } else {
        setUserAuth(null);
      }
    });
    return () => unsuscribe();
  }, []);
  return userAuth;
}

export default useAuthentication;
