import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { fbConfig, rrfProps } from "./firebaseConfig";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import Main from "./components/Main/Main";

firebase.initializeApp(fbConfig);
firebase.firestore();

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  return children;
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <AuthIsLoaded>
            <Router>
              <div className="App">
                <Main />
              </div>
            </Router>
          </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

export default App;
