import React, { Component } from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Catalog from "../components/Catalog/Catalog";
import Recipe from "../components/Recipe/Recipe";
import Editor from "../components/Recipe/Editor";
import PrivateRoute from "./PrivateRoute";
import firebase from "firebase/app";
import store from "../store/store";
import Profile from "../components/Profile/Profile";

class Routes extends Component {
  constructor() {
    super();

    this.getUserID = this.getUserID.bind(this);
  }

  getUserID() {
    if (
      !store.getState().firebase.auth.isEmpty &&
      store.getState().firebase.auth.isLoaded
    ) {
      return firebase.auth().currentUser.uid;
    } else {
      return "";
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={(props) => <Catalog {...props} />} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route path="/user/:userID" component={Profile}/>
        <PrivateRoute path="/editor" component={Editor} />
        <PrivateRoute
          path="/cookbook/created"
          component={Catalog}
          filter={["userID", "==", this.getUserID()]}
        />
        <PrivateRoute
          path="/cookbook/favorites"
          component={Catalog}
          filter={["savedByUsers", "array-contains", this.getUserID()]}
        />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    );
  }
}

export default Routes;
