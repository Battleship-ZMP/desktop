import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { authReducer } from "./authReducer";
import { recipesReducer } from "./recipesReducer";

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  recipes: recipesReducer,
});
