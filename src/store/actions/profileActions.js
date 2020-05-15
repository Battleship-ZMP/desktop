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

export const updateProfile = (profile) => async (dispatch) => {
  const firestore = firebase.firestore();
  const currentUserUid = firebase.auth().currentUser.uid;

  profile.avatar = profile.avatar ? profile.avatar : "";

  firestore
    .collection("users")
    .doc(currentUserUid)
    .update({
      bio: profile.bio,
      userName: profile.userName,
      avatar: profile.avatar,
    })
    .then(() => {
      dispatch(fetchProfile(currentUserUid));
    });
};
