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

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("The password is required.")
    .min(8, "Password must contain min. 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

class PasswdChangeModal extends React.Component {
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
        <MDBBtn onClick={this.toggle} color="danger">
          Change password
        </MDBBtn>

        <Formik
          initialValues={{
            currentPassword: "",
            password: "",
            confirmPassword: "",
          }}
          isInitialValid={false}
          validationSchema={passwordSchema}
          onSubmit={(password, { setSubmitting }) => {
            console.log(password);
          }}
        >
          {({ isSubmitting, isValid, values }) => (
            <MDBModal isOpen={this.state.show} toggle={this.toggle}>
              <MDBModalHeader
                className="bg-danger text-white"
                toggle={this.toggle}
              >
                Zmień hasło
              </MDBModalHeader>
              <MDBModalBody>
                <Field name="currentPassword" autoComplete="off">
                  {({ field, form, meta }) => (
                    <div>
                      <MDBInput
                        containerClass="mb-0 pb-0"
                        type="password"
                        label="Obecne hasło"
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
                <Field name="password" autoComplete="off">
                  {({ field, form, meta }) => (
                    <div>
                      <MDBInput
                        containerClass="mb-0 pb-0"
                        type="password"
                        label="Nowe hasło"
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
                <MDBBtn color="danger" onClick={this.toggle}>
                  Zapisz
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          )}
        </Formik>
      </div>
    );
  }
}

export default PasswdChangeModal;
