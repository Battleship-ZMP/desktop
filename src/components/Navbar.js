import React, { Component } from "react";
import { Link } from "react-router-dom";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class Header extends Component {
  state = {
    show: false
  };

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">CoolRecipes</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <ButtonGroup>
              <div className="mr-3">
                <LoginModal />
              </div>
              <div>
                <RegisterModal />
              </div>
            </ButtonGroup>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
