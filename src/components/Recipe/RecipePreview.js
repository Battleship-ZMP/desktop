import React from "react";
import PropTypes from "prop-types";
import { MDBRow } from "mdbreact";

const RecipePreview = (props) => {
  const recipe = props.recipe;

  RecipePreview.propTypes = {
    recipe: PropTypes.object,
  };

  return (
    <div className="col-3 border border-dark">
      <MDBRow>
        <h2 className="title">{recipe.name}</h2>
      </MDBRow>
      <MDBRow className="flex-column">
        <h2 className="title">Opis:</h2>
        <p>{recipe.description}</p>
      </MDBRow>
    </div>
  );
};

export default RecipePreview;
