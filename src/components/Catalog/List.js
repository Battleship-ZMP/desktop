import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RecipePreview from "../Recipe/RecipePreview";
import { compose } from "redux";
import { MDBContainer, MDBRow } from "mdbreact";
import { fetchRecipes } from "../../store/actions/recipesActions";

class List extends Component {
  constructor(props) {
    super(props);

    this.content = this.content.bind(this);
  }
  componentDidMount() {
    this.props.fetchRecipes();
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
  console.log(state.recipes.data);
  return {
    recipes: state.recipes.data,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(fetchRecipes()),
});
export default compose(connect(mapStateToProps, mapDispatchToProps))(List);
