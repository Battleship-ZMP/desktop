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
    console.log("asdfsafdsadff");

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

export const changePassword = (data) => async (dispatch) => {
  const currentUser = firebase.auth().currentUser;

    console.log("adsfadsf");
  const credential = firebase.auth.EmailAuthProvider.credential(
    currentUser.email,
    data.currentPassword
  );

  currentUser
    .reauthenticateWithCredential(credential)
    .then((userCredential) => {
      console.log("reauthenticated");

      currentUser
        .updatePassword(data.newPassword)
        .then(() => {
          console.log("password changed!");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
