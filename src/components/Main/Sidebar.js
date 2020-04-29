import React, { Component } from "react";
import { Link } from "react-router-dom";
import store from "../../store/store";
import firebase from "firebase/app";

class Sidebar extends Component {
  protectedLinks() {
    if (
      !store.getState().firebase.auth.isEmpty &&
      store.getState().firebase.auth.isLoaded
    ) {
      return (
        <div>
          <Link
            to={{
              pathname: `/cookbook/owned`,
              state: {
                filter: ["userID", "==", `${firebase.auth().currentUser.uid}`],
              },
            }}
            className="list-group-item list-group-item-action bg-light"
          >
            Własne przepisy
          </Link>
          <Link
            to="/cookbook/saved"
            className="list-group-item list-group-item-action bg-light"
          >
            Zapisane przepisy
          </Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">Cool Recipes</div>
        <div className="list-group list-group-flush ">
          <Link
            to="/"
            className="list-group-item list-group-item-action bg-light"
          >
            Katalog
          </Link>
          {this.protectedLinks()}
        </div>
      </div>
    );
  }
}

export default Sidebar;
