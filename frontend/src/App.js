import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import WellPlateModal96 from './WellPlateModal96';
import 'bootstrap/dist/css/bootstrap.min.css';


function WellPlateModal384(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Configure 384 Well Plate
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      
      </Modal.Body>
      <Modal.Footer>
        <Button>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function App () {

  const [modalShow96, setModalShow96] = useState(false);
  const [modalShow384, setModalShow384] = useState(false);

  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "85vh" }}>
          <h1> Assay Plate Editor Application </h1>
          <div className="d-flex flex-row justify-content-center align-items-center">
              <Button variant="info" className = "me-2" onClick={() => setModalShow96(true)}> Add a 96 Well Plate </Button>
              <Button variant="info" onClick={() => setModalShow384(true)}> Add a 384 Well Plate </Button>
          </div>
          <h5 className="mt-2"> Previously Configured Assay Plates: </h5>
      </Container>

     <WellPlateModal96
        show={modalShow96}
        onHide={() => setModalShow96(false)}
      />

      <WellPlateModal384
        show={modalShow384}
        onHide={() => setModalShow384(false)}
      />

    </>
  )
};