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
  MDBFooter,
  MDBIcon,
  MDBInput,
  MDBModal,
  MDBRow,
} from "mdbreact";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";

const AddRecipeSchema = Yup.object().shape({
  name: Yup.string().required("Tytuł jest wymagany"),
  description: Yup.string(),
  ingredients: Yup.string().required("Podanie składników jest wymagane"),
  instructions: Yup.string().required("Instrukcje przepisu są wymagane"),
  photo: Yup.string(),
});

class Editor extends Component {
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
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
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
                    <MDBCol md="4">
                      {/*TODO adding photo */}
                      <Field name="photo">
                        {({ field, form: { touched, errors }, meta }) => (
                          <div>
                            <MDBInput
                              containerClass="mb-0 pb-0"
                              type="text"
                              label="Zdjęcie"
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

export default Editor;
