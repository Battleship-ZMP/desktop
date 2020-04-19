import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RecipePreview from "../Recipe/RecipePreview";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

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
        <Row>
          {this.props.recipes.map((recipe) => (
            <RecipePreview recipe={recipe} key={recipe.id} />
          ))}
        </Row>
      );
    }
  }
  render() {
    return <Container>{this.content()}</Container>;
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.firestore.ordered.recipes,
  };
};
export default compose(
  connect(mapStateToProps, null),
  firestoreConnect([{ collection: "recipes" }])
)(Catalog);
