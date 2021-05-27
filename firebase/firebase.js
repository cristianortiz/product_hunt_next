import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    //firebase instance
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    //firebase authentication
    this.auth = app.auth();
    //firestore DB in firebase
    this.db = app.firestore();
    //firestore DB in firebase
    this.storage = app.storage();
  }

  async registerNewUser(user_name, email, password) {
    //creates a new user whit email and password
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    //update user_name prop to display when user log in
    return await newUser.user.updateProfile({
      displayName: user_name,
    });
  }

  async loginUser(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  //close user session
  async sessionClose() {
    await this.auth.signOut();
  }
}
const firebase = new Firebase();
export default firebase;
