import React, { Component } from "react";
import store from "../../store/store";
import PropTypes from "prop-types";
import "./Main.css";

import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";

import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import Sidebar from "./Sidebar";
import Routes from "../../routes";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBNav,
  MDBNavbar,
} from "mdbreact";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuToggle: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
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

  toggleMenu(e) {
    e.preventDefault();
    this.setState(
      this.state.menuToggle ? { menuToggle: false } : { menuToggle: true }
    );
  }

  authButtons() {
    if (
      !store.getState().firebase.auth.isEmpty &&
      store.getState().firebase.auth.isLoaded
    ) {
      return <MDBBtn onClick={this.handleClick}>Logout</MDBBtn>;
    } else {
      return (
        <MDBBtnGroup>
          <div className="mr-3">
            <LoginModal />
          </div>
          <div>
            <RegisterModal />
          </div>
        </MDBBtnGroup>
      );
    }
  }

  render() {
    return (
      <div
        className={`d-flex ${this.state.menuToggle ? "toggled" : ""}`}
        id="wrapper"
      >
        <Sidebar />

        {
          //TODO Navbar into separate component
        }
        <div id="page-content-wrapper">
          <MDBNavbar light className="border-bottom">
            <MDBBtn
              className="btn btn-primary"
              id="menu-toggle"
              onClick={this.toggleMenu}
            >
              Toggle Menu
            </MDBBtn>

            <MDBNav className="mr-auto"></MDBNav>
            <MDBNav>{this.authButtons()}</MDBNav>
          </MDBNavbar>

          <Routes />
        </div>
      </div>
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