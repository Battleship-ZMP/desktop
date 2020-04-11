import firebase from "firebase/app";
import store from "./store/store";
import { createFirestoreInstance } from "redux-firestore";

export const fbConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "coolrecipes-f4e21.firebaseapp.com",
  databaseURL: "https://coolrecipes-f4e21.firebaseio.com",
  projectId: "coolrecipes-f4e21",
  storageBucket: "coolrecipes-f4e21.appspot.com",
  messagingSenderId: "387025921582",
  appId: "1:387025921582:web:bffc515356a4005b79a1bf",
  measurementId: "G-4BK3297DFV",
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
