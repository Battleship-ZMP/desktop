import React, { Component } from "react";
import { Link } from "react-router-dom";
import store from "../store/store";
import PropTypes from "prop-types";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";

class Header extends Component {
  constructor(props) {
    super(props);

    this.authButtons = this.authButtons.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  static get propTypes() {
    return {
      signOut: PropTypes.func,
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.props.signOut();
  }

  authButtons() {
    if (
      !store.getState().firebase.auth.isEmpty &&
      store.getState().firebase.auth.isLoaded
    ) {
      return <Button onClick={this.handleClick}>Logout</Button>;
    } else {
      return (
        <ButtonGroup>
          <div className="mr-3">
            <LoginModal />
          </div>
          <div>
            <RegisterModal />
          </div>
        </ButtonGroup>
      );
    }
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">CoolRecipes</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>{this.authButtons()}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoaded: state.firebase.auth.isLoaded,
    isEmpty: state.firebase.auth.isEmpty,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
