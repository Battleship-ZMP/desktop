import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
import List from "../Catalog/List";
import { fetchRecipes } from "../../store/actions/recipesActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import firebase from "firebase/app";

class Favorites extends Component {
  constructor(props) {
    super(props);

    const filter = [
      "savedByUsers",
      "array-contains",
      firebase.auth().currentUser.uid,
    ];
    this.props.fetchRecipes(filter);
  }

  static get propTypes() {
    return {
      fetchRecipes: PropTypes.func,
      recipes: PropTypes.array,
    };
  }

  render() {
    return (
      <MDBContainer fluid>
        <h1>Created</h1>
        <List recipes={this.props.recipes} />
      </MDBContainer>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.recipes.data);
  return {
    recipes: state.recipes.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: (filter) => dispatch(fetchRecipes(filter)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
