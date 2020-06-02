import React from "react";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";
import UserHeader from "./UserHeader";
import { fetchProfile } from "../../store/actions/profileActions";
import List from "../Catalog/List";
import { fetchRecipes } from "../../store/actions/recipesActions";
import store from "../../store/store";
import firebase from "firebase/app";
import Settings from "./Settings/Settings";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: this.props.location.state.userID,
    };

    this.fetchData();

    this.content = this.content.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.state.userID !== this.props.location.state.userID) {
      this.setState({ userID: this.props.location.state.userID }, () => {
        this.fetchData();
      });
    }
  }

  fetchData() {
    this.props.fetchProfile(this.state.userID);

    const filter = ["userID", "==", this.state.userID];
    this.props.fetchRecipes(filter);
  }

  content() {
    if (
      !store.getState().firebase.auth.isEmpty &&
      store.getState().firebase.auth.isLoaded &&
      typeof firebase.auth().currentUser !== "undefined" &&
      this.state.userID === firebase.auth().currentUser.uid
    ) {
      return <Settings />;
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
  fetchRecipes: (filter, order) => dispatch(fetchRecipes(filter, order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
