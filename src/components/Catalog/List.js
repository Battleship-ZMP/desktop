import React, { Component } from "react";
import PropTypes from "prop-types";
import RecipePreview from "../Recipe/RecipePreview";
import { MDBContainer, MDBRow } from "mdbreact";
import { fetchRecipes } from "../../store/actions/recipesActions";
import { connect } from "react-redux";

class List extends Component {
  constructor(props) {
    super(props);

    this.content = this.content.bind(this);
  }

  static get propTypes() {
    return {
      recipes: PropTypes.array,
      isLoading: PropTypes.bool,
    };
  }

  content() {
    if (this.props.isLoading) {
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    if (
      typeof this.props.recipes !== "undefined" &&
      this.props.recipes.length !== 0
    ) {
      return (
        <MDBRow>
          {this.props.recipes.map((recipe) => (
            <RecipePreview recipe={recipe} key={recipe.id} />
          ))}
        </MDBRow>
      );
    }
    return <h1>Empty</h1>;
  }
  render() {
    return <MDBContainer>{this.content()}</MDBContainer>;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.recipes.isLoading,
  };
};

export default connect(mapStateToProps, null)(List);
