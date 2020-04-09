import { SIGNUP_ERROR, SIGNUP_SUCCESS } from "./types";
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
