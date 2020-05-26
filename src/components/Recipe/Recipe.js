import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRating, MDBRow, MDBBtn } from "mdbreact";
import firebase from "firebase/app";
import { deleteRecipe } from "../../store/actions/recipesActions.js";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import {
  rateRecipe,
  saveRecipe,
  unSaveRecipe,
} from "../../store/actions/recipesActions";
import store from "../../store/store";
import Rating from "react-rating";
import { onLog } from "firebase";

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: this.props.location.state.recipe,
      isLiked: false,
    };

    this.recipe = this.state.recipe;

    this.userName = this.state.userName;
    this.actionButtons = this.actionButtons.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleUnSave = this.handleUnSave.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.authorLink = this.authorLink.bind(this);
    this.handleRate = this.handleRate.bind(this);
  }

  componentDidMount() {
    if (
      !store.getState().firebase.auth.isEmpty &&
      store.getState().firebase.auth.isLoaded
    ) {
      const isLiked = this.recipe.savedByUsers.includes(
        firebase.auth().currentUser.uid
      );

      this.setState({
        isLiked: isLiked,
      });
    }
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteRecipe(this.recipe.id);
    this.props.history.push("/");
  }

  handleSave() {
    this.props.saveRecipe(this.recipe.id);
  }

  handleUnSave() {
    this.props.unSaveRecipe(this.recipe.id);
  }

  handleLike() {
    if (this.state.isLiked) {
      this.handleUnSave();
    } else {
      this.handleSave();
    }

    this.setState({ isLiked: this.state.isLiked ? false : true });
  }

  actionButtons() {
    if (
      !store.getState().firebase.auth.isEmpty &&
      store.getState().firebase.auth.isLoaded
    ) {
      const currentUserID = firebase.auth().currentUser.uid;

      if (this.recipe.userID === currentUserID) {
        return (
          <MDBContainer>
            <Link
              to={{
                pathname: `/recipe/${this.recipe.id}/edit`,
                state: { recipe: this.recipe },
              }}
            >
              <MDBBtn>Edytuj</MDBBtn>
            </Link>
            <MDBBtn onClick={this.handleDelete}>Usuń</MDBBtn>
          </MDBContainer>
        );
      } else {
        return (
          <i
            style={{ cursor: "pointer" }}
            className={`text-danger fa-heart fa-2x ${
              this.state.isLiked ? "fas" : "far"
            }`}
            onClick={this.handleLike}
          />
        );
      }
    }
  }

  authorLink() {
    if (this.recipe.userName) {
      return (
        <Link
          to={{
            pathname: `/user/${this.recipe.userID}`,
            state: { userID: this.recipe.userID },
          }}
        >
          {this.recipe.userName}
        </Link>
      );
    } else {
      return <div>Konto skasowane</div>;
    }
  }

  handleRate(value) {
    if (
      !store.getState().firebase.auth.isEmpty &&
      store.getState().firebase.auth.isLoaded
    ) {
      this.props.rateRecipe(this.recipe.id, value);
    } else {
      console.log("You must log in to rate recipes");
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
              <Rating
                readonly={
                  !(
                    !store.getState().firebase.auth.isEmpty &&
                    store.getState().firebase.auth.isLoaded
                  )
                }
                emptySymbol="py-2 px-1 fas fa-star"
                fullSymbol="py-2 px-1 fas fa-star amber-text"
                placeholderRating={this.recipe.averageRating}
                placeholderSymbol="py-2 px-1 fas fa-star amber-text"
                onClick={(value) => this.handleRate(value)}
              />
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

          {this.authorLink()}
        </MDBRow>
      </MDBContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteRecipe: (recipeID) => dispatch(deleteRecipe(recipeID)),
  saveRecipe: (recipeID) => dispatch(saveRecipe(recipeID)),
  unSaveRecipe: (recipeID) => dispatch(unSaveRecipe(recipeID)),
  rateRecipe: (recipe, value) => dispatch(rateRecipe(recipe, value)),
});

export default compose(connect(null, mapDispatchToProps), withRouter)(Recipe);
