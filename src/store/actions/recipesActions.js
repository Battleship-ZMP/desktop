import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export const addRecipe = (recipe, photo) => async (dispatch) => {
  const firestore = firebase.firestore();

  firestore
    .collection("recipes")
    .add(recipe)
    .then((recipeRes) => {
      const storageRef = firebase
        .storage()
        .ref(`recipes/${firebase.auth().currentUser.uid}/${photo.name}`);
      const uploadTask = storageRef.put(photo);

      if (photo) {
        uploadTask
          .then(() => {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                photo = downloadURL;
                console.log(downloadURL);
                firestore
                  .collection("recipes")
                  .doc(recipeRes.id)
                  .update({ photo: downloadURL });
              });
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
