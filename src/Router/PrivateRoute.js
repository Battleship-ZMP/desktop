import { Redirect, Route } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

function PrivateRoute({ component: Component, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoaded(auth) && !isEmpty(auth) ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
