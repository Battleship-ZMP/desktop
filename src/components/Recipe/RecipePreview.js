import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  MDBCard,
  MDBCardBody,
  MDBRating,
  MDBCol,
  MDBCardImage,
} from "mdbreact";
import { Link } from "react-router-dom";

class RecipePreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: this.props.recipe,
    };

    this.recipe = this.state.recipe;
  }

  static get propTypes() {
    return {
      recipes: PropTypes.object,
    };
  }

  render() {
    return (
      <MDBCol className="my-3" lg="4" md="6">
        <Link
          to={{
            pathname: `/recipe/${this.recipe.id}`,
            state: { recipe: this.recipe, userName: this.state.userName },
          }}
          className="text-dark"
          style={{ textDecoration: "none" }}
        >
          <MDBCard>
            {/*TODO horizontal img "support"*/}
            <MDBCardImage
              className="img-fluid"
              src={this.recipe.photo}
              alt=""
            />
            <MDBCardBody className="text-center">
              <div>
                <div className="caption grey-text">Przepis</div>
                <div>{this.recipe.name}</div>
              </div>
              <div>
                <div className="caption grey-text">Użytkownik</div>
                <div>{this.recipe.userName}</div>
              </div>
              <div>
                <div className="caption grey-text">Dodano</div>
                <div>{this.recipe.date}</div>
              </div>
              <div>
                <div className="caption grey-text">Ocena</div>
                <MDBRating containerClassName="justify-content-center" />
              </div>
            </MDBCardBody>
          </MDBCard>
        </Link>
      </MDBCol>
    );
  }
}

export default RecipePreview;
