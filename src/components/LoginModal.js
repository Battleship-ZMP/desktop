/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { signIn } from "../store/actions/authActions";
import { connect } from "react-redux";
import {
  MDBBtn,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
} from "mdbreact";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email.")
    .required("The email is required."),
  password: Yup.string().required("The passoword is required."),
});

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showPassword: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
  }

  togglePassword() {
    this.setState(
      this.state.showPassword ? { showPassword: false } : { showPassword: true }
    );
  }

  toggleModal() {
    this.setState(
      this.state.showModal ? { showModal: false } : { showModal: true }
    );
  }

  render() {
    return (
      <div>
        <MDBBtn onClick={this.toggleModal}>Zaloguj</MDBBtn>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(credentials, { setSubmitting }) => {
            this.props.signIn(credentials);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <MDBModal isOpen={this.state.showModal} toggle={this.toggleModal}>
                <MDBModalHeader
                  className="teal text-white"
                  toggle={this.toggleModal}
                >
                  zaloguj się!
                </MDBModalHeader>
                <MDBModalBody>
                  <Field name="email">
                    {({ field, meta }) => (
                      <>
                        <MDBInput
                          containerClass="mb-0 pb-0"
                          type="email"
                          label="Email"
                          style={{ marginLeft: "0" }}
                          {...field}
                        />
                        {meta.touched && meta.error && (
                          <small className="text-danger m-0 p-0">
                            {meta.error}
                          </small>
                        )}
                      </>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, meta }) => (
                      <>
                        <MDBInput
                          containerClass="mb-0 pb-0"
                          type={this.state.showPassword ? "text" : "password"}
                          label="Hasło"
                          style={{ marginLeft: "0" }}
                          {...field}
                        >
                          <MDBIcon
                            icon="eye"
                            className={`btn-toggle-pass ${
                              this.state.showPassword ? "active" : ""
                            }`}
                            onClick={this.togglePassword}
                          />
                        </MDBInput>
                        {meta.touched && meta.error && (
                          <small className="text-danger m-0 p-0">
                            {meta.error}
                          </small>
                        )}
                      </>
                    )}
                  </Field>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn type="submit">Zaloguj</MDBBtn>
                </MDBModalFooter>
              </MDBModal>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signIn: (credentials) => dispatch(signIn(credentials)),
});

export default connect(null, mapDispatchToProps)(LoginModal);
