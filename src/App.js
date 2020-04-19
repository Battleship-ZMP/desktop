import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { fbConfig, rrfProps } from "./firebaseConfig";

import "./utils/globalStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./components/Main/Main";

firebase.initializeApp(fbConfig);
firebase.firestore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <div className="App">
              <Main />
            </div>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

export default App;
