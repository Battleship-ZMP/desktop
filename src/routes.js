import React from "react";
import { Route } from "react-router-dom";
import Catalog from "./components/Catalog/Catalog";

const Routes = () => {
  return (
    <div>
      <Route exact path="/catalog" component={Catalog} />
    </div>
  );
};

export default Routes;
