import app from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    //firebase instance
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
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
