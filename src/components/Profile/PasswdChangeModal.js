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
  updateProfile,
} from "../../store/actions/profileActions";
import { connect } from "react-redux";

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("The password is required.")
    .min(8, "Password must contain min. 8 characters"),
  newPassword: Yup.string()
    .required("The password is required.")
    .min(8, "Password must contain min. 8 characters"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
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
        <MDBBtn onClick={this.toggle} color="danger" className="ml-0">
          Zmień hasło
        </MDBBtn>

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          isInitialValid={false}
          validationSchema={passwordSchema}
          onSubmit={(data, { setSubmitting }) => {
            console.log("submitting");
            this.props.changePassword(data);
          }}
        >
          {({ isSubmitting, isValid, values }) => (
            <Form>
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
                  <Field name="newPassword" autoComplete="off">
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
                  <Field name="confirmNewPassword" autoComplete="off">
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
                    Zapisz
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
  changePassword: (data) => dispatch(changePassword(data)),
});

export default connect(null, mapDispatchToProps)(PasswdChangeModal);
