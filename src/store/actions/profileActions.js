import firebase from "firebase/app";
import { FETCHPROFILE_SUCCESS } from "./types";

export const fetchProfile = (userID) => async (dispatch) => {
  const firestore = firebase.firestore();

  firestore
    .collection("users")
    .doc(userID)
    .get()
    .then((res) => {
      dispatch({
        type: FETCHPROFILE_SUCCESS,
        payload: res.data(),
      });
    });
};
