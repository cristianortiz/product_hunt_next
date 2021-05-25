import App from "next/app";
import firebase, { FirebaseContext } from "../firebase";
import useAuthentication from "./hooks/useAuthentication";
/* next config, also using the provider of FireBaseContext the firebase
class methods will be avalaible for all the react components */
const MyApp = (props) => {
  const user = useAuthentication();
  //console.log(user);
  const { Component, pageProps } = props;
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        user,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};
export default MyApp;
