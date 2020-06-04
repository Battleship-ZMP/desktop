import React, { Component } from "react";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBCol,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBRow,
} from "mdbreact";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
      directionStr: "asc",
      fieldPath: "name",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleDirectionStrChange = this.handleDirectionStrChange.bind(this);
    this.handleFieldPathChange = this.handleFieldPathChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    this.setState({ searchString: e.target.value });
  }

  handleSort() {
    this.props.handleSort([this.state.fieldPath, this.state.directionStr]);
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.handleSearch(this.state.searchString);
  }

  handleFieldPathChange(fieldPath) {
    this.setState({ fieldPath: fieldPath }, () => {
      this.handleSort();
    });
  }

  handleDirectionStrChange() {
    const directionStr = this.state.directionStr === "asc" ? "desc" : "asc";
    this.setState(
      {
        directionStr: directionStr,
      },
      () => {
        this.handleSort();
      }
    );
  }

  render() {
    return (
      <MDBRow className={"d-flex justify-content-center"}>
        <MDBCol md="8" className="d-flex align-content-center">
          <MDBBtnGroup className="d-flex align-items-center">
            <MDBDropdown className="m-0 mr-2">
              <MDBDropdownToggle
                caret
                className="m-0 d-flex align-items-center h-100"
                color="info"
              >
                Sortowanie
              </MDBDropdownToggle>
              <MDBDropdownMenu basic color="info">
                <MDBDropdownItem
                  onClick={() => this.handleFieldPathChange("name")}
                >
                  Po nazwie
                </MDBDropdownItem>
                <MDBDropdownItem
                  onClick={() => this.handleFieldPathChange("rating")}
                >
                  Po ocenie
                </MDBDropdownItem>
                <MDBDropdownItem
                  onClick={() => this.handleFieldPathChange("date")}
                >
                  Po dacie
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBBtn color="info" onClick={this.handleDirectionStrChange}>
              <MDBIcon
                icon={
                  this.state.directionStr === "asc" ? "caret-up" : "caret-down"
                }
              />
            </MDBBtn>
          </MDBBtnGroup>
          <form
            className="input-group md-form form-sm form-1 pl-0"
            onSubmit={this.handleSearch}
          >
            <div className="input-group-prepend">
              <MDBBtn
                color="teal"
                className="m-0"
                aria-label="Search"
                type="submit"
              >
                Szukaj
              </MDBBtn>
            </div>
            <input
              className="form-control my-0 py-1"
              type="text"
              placeholder="Wpisz nazwę szukanego przepisu"
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
