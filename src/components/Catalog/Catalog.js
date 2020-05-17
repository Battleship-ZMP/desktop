import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
import List from "./List";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import {
  fetchAllRecipes,
  fetchFilteredRecipes,
} from "../../store/actions/recipesActions";

class Catalog extends Component {
  constructor(props) {
    super(props);

    if (this.props.filter) {
      this.props.fetchFilteredRecipes(this.props.filter, ["name", "asc"]);
    } else {
      this.props.fetchAllRecipes(["name", "asc"]);
    }

    this.handleSort = this.handleSort.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.filter !== prevProps.filter) {
      this.props.fetchFilteredRecipes(this.props.filter, ["name", "asc"]);
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
    console.log(order);
    if (this.props.filter) {
      this.props.fetchFilteredRecipes(this.props.filter, order);
    } else {
      this.props.fetchAllRecipes(order);
    }
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
  fetchAllRecipes: (order) => dispatch(fetchAllRecipes(order)),
  fetchFilteredRecipes: (filter, order) =>
    dispatch(fetchFilteredRecipes(filter, order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
