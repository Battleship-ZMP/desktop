import {
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
  SIGNOUT_ERROR,
  SIGNOUT_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "./types";
import firebase from "firebase/app";

export const signUp = (credentials) => async (dispatch) => {
  const firestore = firebase.firestore();
  firebase
    .auth()
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then((res) => {
      firestore
        .collection("users")
        .doc(res.user.uid)
        .set({ bio: credentials.bio, userName: credentials.userName });

      firebase.updateAuth({ displayName: credentials.userName }, true);

      dispatch({
        type: SIGNUP_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: SIGNUP_ERROR,
        payload: err,
      });
    });
};

export const signIn = (credentials) => async (dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then((res) => {
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      console.log(err);

      let msg = "Coś poszło nie tak!";

      switch (err.code) {
        case "auth/wrong-password":
          msg = "Błędne hasło";
          break;
        case "auth/user-not-found":
          msg = "Nie znaleziono użytkownika";
          break;
        case "auth/too-many-requests":
          msg = "Za dużo nieudanych prób logowania. Spróbuj później";
          break;
        default:
          msg = "coś poszło nie tak!";
      }
      dispatch({
        type: SIGNIN_ERROR,
        payload: msg,
      });
    });
};

export const signOut = () => async (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: SIGNOUT_SUCCESS,
      });
    })
    .catch(() => {
      dispatch({
        type: SIGNOUT_ERROR,
      });
    });
};
