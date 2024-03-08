import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import WellPlateModal96 from './pages/WellPlateModal96';
import WellPlateModal384 from './pages/WellPlateModal384';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 



export default function App () {

  const [modalShow96, setModalShow96] = useState(false);
  const [modalShow384, setModalShow384] = useState(false);

  const handleSave96 = (data) => {
    // Send data to backend
    axios.post('http://127.0.0.1:5000/update-or-add-assay-plate', {
      type: "96",
      wells: data
    })
    .then(response => {
      console.log('Data successfully sent to the backend', response);
    })
    .catch(error => {
      console.error('Error sending data to the backend', error);
    });
  };

  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "85vh" }}>
          <h1 className="mb-3"> Assay Plate Editor Application </h1>
          <div className="d-flex flex-row justify-content-center align-items-center">
              <Button variant="info" className = "me-2" onClick={() => setModalShow96(true)}> Add a 96 Well Plate </Button>
              <Button variant="info" onClick={() => setModalShow384(true)}> Add a 384 Well Plate </Button>
          </div>
          <h5 className="mt-3"> Configured Assay Plates: </h5>
      </Container>

     <WellPlateModal96
        show={modalShow96}
        onHide={() => setModalShow96(false)}
        onSave={handleSave96}
      />

      <WellPlateModal384
        show={modalShow384}
        onHide={() => setModalShow384(false)}
      />

    </>
  )
};