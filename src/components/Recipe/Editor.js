import React, { Component } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody, MDBCardFooter,
  MDBCardHeader,
  MDBCardTitle,
  MDBCol,
  MDBContainer, MDBFooter,
  MDBIcon,
  MDBInput,
  MDBRow
} from "mdbreact";

class Editor extends Component {
  render() {
    return (
      <MDBContainer fluid className="p-4">
        <MDBCard>
          <MDBCardHeader color="teal" className="teal">
            <MDBCardTitle className="text-white">Dodaj przepis!</MDBCardTitle>
          </MDBCardHeader>
          <MDBCardBody className="">
            <form>
              <MDBRow>
                <MDBCol md="8">
                  <MDBInput label="Tytuł"/>
                  <MDBInput label="Opis"/>
                  <MDBInput label="Składniki"/>
                  <MDBInput label="Przepis"/>
                </MDBCol>
                <MDBCol md="4">
                  {/*TODO adding photo */}
                  <MDBInput label="Zdjęcie" icon="camera"/>
                </MDBCol>
              </MDBRow>
            </form>
          </MDBCardBody>
          <MDBCardFooter>
            <MDBBtn color="teal" className="text-white">Wyślij</MDBBtn>
          </MDBCardFooter>
        </MDBCard>
      </MDBContainer>
    );
  }
}

export default Editor;
