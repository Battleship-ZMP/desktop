import React, { Component } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdbreact";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { connect } from "react-redux";
import { addRecipe, editRecipe } from "../../store/actions/recipesActions";
import Dropzone from "react-dropzone";
import "./Uploader.css";
import PropTypes from "prop-types";
import history from "../../Router/history";

const editorSchema = Yup.object().shape({
  name: Yup.string()
    .required("The username is required")
    .min(6, "Nazwa przepisu musi być dłuższa niż 6 znaków")
    .max(100, "Nazwa przepisu musi być krótsza niż 100 znaków"),
  description: Yup.string(),
  ingredients: Yup.string().required("Podanie składników jest wymagane"),
  instructions: Yup.string().required("Instrukcje są wymagane"),
});

class Editor extends Component {
  constructor(props) {
    super(props);

    if (this.props.location.state) {
      this.recipe = this.props.location.state.recipe;
    }

    this.state = {
      files: [],
      name: this.recipe ? this.recipe.name : "",
      description: this.recipe ? this.recipe.description : "",
      ingredients: this.recipe ? this.recipe.ingredients : "",
      instructions: this.recipe ? this.recipe.instructions : "",
      preview: this.recipe ? this.recipe.photo : "",
    };

    this.onDrop = (files) => {
      files.map((file) => {
        Object.assign(file, { preview: URL.createObjectURL(file) });
      });
      this.setState({ files, preview: files[0].preview });
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.dropzone = this.dropzone.bind(this);
  }

  static get propTypes() {
    return {
      addRecipe: PropTypes.func,
      editRecipe: PropTypes.func,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.state !== this.props.location.state) {
      if (this.props.location.state) {
        const recipe = this.props.location.state.recipe;
        this.setState({
          name: recipe.name,
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          preview: recipe.photo,
        });
      } else {
        this.setState({
          name: "",
          description: "",
          ingredients: "",
          instructions: "",
          preview: "",
        });
      }
    }
  }

  onSubmit(recipe, photo) {
    if (this.props.location.state) {
      recipe.id = this.props.location.state.recipe.id;
      this.props.editRecipe(recipe, photo);
    } else {
      this.props.addRecipe(recipe, photo);
    }
  }

  dropzone() {
    return (
      <Dropzone onDrop={this.onDrop} multiple={false} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <section className="d-flex flex-1">
            {this.state.preview ? (
              <div
                {...getRootProps({
                  className: "imageDropzone",
                })}
                style={{
                  backgroundImage: `url("${this.state.preview}")`,
                }}
              >
                <input {...getInputProps()} />
              </div>
            ) : (
              <div
                {...getRootProps({
                  className: "dropzone",
                })}
              >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <MDBIcon icon="cloud-upload-alt" />
              </div>
            )}
          </section>
        )}
      </Dropzone>
    );
  }

  render() {
    return (
      <MDBContainer fluid className="p-4">
        <MDBCard>
          <MDBCardHeader color="teal" className="teal">
            <MDBCardTitle className="text-white">Dodaj przepis!</MDBCardTitle>
          </MDBCardHeader>
          <Formik
            enableReinitialize={true}
            validateOnMount={true}
            initialValues={{
              name: this.state.name,
              description: this.state.description,
              ingredients: this.state.ingredients,
              instructions: this.state.instructions,
            }}
            validationSchema={editorSchema}
            onSubmit={(recipe, { setSubmitting }) => {
              this.onSubmit(
                recipe,
                this.state.files[0] ? this.state.files[0] : ""
              );
              history.push("/");
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="8">
                      <Field name="name">
                        {({ field, form, meta }) => (
                          <div>
                            <MDBInput
                              containerClass="mb-0 pb-0"
                              type="text"
                              label="Tytuł"
                              {...field}
                            />
                            {meta.touched && meta.error && (
                              <small className="text-danger m-0 p-0">
                                {meta.error}
                              </small>
                            )}
                          </div>
                        )}
                      </Field>
                      <Field name="description">
                        {({ field }) => (
                          <div>
                            <MDBInput
                              containerClass="mb-0 pb-0"
                              type="text"
                              label="Opis"
                              {...field}
                            />
                          </div>
                        )}
                      </Field>
                      <Field name="ingredients">
                        {({ field, form, meta }) => (
                          <div>
                            <MDBInput
                              containerClass="mb-0 pb-0"
                              type="text"
                              label="Składniki"
                              {...field}
                            />
                            {meta.touched && meta.error && (
                              <small className="text-danger m-0 p-0">
                                {meta.error}
                              </small>
                            )}
                          </div>
                        )}
                      </Field>
                      <Field name="instructions">
                        {({ field, form, meta }) => (
                          <div>
                            <MDBInput
                              containerClass="mb-0 pb-0"
                              type="text"
                              label="Instrukcje"
                              {...field}
                            />
                            {meta.touched && meta.error && (
                              <small className="text-danger m-0 p-0">
                                {meta.error}
                              </small>
                            )}
                          </div>
                        )}
                      </Field>
                    </MDBCol>
                    <MDBCol md="4" className="d-flex">
                      {this.dropzone()}
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
                <MDBCardFooter>
                  <MDBBtn
                    type="submit"
                    color="teal"
                    className="text-white"
                    disabled={!isValid}
                  >
                    Wyślij
                  </MDBBtn>
                </MDBCardFooter>
              </Form>
            )}
          </Formik>
        </MDBCard>
      </MDBContainer>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  addRecipe: (recipe, photo) => dispatch(addRecipe(recipe, photo)),
  editRecipe: (recipe, photo) => dispatch(editRecipe(recipe, photo)),
});
export default connect(null, mapDispatchToProps)(Editor);
