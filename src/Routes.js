import React from "react";
import { Route } from "react-router-dom";
import Catalog from "./components/Catalog/Catalog";
import Recipe from "./components/Recipe/Recipe";
import Editor from "./components/Recipe/Editor";

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={Catalog} />
      <Route path="/recipe/:id" component={Recipe} />
      <Route path="/editor" component={Editor} />
    </div>
  );
};

export default Routes;
