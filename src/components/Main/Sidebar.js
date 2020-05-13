import React, { Component } from "react";
import { Link } from "react-router-dom";
import store from "../../store/store";
import firebase from "firebase/app";
import { connect } from "react-redux";

class Sidebar extends Component {
  profileLink() {
    if (
      !store.getState().firebase.auth.isEmpty &&
      store.getState().firebase.auth.isLoaded
    ) {
      const currentUser = firebase.auth().currentUser;
      return (
        <Link
          to={{
            pathname: `/user/${currentUser.uid}`,
            state: { userID: currentUser.uid },
          }}
          className="list-group-item list-group-item-action bg-light"
        >
          {this.props.profile.userName}
        </Link>
      );
    }
  }

  protectedLinks() {
    if (
      !store.getState().firebase.auth.isEmpty &&
      store.getState().firebase.auth.isLoaded
    ) {
      return (
        <div>
          <Link
            to="/cookbook/created"
            className="list-group-item list-group-item-action bg-light"
          >
            Własne przepisy
          </Link>
          <Link
            to="/cookbook/favorites"
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
          {this.profileLink()}
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

export default connect(({ firebase: { profile } }) => ({ profile }))(Sidebar);
