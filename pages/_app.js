import App from "next/app";
import firebase, { FirebaseContext } from "../firebase";
/* next config, also using the provider of FireBaseContext the firebase
class methods will be avalaible for all the react components */
const MyApp = (props) => {
  const { Component, pageProps } = props;
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};
export default MyApp;
