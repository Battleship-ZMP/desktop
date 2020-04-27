import React, { Component, useCallback, useEffect, useState } from "react";
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
import { addRecipe } from "../../store/actions/recipesActions";
import Dropzone, { useDropzone } from "react-dropzone";
import "./Uploader.css";
import PropTypes from "prop-types";
import firebase from "firebase/app";
const AddRecipeSchema = Yup.object().shape({
  name: Yup.string().required("Tytuł jest wymagany"),
  description: Yup.string(),
  ingredients: Yup.string().required("Podanie składników jest wymagane"),
  instructions: Yup.string().required("Instrukcje przepisu są wymagane"),
  photo: Yup.string(),
});

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };

    this.onDrop = (files) => {
      files.map((file) => {
        Object.assign(file, { preview: URL.createObjectURL(file) });
      });
      this.setState({ files });
    };
  }

  static get propTypes() {
    return {
      onSubmit: PropTypes.func,
    };
  }

  render() {
    return (
      <MDBContainer fluid className="p-4">
        <MDBCard>
          <MDBCardHeader color="teal" className="teal">
            <MDBCardTitle className="text-white">Dodaj przepis!</MDBCardTitle>
          </MDBCardHeader>
          <Formik
            initialValues={{
              name: "",
              description: "",
              ingredients: "",
              instructions: "",
              photo: "",
            }}
            isInitialValid={false}
            validationSchema={AddRecipeSchema}
            onSubmit={(recipe, { setSubmitting }) => {
              recipe.userID = firebase.auth().currentUser.uid;

              this.props.onSubmit(
                recipe,
                this.state.files[0] ? this.state.files[0] : ""
              );
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="8">
                      <Field name="name">
                        {({ field, form: { touched, errors }, meta }) => (
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
                        {({ field, form: { touched, errors }, meta }) => (
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
                        {({ field, form: { touched, errors }, meta }) => (
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
                      <Dropzone
                        onDrop={this.onDrop}
                        multiple={false}
                        accept="image/*"
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section className="d-flex flex-1">
                            {this.state.files.length > 0 ? (
                              <img
                                className="img-fluid"
                                src={this.state.files[0].preview}
                              />
                            ) : (
                              <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                <p>
                                  Drag 'n' drop some files here, or click to
                                  select files
                                </p>
                                <MDBIcon icon="cloud-upload-alt" />
                              </div>
                            )}
                          </section>
                        )}
                      </Dropzone>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
                <MDBCardFooter>
                  <MDBBtn
                    type="submit"
                    disabled={!isValid}
                    color="teal"
                    className="text-white"
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
  onSubmit: (recipe, photo) => dispatch(addRecipe(recipe, photo)),
});
export default connect(null, mapDispatchToProps)(Editor);
