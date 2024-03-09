import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import WellPlateModal96 from './pages/WellPlateModal96';
import WellPlateModal96Edit from './pages/WellPlateModal96Edit';
import WellPlateModal384 from './pages/WellPlateModal384';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 



export default function App () {

  const [modalShow96, setModalShow96] = useState(false);
  const [modalShow96Edit, setModalShow96Edit] = useState(false);
  const [plate96Info, setPlate96Info] = useState([]);

  const [modalShow384, setModalShow384] = useState(false);

  const [configuredPlates, setConfiguredPlates] = useState([]);

  
   useEffect(() => {
    axios.get('https://assay-plate-editor.onrender.com/view-assay-plates')
      .then(response => {
        setConfiguredPlates(response.data);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, [modalShow96, modalShow96Edit]); 


  const handleCardClick = (plate) => {
    if (plate.type === 96){
      setPlate96Info(plate)
      setModalShow96Edit(true)
    }
  };

  const handleSave96 = (data) => {
    axios.post('https://assay-plate-editor.onrender.com/update-or-add-assay-plate', {
      type: 96,
      wells: data
    })
    .then(response => {
      console.log('Data successfully sent to the backend', response);
      window.location.reload(); // Reload the page after a successful save
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
          <h5 className="mt-3"> Previously Configured Assay Plates: </h5>
          <p> (This is currently hosted on a free backend service so you may need to save a plate and hit refresh a few times to 'kickstart' the service provider) </p>
          <div className="d-flex flex-wrap justify-content-center align-items-center mt-3">
          {configuredPlates.map(plate => (
            <Card 
              key={plate.id} 
              onClick={() => handleCardClick(plate)} 
              style={{ width: '18rem', cursor: 'pointer', margin: '10px' }}
            >
              <Card.Body>
                <Card.Title>Plate ID: {plate.id}</Card.Title>
                <Card.Text>Type: {plate.type} Well Plate</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>

     <WellPlateModal96
        show={modalShow96}
        onHide={() => setModalShow96(false)}
        onSave={handleSave96}
      />

      <WellPlateModal96Edit
        show={modalShow96Edit}
        onHide={() => setModalShow96Edit(false)}
        plateinformation={plate96Info}
      />

      <WellPlateModal384
        show={modalShow384}
        onHide={() => setModalShow384(false)}
      />

    </>
  )
};