import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Well from './Well';
import WellDataModal from './WellDataModal'; // Import the WellDataModal component

export default function WellPlateModal96(props) {
    const [wellsData, setWellsData] = useState(Array(96).fill(null));
    const [showWellDataModal, setShowWellDataModal] = useState(false);
    const [selectedWellIndex, setSelectedWellIndex] = useState(null);

    const handleWellClick = (index) => {
      setSelectedWellIndex(index);
      setShowWellDataModal(true);
    };

    const handleWellDataSave = (updatedWellData) => {
      const updatedWellsData = [...wellsData];
      updatedWellsData[selectedWellIndex] = updatedWellData;
      setWellsData(updatedWellsData);
      setShowWellDataModal(false);
    };

    const renderWells = () => {
      let wells = [];
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 12; j++) {
          let index = i * 12 + j;
          wells.push(
            <Well 
              key={index} 
              onClick={() => handleWellClick(index)} 
              wellData={wellsData[index]} 
            />
          );
        }
      }
      return wells;
    };

    return (
      <>
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
            <div className="plate" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}>
              {renderWells()}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {
              props.onSave(wellsData); 
              props.onHide();
            }}>
              Save
            </Button>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* WellDataModal for editing well data */}
        <WellDataModal
          show={showWellDataModal}
          onHide={() => setShowWellDataModal(false)}
          onSave={handleWellDataSave}
          wellData={selectedWellIndex !== null ? wellsData[selectedWellIndex] : null}
        />
      </>
    );
}
