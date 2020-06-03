/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from "react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { signUp } from "../store/actions/authActions";
import { connect } from "react-redux";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
} from "mdbreact";

const SignUpSchema = Yup.object().shape({
  userName: Yup.string().required("Your username is required"),
  email: Yup.string()
    .email("Invalid email.")
    .required("The email is required."),
  bio: Yup.string().max(255, "Bio must contain less than 255 characters"),
  password: Yup.string()
    .required("The password is required.")
    .min(8, "Password must contain min. 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(this.state.show ? { show: false } : { show: true });
  }

  render() {
    return (
      <div>
        <MDBBtn variant="primary" onClick={this.toggle}>
          Rejestracja
        </MDBBtn>

        <MDBModal isOpen={this.state.show} toggle={this.toggle}>
          <MDBModalHeader>Zarejestruj się!</MDBModalHeader>
          <Formik
            initialValues={{
              userName: "",
              email: "",
              bio: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={(credentials, { setSubmitting }) => {
              this.props.onSubmit(credentials);
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <MDBModalBody>
                  <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <Field
                      className="form-control"
                      type="userName"
                      name="userName"
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Username"
                    />
                    <div className="invalid-feedback"></div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="bio">Short description</label>
                    <Field
                      className="form-control"
                      type="bio"
                      name="bio"
                      placeholder="(optional)"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Min. 8 characters"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Password</label>
                    <Field
                      className="form-control"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                    />
                  </div>
                </MDBModalBody>
                <MDBModalFooter>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid}
                  >
                    Zarejestruj
                  </button>
                </MDBModalFooter>
              </Form>
            )}
          </Formik>
        </MDBModal>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (credentials) => dispatch(signUp(credentials)),
});
export default connect(null, mapDispatchToProps)(RegisterModal);
