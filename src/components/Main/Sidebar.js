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
        <div className="row align-content-center justify-items-center mt-5 mb-3 flex-column">
          <Link
            to={{
              pathname: `/user/${currentUser.uid}`,
              state: { userID: currentUser.uid },
            }}
            className="d-flex justify-content-center"
          >
            <img
              src={
                this.props.profile.photo
                  ? this.props.profile.photo
                  : "https://firebasestorage.googleapis.com/v0/b/coolrecipes-f4e21.appspot.com/o/placeholders%2Favatar_placeholder.png?alt=media&token=a53a239f-ed1e-4de8-ba7c-80c29f82f52f"
              }
              className="rounded-circle figure-img img-fluid z-depth-1"
              alt=""
              style={{ width: "100px", height: "100px" }}
            />
          </Link>
          <Link
            to={{
              pathname: `/user/${currentUser.uid}`,
              state: { userID: currentUser.uid },
            }}
            className="text-center text-dark"
          >
            {this.props.profile.userName}
          </Link>
        </div>
      );
    } else {
      return (
        <div className="row align-content-center justify-items-center mt-5 mb-3 flex-column">
          <img
            src={process.env.PUBLIC_URL + "/favicon.png"}
            className="rounded-circle figure-img img-fluid z-depth-1"
            alt=""
            style={{ width: "100px", height: "100px" }}
          />
          <div className="text-center">
            <span>Cool</span>
            <span className="font-weight-bold">Recipes</span>
          </div>
        </div>
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
            className="list-group-item list-group-item-action"
          >
            Własne przepisy
          </Link>
          <Link
            to="/cookbook/favorites"
            className="list-group-item list-group-item-action"
          >
            Zapisane przepisy
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="border-right" id="sidebar-wrapper">
        {this.profileLink()}
        <ul className="list-group">
          <Link
            to="/"
            className="list-group-item-action list-group-item d-flex"
          >
            <div className="list-item-content list-item-content">Katalog</div>
          </Link>
          {this.protectedLinks()}
        </ul>
      </div>
    );
  }
}

export default connect(({ firebase: { profile } }) => ({ profile }))(Sidebar);
