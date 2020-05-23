import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import { FETCHRECIPES_SUCCESS } from "./types";
import { onLog } from "firebase";

export const unSaveRecipe = (recipeID) => async (dispatch) => {
  const firestore = firebase.firestore();

  firestore
    .collection("recipes")
    .doc(recipeID)
    .update({
      savedByUsers: firebase.firestore.FieldValue.arrayRemove(
        firebase.auth().currentUser.uid
      ),
    })
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const saveRecipe = (recipeID) => async (dispatch) => {
  const firestore = firebase.firestore();

  firestore
    .collection("recipes")
    .doc(recipeID)
    .update({
      savedByUsers: firebase.firestore.FieldValue.arrayUnion(
        firebase.auth().currentUser.uid
      ),
    })
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const deleteRecipe = (recipeID) => async (dispatch) => {
  const firestore = firebase.firestore();

  firestore
    .collection("recipes")
    .doc(recipeID)
    .delete()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchAllRecipes = (order) => async (dispatch) => {
  const firestore = firebase.firestore();
  const recipes = [];

  firestore
    .collection("recipes")
    .orderBy(order[0], order[1])
    .limit(6)
    .get()
    .then(async (recipesQuery) => {
      for (const doc of recipesQuery.docs) {
        const recipe = doc.data();
        recipe.date = recipe.date.toDate().toLocaleString();
        recipe.id = doc.id;

        await firestore
          .collection("users")
          .doc(doc.data().userID)
          .get()
          .then((author) => {
            if (author.data() === undefined) {
              recipe.userName = null;
            } else {
              recipe.userName = author.data().userName;
            }
          })
          .catch((err) => {
            console.log(err);
          });

        recipes.push(recipe);
      }
      dispatch({
        type: FETCHRECIPES_SUCCESS,
        payload: recipes,
      });
    });
};

export const fetchFilteredRecipes = (filter, order) => async (dispatch) => {
  const firestore = firebase.firestore();
  const recipes = [];

  firestore
    .collection("recipes")
    .where(filter[0], filter[1], filter[2])
    .orderBy(order[0], order[1])
    .limit(6)
    .get()
    .then(async (recipesQuery) => {
      for (const doc of recipesQuery.docs) {
        const recipe = doc.data();
        recipe.date = recipe.date.toDate().toLocaleString();
        recipe.id = doc.id;

        await firestore
          .collection("users")
          .doc(doc.data().userID)
          .get()
          .then((author) => {
            if (author.data() === undefined) {
              recipe.userName = null;
            } else {
              recipe.userName = author.data().userName;
            }
          })
          .catch((err) => {
            console.log(err);
          });

        recipes.push(recipe);
      }
      dispatch({
        type: FETCHRECIPES_SUCCESS,
        payload: recipes,
      });
    });
};

export const addRecipe = (recipe, photo) => async (dispatch) => {
  const firestore = firebase.firestore();
  const placeholder =
    "https://firebasestorage.googleapis.com/v0/b/coolrecipes-f4e21.appspot.com/o/placeholders%2Frecipe_placeholder.png?alt=media&token=a23e9154-81c1-4d70-83a1-af110b2649c9";

  recipe.averageRating = 0;
  recipe.rating = [];
  recipe.savedByUsers = [];
  recipe.userID = firebase.auth().currentUser.uid;
  recipe.date = null;

  console.log(recipe);

  firestore
    .collection("recipes")
    .add(recipe)
    .then((recipeRes) => {
      if (photo) {
        const storageRef = firebase
          .storage()
          .ref(`recipes/${recipeRes.id}/${photo.name}`);

        const uploadTask = storageRef.put(photo);

        uploadTask
          .then(() => {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                photo = downloadURL;
                firestore.collection("recipes").doc(recipeRes.id).update({
                  photo: photo,
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                });
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        firestore.collection("recipes").doc(recipeRes.id).update({
          photo: placeholder,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

function avgRating(arr) {
  let avg = 0;

  arr.forEach((rating) => {
    avg += rating.value;
  });

  return avg;
}

export const rateRecipe = (recipeID, value) => async (dispatch) => {
  const firestore = firebase.firestore();

  const currentUserID = firebase.auth().currentUser.uid;
  const recipeRef = firestore.collection("recipes").doc(recipeID);
  const newRating = { userID: currentUserID, value: value };

  //get rating
  firestore
    .collection("recipes")
    .doc(recipeID)
    .get()
    .then((recipe) => {
      const rating = recipe.data().rating;

      if (rating.find((object) => object.userID === currentUserID)) {
        recipeRef
          .update({
            rating: firebase.firestore.FieldValue.arrayRemove(
              rating.find((object) => object.userID === currentUserID)
            ),
          })
          .then(() => {
            recipeRef.update({
              rating: firebase.firestore.FieldValue.arrayUnion(newRating),
            });
          })
          .then(() => {
            console.log("Rating saved");
          });
      } else {
        recipeRef
          .update({
            rating: firebase.firestore.FieldValue.arrayUnion(newRating),
          })
          .then(() => {
            console.log("Rating saved");
          });
      }
    });
};
