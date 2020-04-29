import React, { Component } from "react";
import { Route } from "react-router-dom";
import Catalog from "./components/Catalog/List";
import Recipe from "./components/Recipe/Recipe";
import Editor from "./components/Recipe/Editor";

class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Catalog} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route path="/editor" component={Editor} />
        <Route path="/cookbook/owned" component={Catalog} />
      </div>
    );
  }
}

export default Routes
