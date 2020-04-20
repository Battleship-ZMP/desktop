import React from "react";
import PropTypes from "prop-types";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRating,
  MDBCol,
  MDBCardImage,
} from "mdbreact";

const RecipePreview = (props) => {
  const recipe = props.recipe;

  RecipePreview.propTypes = {
    recipe: PropTypes.object,
  };

  return (
    <MDBCol className="my-3" lg="4" md="6">
      <MDBCard>
        {/*TODO horizontal img "support"*/}
        <MDBCardImage
          className="img-fluid"
          src="https://mdbootstrap.com/img/Photos/Horizontal/People/6-col/img%20%283%29.jpg"
          alt=""
        />
        <MDBCardBody className="text-center">
          <div>
            <div className="caption grey-text">Przepis</div>
            <div>{recipe.name}</div>
          </div>
          <div>
            <div className="caption grey-text">Użytkownik</div>
            <div>{recipe.userName}</div>
          </div>
          <div>
            <div className="caption grey-text">Dodano</div>
            <div>{recipe.date}</div>
          </div>
          <div>
            <div className="caption grey-text">Ocena</div>
            <MDBRating containerClassName="justify-content-center" />
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default RecipePreview;
