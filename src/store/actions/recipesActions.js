import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import { FETCHRECIPES_SUCCESS } from "./types";

export const fetchOwnedRecipes = () => async (dispatch) => {
  const firestore = firebase.firestore();

  firestore
    .collection("recipes")
    .where("userID", "==", firebase.auth().currentUser.uid)
    .get()
    .then((res) => {
      const recipes = [];

      res.forEach((doc) => {
        const recipe = doc.data();
        recipe.id = doc.id;

        recipes.push(recipe);
      });

      dispatch({
        type: FETCHRECIPES_SUCCESS,
        payload: recipes,
      });
    });
};

export const fetchRecipes = () => async (dispatch) => {
  const firestore = firebase.firestore();
  const recipes = [];

  firestore
    .collection("recipes")
    .get()
    .then(async (recipesQuery) => {
      for (const doc of recipesQuery.docs) {
        const recipe = doc.data();
        recipe.id = doc.id;

        await firestore
          .collection("users")
          .doc(doc.data().userID)
          .get()
          .then((author) => {
            recipe.userName = author.data().userName;
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

  recipe.userID = firebase.auth().currentUser.uid;

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
                console.log(downloadURL);
                firestore.collection("recipes").doc(recipeRes.id).update({
                  photo: photo,
                });
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        firestore.collection("recipes").doc(recipeRes.id).update({
          photo: null,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
