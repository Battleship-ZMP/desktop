/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from "react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { signUp } from "../store/actions/authActions";
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

const SignUpSchema = Yup.object().shape({
  userName: Yup.string().required("Nazwa użytkownika jest wymagana"),
  email: Yup.string()
    .email("Niepoprawny email")
    .required("Email jest wymagany"),
  bio: Yup.string().max(255, "Biografia musi zawierać mniej niż 255 znaków"),
  password: Yup.string()
    .required("Hasło jest wymagane")
    .min(8, "Hasło musi zawierać min. 8 znaków"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Hasła muszą się zgadzać")
    .required("Potwierdzenie hasła jest wymagane"),
});

class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showPassword: false,
      showConfirmPassword: false,
      authError: null,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.toggleConfirmPassword = this.toggleConfirmPassword.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.authError !== this.props.authError) {
      this.setState({ authError: this.props.authError });
    }
  }

  toggleModal() {
    this.setState(this.state.show ? { show: false } : { show: true });
  }

  togglePassword() {
    this.setState(
      this.state.showPassword ? { showPassword: false } : { showPassword: true }
    );
  }

  toggleConfirmPassword() {
    this.setState(
      this.state.showConfirmPassword
        ? { showConfirmPassword: false }
        : { showConfirmPassword: true }
    );
  }

  render() {
    return (
      <div>
        <MDBBtn variant="primary" onClick={this.toggleModal}>
          Rejestracja
        </MDBBtn>

        <Formik
          initialValues={{
            userName: "",
            email: "",
            bio: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={(credentials) => {
            this.props.onSubmit(credentials);
          }}
        >
          {({ isValid }) => (
            <MDBModal isOpen={this.state.show} toggle={this.toggleModal}>
              <MDBModalHeader
                className="teal text-white"
                toggle={this.toggleModal}
              >
                Załóż konto!
              </MDBModalHeader>{" "}
              <Form>
                <MDBModalBody>
                  <Field name="userName">
                    {({ field, meta }) => (
                      <>
                        <MDBInput
                          containerClass="mb-0 pb-0"
                          type="text"
                          label="Nazwa użytkownika"
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
                  <Field name="bio">
                    {({ field, meta }) => (
                      <>
                        <MDBInput
                          containerClass="mb-0 pb-0"
                          type="text"
                          label="Biografia"
                          placeholder="Opcjonalne"
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
                        {((meta.touched && meta.error) ||
                          this.state.authError) && (
                          <small className="text-danger m-0 p-0">
                            {meta.error ? meta.error : this.state.authError}
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
                  <Field name="confirmPassword">
                    {({ field, meta }) => (
                      <>
                        <MDBInput
                          containerClass="mb-0 pb-0"
                          type={
                            this.state.showConfirmPassword ? "text" : "password"
                          }
                          label="Potwierdź hasło"
                          style={{ marginLeft: "0" }}
                          {...field}
                        >
                          <MDBIcon
                            icon="eye"
                            className={`btn-toggle-pass ${
                              this.state.showConfirmPassword ? "active" : ""
                            }`}
                            style={{ cursor: "pointer" }}
                            onClick={this.toggleConfirmPassword}
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
                  <MDBBtn type="submit">Zarejestruj</MDBBtn>
                </MDBModalFooter>
              </Form>
            </MDBModal>
          )}
        </Formik>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (credentials) => dispatch(signUp(credentials)),
});

const mapStateToProps = (state) => {
  return {
    authError: state.auth.signUpError,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
