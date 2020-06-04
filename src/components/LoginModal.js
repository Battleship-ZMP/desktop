/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { signIn } from "../store/actions/authActions";
import { connect } from "react-redux";
import {
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
} from "mdbreact";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Niepoprawny adres email")
    .required("Adres email jest wymagany"),
  password: Yup.string().required("Hasło jest wymagane"),
});

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showPassword: false,
      authError: null,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.authError !== this.props.authError) {
      this.setState({ authError: this.props.authError });
    }
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
          onSubmit={(credentials) => {
            this.props.signIn(credentials);
          }}
        >
          {({isValid }) => (
            <Form>
              <MDBModal isOpen={this.state.showModal} toggle={this.toggleModal}>
                <MDBModalHeader
                  className="teal text-white"
                  toggle={this.toggleModal}
                >
                  Zaloguj się!
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
                            style={{ cursor: "pointer" }}
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
                  <small className="text-danger m-0 p-0">
                    {this.state.authError}
                  </small>
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

const mapStateToProps = (state) => {
  return {
    authError: state.auth.signInError,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (credentials) => dispatch(signIn(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
