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
  //TODO profile setup to separate action
  //TODO add profile download on signIn
  const firestore = firebase.firestore();
  firebase
    .auth()
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then((res) => {
      firestore
        .collection("users")
        .doc(res.user.uid)
        .set({ bio: credentials.bio });

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
      dispatch({
        type: SIGNIN_ERROR,
        payload: err,
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
