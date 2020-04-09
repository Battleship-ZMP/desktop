/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from "react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { signUp } from "../store/actions/authActions";
import { connect } from "react-redux";

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Your username is required"),
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
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({
      show: true,
    });
  }

  hideModal() {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.showModal}>
          Register
        </Button>

        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header>Register</Modal.Header>
          <Formik
            initialValues={{
              name: "",
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
                <Modal.Body>
                  <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <Field
                      className="form-control"
                      type="name"
                      name="name"
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
                </Modal.Body>
                <Modal.Footer>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid}
                  >
                    Register
                  </button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (credentials) => dispatch(signUp(credentials)),
});
export default connect(null, mapDispatchToProps)(RegisterModal);
