import React, { Component } from "react";
import { MDBContainer, MDBRow } from "mdbreact";
import List from "./List";
import { fetchRecipes } from "../../store/actions/recipesActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.props.fetchRecipes(this.props.filter);
  }

  static get propTypes() {
    return {
      fetchRecipes: PropTypes.func,
      recipes: PropTypes.array,
      filter: PropTypes.array,
    };
  }

  render() {
    return (
      <MDBContainer fluid>
        <SearchBar />
        <List recipes={this.props.recipes} />
      </MDBContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: (filter) => dispatch(fetchRecipes(filter)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
