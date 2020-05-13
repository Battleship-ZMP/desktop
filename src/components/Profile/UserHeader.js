import React from "react";
import { MDBContainer } from "mdbreact";

class UserHeader extends React.Component {
  constructor(props) {
    super(props);
    this.content = this.content.bind(this);
  }

  content() {
    if (typeof this.props.profile !== "undefined") {
      return (
        <div>
          <figure className="figure">
            <img
              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/8-col/img%20(73).jpg"
              className="rounded-circle figure-img img-fluid z-depth-1"
              alt=""
              style={{ width: "200px", height: "200px" }}
            />
            <figcaption className="figure-caption">
              <h3>{this.props.profile.userName}</h3>
            </figcaption>
          </figure>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <MDBContainer className="d-flex flex-column justify-content-center align-items-center">
        {this.content()}
      </MDBContainer>
    );
  }
}

export default UserHeader;
