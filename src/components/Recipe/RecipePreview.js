import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

const RecipePreview = (props) => {
  const recipe = props.recipe;

  RecipePreview.propTypes = {
    recipe: PropTypes.object,
  };

  return (
    <div className="col-3 border border-dark">
      <Row>
        <h2 className="title">{recipe.name}</h2>
      </Row>
      <Row className="flex-column">
        <h2 className="title">Opis:</h2>
        <p>{recipe.description}</p>
      </Row>
    </div>
  );
};

export default RecipePreview;
