import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RecipePreview from "../Recipe/RecipePreview";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { MDBContainer, MDBRow } from "mdbreact";

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.content = this.content.bind(this);
  }

  static get propTypes() {
    return {
      recipes: PropTypes.array,
    };
  }

  content() {
    if (!this.props.recipes) {
      return <h1>Empty</h1>;
    } else {
      return (
        <MDBRow>
          {this.props.recipes.map((recipe) => (
            <RecipePreview recipe={recipe} key={recipe.id} />
          ))}
        </MDBRow>
      );
    }
  }
  render() {
    return <MDBContainer>{this.content()}</MDBContainer>;
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.firestore.ordered.recipes,
  };
};
export default compose(
  connect(mapStateToProps, null),
  firestoreConnect([{ collection: "recipes", limit: 6 }])
)(Catalog);
