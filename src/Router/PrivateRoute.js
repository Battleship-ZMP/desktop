import { Redirect, Route } from "react-router-dom";
import store from "../store/store";
import React from "react";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !store.getState().firebase.auth.isEmpty &&
      store.getState().firebase.auth.isLoaded ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;
