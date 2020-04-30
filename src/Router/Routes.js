import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import Catalog from "../components/Catalog/Catalog";
import Recipe from "../components/Recipe/Recipe";
import Editor from "../components/Recipe/Editor";
import { fetchRecipes } from "../store/actions/recipesActions";
import { compose } from "redux";
import { connect } from "react-redux";
import Created from "../components/Cookbook/Created";
import Favorites from "../components/Cookbook/Favorites";
import PrivateRoute from "./PrivateRoute";

class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Catalog} />
        <Route path="/recipe/:id" component={Recipe} />
        <PrivateRoute path="/editor" component={Editor} />
        <PrivateRoute path="/cookbook/created" component={Created} />
        <PrivateRoute path="/cookbook/favorites" component={Favorites} />
        <Route render={() => <Redirect to="/" />} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(fetchRecipes()),
});

export default compose(connect(null, mapDispatchToProps))(Routes);
