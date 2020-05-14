import React from "react";
import { MDBContainer } from "mdbreact";
import "../../utils/Avatar.css";

class UserHeader extends React.Component {
  constructor(props) {
    super(props);
    this.content = this.content.bind(this);
  }

  getAvatar() {
    if (typeof this.props.profile.photo !== "undefined") {
      return (
        <img
          src={this.props.profile.photo}
          className="rounded-circle figure-img img-fluid z-depth-1"
          alt=""
          style={{ width: "100px", height: "100px" }}
        />
      );
    } else {
      return (
        <div className="avatar-circle">
          <div className="initials">{this.props.profile.userName.charAt(0)}</div>
        </div>
      );
    }
  }

  content() {
    if (typeof this.props.profile !== "undefined") {
      return (
        <div>
          <figure className="figure d-flex flex-column align-items-center">
            {this.getAvatar()}
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
