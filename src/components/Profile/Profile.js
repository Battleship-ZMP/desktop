import React from "react";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";
import UserHeader from "./UserHeader";
import { fetchProfile } from "../../store/actions/profileActions";
import List from "../Catalog/List";
import { fetchFilteredRecipes } from "../../store/actions/recipesActions";
import store from "../../store/store";
import * as firebase from "firebase";
import Settings from "./Settings";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.content = this.content.bind(this);
    console.log(this.props.location.state);
    this.userID = this.props.location.state.userID;
    this.props.fetchProfile(this.userID);

    const filter = ["userID", "==", this.userID];
    const order = ["rating", "asc"];
    this.props.fetchFilteredRecipes(filter, order);
  }

  content() {
    if (
      (!store.getState().firebase.auth.isEmpty &&
        store.getState().firebase.auth.isLoaded) ||
      this.userID === firebase.auth().currentUser.uid
    ) {
      if (this.userID === firebase.auth().currentUser.uid) {
        return <Settings />;
      } else {
        return <List recipes={this.props.recipes} />;
      }
    } else {
      return <List recipes={this.props.recipes} />;
    }
  }

  render() {
    return (
      <MDBContainer fluid className="p-4">
        <UserHeader profile={this.props.profile} />
        {this.content()}
      </MDBContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.data,
    recipes: state.recipes.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: (userID) => dispatch(fetchProfile(userID)),
  fetchFilteredRecipes: (filter, order) =>
    dispatch(fetchFilteredRecipes(filter, order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
