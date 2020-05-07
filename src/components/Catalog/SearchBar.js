import React, { Component } from "react";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBCol,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBFormInline,
  MDBInput,
  MDBRow,
} from "mdbreact";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleChange(e) {
    this.setState({ searchString: e.target.value });
  }

  handleClick(e) {
    console.log(this.state.searchString);
    e.preventDefault();
  }

  handleSort(order) {
    this.props.handleSort(order);
  }

  render() {
    return (
      <MDBRow className={"d-flex justify-content-center"}>
        <MDBCol md="8" className="d-flex align-content-center">
          <MDBBtnGroup className="d-flex align-items-center">
            <MDBDropdown className="m-0">
              <MDBDropdownToggle
                caret
                className="mr-4 d-flex align-items-center"
                color="info"
              >
                Dropdown
              </MDBDropdownToggle>
              <MDBDropdownMenu basic color="info">
                <MDBDropdownItem
                  onClick={() => this.handleSort(["name", "asc"])}
                >
                  Po nazwie
                </MDBDropdownItem>
                <MDBDropdownItem
                  onClick={() => this.handleSort(["rating", "asc"])}
                >
                  Po ocenie
                </MDBDropdownItem>
                <MDBDropdownItem
                  onClick={() => this.handleSort(["date", "asc"])}
                >
                  Po dacie
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBBtnGroup>
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
      </MDBRow>
    );
  }
}

export default SearchBar;
