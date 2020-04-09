import {
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "./types";
import firebase from "firebase/app";

export const signUp = (credentials) => async (dispatch) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then((res) => {
      console.log(res);
      dispatch({
        type: SIGNUP_SUCCESS,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SIGNUP_ERROR,
      });
    });
};

export const signIn = (credentials) => async (dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then((res) => {
      console.log(res);
      dispatch({
        type: SIGNIN_SUCCESS,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SIGNIN_ERROR,
      });
    });
};
