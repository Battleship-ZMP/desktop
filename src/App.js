import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Routes />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
