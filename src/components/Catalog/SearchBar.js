import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBContainer } from "mdbreact";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ searchString: e.target.value });
  }

  handleClick(e) {
    console.log(this.state.searchString);
    e.preventDefault();
  }

  render() {
    return (
      <MDBContainer fluid className={"d-flex justify-content-center"}>
        <MDBCol md="6">
          <form
            className="input-group md-form form-sm form-1 pl-0"
            onSubmit={this.handleClick}
          >
            <div className="input-group-prepend">
              <MDBBtn
                color="teal"
                className="m-0"
                aria-label="Search"
                type="submit"
              >
                Search
              </MDBBtn>
            </div>
            <input
              className="form-control my-0 py-1"
              type="text"
              placeholder="Search"
              aria-label="Search"
              value={this.state.searchString}
              onChange={this.handleChange}
            />
          </form>
        </MDBCol>
      </MDBContainer>
    );
  }
}

export default SearchBar;
