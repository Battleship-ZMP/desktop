import React from "react";
import { Route } from "react-router-dom";
import Catalog from "./components/Catalog/Catalog";
import Recipe from "./components/Recipe/Recipe";

const Routes = () => {
  return (
    <div>
      <Route exact path="/catalog" component={Catalog} />
      <Route path="/recipe/:id" component={Recipe}/>
    </div>
  );
};

export default Routes;
