import React, { Component } from "react";
import PropTypes from "prop-types";
import RecipePreview from "../Recipe/RecipePreview";
import { MDBContainer, MDBRow } from "mdbreact";

class List extends Component {
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
    console.log(this.props.recipes);
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
    } else {
      return <h1>Empty</h1>;
    }
  }
  render() {
    return <MDBContainer>{this.content()}</MDBContainer>;
  }
}

export default List;
