import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import { FETCHRECIPES_SUCCESS } from "./types";

export const fetchRecipes = (filter, searchString) => async (dispatch) => {
  const firestore = firebase.firestore();
  const recipes = [];

  console.log(searchString);

  firestore
    .collection("recipes")
    .where(filter[0], filter[1], filter[2])
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

  function getDate() {
    var formatter = new Intl.DateTimeFormat("pl");
    const now = new Date();
    var date = formatter.format(now);
    date = date + " " + now.getHours() + ":" + now.getMinutes();
    return date;
  }

  recipe.userID = firebase.auth().currentUser.uid;
  recipe.date = getDate();

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
