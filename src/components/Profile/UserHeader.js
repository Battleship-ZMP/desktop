import React from "react";
import { MDBContainer } from "mdbreact";
import "../../utils/Avatar.css";

class UserHeader extends React.Component {
  constructor(props) {
    super(props);
    this.content = this.content.bind(this);
  }

  content() {
    if (typeof this.props.profile !== "undefined") {
      return (
        <div>
          <figure className="figure d-flex flex-column align-items-center">
            <img
              src={
                this.props.profile.photo
                  ? this.props.profile.photo
                  : "https://firebasestorage.googleapis.com/v0/b/coolrecipes-f4e21.appspot.com/o/placeholders%2Favatar_placeholder.png?alt=media&token=a53a239f-ed1e-4de8-ba7c-80c29f82f52f"
              }
              className="rounded-circle figure-img img-fluid z-depth-1"
              alt=""
              style={{ width: "100px", height: "100px" }}
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
