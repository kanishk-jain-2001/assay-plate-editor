import Well from './Well';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function WellPlateModal96(props) {

    const [wellsData, setWellsData] = useState(Array(96).fill(null));
  
    const handleWellClick = (index) => {
      // Open a form/modal to edit well data and then update wellsData state
    };
  
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
            Configure 96 Well Plate
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="plate">
            {wellsData.map((wellData, index) => (
              <Well key={index} onClick={() => handleWellClick(index)} wellData={wellData} />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            props.onSave(wellsData); // Optionally pass the wells data back to the parent component
            props.onHide();
          }}>
            Save
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }