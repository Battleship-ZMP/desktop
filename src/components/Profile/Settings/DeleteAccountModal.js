import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBCard,
  MDBInput,
} from "mdbreact";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  changePassword,
  deleteUser,
  updateProfile,
} from "../../../store/actions/profileActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("The password is required.")
    .min(8, "Password must contain min. 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

class DeleteAccountModal extends React.Component {
  constructor() {
    super();

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
        <MDBBtn onClick={this.toggle} color="danger" className="ml-0">
          Skasuj konto
        </MDBBtn>

        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          isInitialValid={false}
          validationSchema={passwordSchema}
          onSubmit={(data, { setSubmitting }) => {
            this.props.deleteUser(data);
            this.props.history.push("/");
          }}
        >
          {({ isSubmitting, isValid, values }) => (
            <Form>
              <MDBModal isOpen={this.state.show} toggle={this.toggle}>
                <MDBModalHeader
                  className="bg-danger text-white"
                  toggle={this.toggle}
                >
                  Usuń konto
                </MDBModalHeader>
                <MDBModalBody>
                  <Field name="password" autoComplete="off">
                    {({ field, form, meta }) => (
                      <div>
                        <MDBInput
                          containerClass="mb-0 pb-0"
                          type="password"
                          label="Hasło"
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
                  <Field name="confirmPassword" autoComplete="off">
                    {({ field, form, meta }) => (
                      <div>
                        <MDBInput
                          containerClass="mb-0 pb-0"
                          type="password"
                          label="Potwierdź hasło"
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
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="danger" type="submit">
                    Wyślij
                  </MDBBtn>
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
  deleteUser: (password) => dispatch(deleteUser(password)),
});

export default compose(
  connect(null, mapDispatchToProps),
  withRouter
)(DeleteAccountModal);
