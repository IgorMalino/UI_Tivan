import Firebase from "firebase/compat";

export const config = {
  apiKey: "AIzaSyB1VabokfUZdgssXYgjF66vkA48gEHQ-0U",
  authDomain: "tivan-test.firebaseapp.com",
  databaseURL: "https://tivan-test/firebaseio.com",
  projectId: "tivan-test",
  storageBucket: "tivan-test.appspot.com",
  messagingSenderId: "245157118703",
};

Firebase.initializeApp(config);
export const db = Firebase.firestore();
