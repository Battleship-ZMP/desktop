import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
import List from "./List";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import { fetchRecipes } from "../../store/actions/recipesActions";

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.props.fetchRecipes(this.props.filter ? this.props.filter : null, [
      "name",
      "asc",
    ]);

    this.handleSort = this.handleSort.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.filter !== prevProps.filter) {
      this.props.fetchRecipes(this.props.filter, ["name", "asc"]);
    }
  }

  static get propTypes() {
    return {
      fetchAllRecipes: PropTypes.func,
      fetchFilteredRecipes: PropTypes.func,
      recipes: PropTypes.array,
      filter: PropTypes.array,
    };
  }

  handleSort(order) {
    this.props.fetchRecipes(
      this.props.filter ? this.props.filter : null,
      order
    );
  }

  render() {
    return (
      <MDBContainer fluid>
        <SearchBar handleSort={this.handleSort} />
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
  fetchRecipes: (filter, order) => dispatch(fetchRecipes(filter, order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
