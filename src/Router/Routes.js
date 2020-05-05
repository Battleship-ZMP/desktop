import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import Catalog from "../components/Catalog/Catalog";
import Recipe from "../components/Recipe/Recipe";
import Editor from "../components/Recipe/Editor";
import { fetchRecipes } from "../store/actions/recipesActions";
import { compose } from "redux";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import firebase from "firebase/app";

class Routes extends Component {
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={(props) => <Catalog {...props} filter={["name", ">", ""]} />}
        />
        <Route path="/recipe/:id" component={Recipe} />
        <PrivateRoute path="/editor" component={Editor} />
        <PrivateRoute
          path="/cookbook/created"
          render={(props) => (
            <Catalog
              {...props}
              filter={["name", "==", firebase.auth().currentUser.uid]}
            />
          )}
        />
        <PrivateRoute
          path="/cookbook/favorites"
          render={(props) => (
            <Catalog
              {...props}
              filter={[
                "savedByUsers",
                "array-contains",
                firebase.auth().currentUser.uid,
              ]}
            />
          )}
        />
        <Route render={() => <Redirect to="/" />} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(fetchRecipes()),
});

export default compose(connect(null, mapDispatchToProps))(Routes);
