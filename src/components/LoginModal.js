/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { signIn } from "../store/actions/authActions";
import { connect } from "react-redux";
import {
  MDBBtn,
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
  //TODO add error display
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
        <MDBBtn onClick={this.toggle}>Zaloguj</MDBBtn>

        <MDBModal isOpen={this.state.show} toggle={this.toggle}>
          <MDBModalHeader>Zaloguj się!</MDBModalHeader>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(credentials, { setSubmitting }) => {
              this.props.onSubmit(credentials);
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <MDBModalBody>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Password</label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Your password..."
                    />
                  </div>
                </MDBModalBody>
                <MDBModalFooter>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid}
                  >
                    Zaloguj
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
  onSubmit: (credentials) => dispatch(signIn(credentials)),
});

export default connect(null, mapDispatchToProps)(LoginModal);
