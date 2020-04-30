import React, { Component } from "react";
import { fetchRecipes } from "../../store/actions/recipesActions";
import { compose } from "redux";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";
import List from "../Catalog/List";
import PropTypes from "prop-types";
import firebase from "firebase/app";

class Created extends Component {
  constructor(props) {
    super(props);

    const filter = ["userID", "==", firebase.auth().currentUser.uid];
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
        <h1>Cookbook</h1>
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
export default compose(connect(mapStateToProps, mapDispatchToProps))(Created);
