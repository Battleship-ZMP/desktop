import { Redirect, Route } from "react-router-dom";
import store from "../store/store";
import React from "react";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !store.getState().firebase.auth.isEmpty &&
        store.getState().firebase.auth.isLoaded ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
