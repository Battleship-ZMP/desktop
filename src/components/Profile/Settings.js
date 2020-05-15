import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdbreact";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import PasswdChangeModal from "./PasswdChangeModal";
import { updateProfile } from "../../store/actions/profileActions";
import PropTypes from "prop-types";

const profileSchema = Yup.object().shape({
  userName: Yup.string().required("The username is required"),
  bio: Yup.string().max(255, "Bio must contain less than 255 characters"),
});

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
    this.onDrop = (files) => {
      files.map((file) => {
        Object.assign(file, { preview: URL.createObjectURL(file) });
      });
      this.setState({ files });
    };
  }

  static get propTypes() {
    return {
      updateProfile: PropTypes.func,
      profile: PropTypes.object,
    };
  }
  //
  //TODO submit from outside
  //
  render() {
    return (
      <MDBContainer fluid className="p-4">
        <MDBCard>
          <MDBCardHeader color="teal" className="teal">
            <MDBCardTitle className="text-white">
              Ustawienia profilu
            </MDBCardTitle>
          </MDBCardHeader>
          <Formik
            initialValues={{
              userName: this.props.profile.userName,
              bio: this.props.profile.bio
                ? this.props.profile.bio
                : "Moja biografia!",
            }}
            validationSchema={profileSchema}
            onSubmit={(profile, { setSubmitting }) => {
              this.props.updateProfile(profile);
            }}
          >
            {({ isSubmitting, isValid, values }) => (
              <Form>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="8">
                      <Field name="userName">
                        {({ field, form, meta }) => (
                          <div>
                            <MDBInput
                              containerClass="mb-0 pb-0"
                              type="text"
                              label="Nazwa uzytkownika"
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
                      <Field name="bio">
                        {({ field, form, meta }) => (
                          <div>
                            <MDBInput
                              containerClass="mb-0 pb-0"
                              type="text"
                              label="Biografia"
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
                    <MDBCol md="4" className="d-flex">
                      <Dropzone
                        onDrop={this.onDrop}
                        multiple={false}
                        accept="image/*"
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section className="d-flex flex-1">
                            {this.state.files.length > 0 ? (
                              <img
                                className="img-fluid"
                                src={this.state.files[0].preview}
                                alt={"Uploaded img"}
                              />
                            ) : (
                              <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                <p>
                                  Drag 'n' drop some files here, or click to
                                  select files
                                </p>
                                <MDBIcon icon="cloud-upload-alt" />
                              </div>
                            )}
                          </section>
                        )}
                      </Dropzone>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
                <MDBCardFooter className="d-flex">
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
          <PasswdChangeModal />
        </MDBCard>
      </MDBContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (profile) => dispatch(updateProfile(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
