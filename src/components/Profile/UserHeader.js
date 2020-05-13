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
              className="rounded figure-img img-fluid z-depth-1"
              alt=""
              style={{ width: "200px" }}
            />
            <figcaption className="figure-caption">
              <title>{this.props.profile.userName}</title>
            </figcaption>
          </figure>
        </div>
      );
    } else {
      console.log("asdfasdfsdf")
      return (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
            <h1>asdfasdfsadfasdfsfd</h1>
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
