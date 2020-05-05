import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRating, MDBRow, MDBBtn } from "mdbreact";
import firebase from "firebase/app";
import { deleteRecipe } from "../../store/actions/recipesActions.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: this.props.location.state.recipe,
      userName: this.props.location.state.userName,
    };

    this.recipe = this.state.recipe;
    this.userName = this.state.userName;
    this.actionButtons = this.actionButtons.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    this.props.deleteRecipe(this.recipe.id);
    this.props.history.push("/");
    e.preventDefault();
  }

  actionButtons() {
    if (this.recipe.userID === firebase.auth().currentUser.uid) {
      return (
        <MDBContainer>
          <MDBBtn>Edytuj</MDBBtn>
          <MDBBtn onClick={this.handleDelete}>Usuń</MDBBtn>
        </MDBContainer>
      );
    } else {
      return <MDBBtn> Zapisz</MDBBtn>;
    }
  }

  render() {
    return (
      <MDBContainer style={{ padding: "5rem" }}>
        <MDBRow>
          <MDBCol className="" cols="12" md="8" sm="8">
            <img src={this.recipe.photo} alt="" className="img-fluid" />
          </MDBCol>
          <MDBCol className="justify-center d-flex flex-column" md="4" sm="4">
            {this.actionButtons()}
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
        <MDBRow className="flex-column">
          <h4 className="title">Autor:</h4>
          <p>{this.userName}</p>
        </MDBRow>
      </MDBContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteRecipe: (recipeID) => dispatch(deleteRecipe(recipeID)),
});

export default compose(connect(null, mapDispatchToProps), withRouter)(Recipe);
