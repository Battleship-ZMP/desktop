import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRating, MDBRow } from "mdbreact";

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: this.props.location.state,
    };

    this.recipe = this.state.recipe.recipe;
  }

  render() {
    return (
      <MDBContainer style={{ padding: "5rem" }}>
        <MDBRow className="">
          <MDBCol className="" cols="12" md="8" sm="8">
            <img
              src="https://mdbootstrap.com/img/Photos/Horizontal/People/6-col/img%20%283%29.jpg"
              alt=""
              className="img-fluid"
            />
          </MDBCol>
          <MDBCol className="justify-center d-flex flex-column" md="4" sm="4">
            <h2 className="display-1">{this.recipe.name}</h2>
            <p>Dodano: {this.recipe.date}</p>
            <div className="d-flex">
              <MDBRating containerClassName="justify-content-center" />
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow className="flex-column">
          <h2 className="title">Opis:</h2>
          <p>{this.recipe.description}</p>
        </MDBRow>
        <MDBRow className="flex-column">
          <h2 className="title">Składniki:</h2>
          <p>{this.recipe.ingredients}</p>
        </MDBRow>
        <MDBRow className="flex-column">
          <h2 className="title">Przepis:</h2>
          <p>{this.recipe.instructions}</p>
        </MDBRow>
        User Name
      </MDBContainer>
    );
  }
}

export default Recipe;
