import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Well from '../components/Well';
import WellDataModal from '../components/WellDataModal'; 

export default function WellPlateModal96(props) {
    const [wellsData, setWellsData] = useState(Array(96).fill(null));
    const [showWellDataModal, setShowWellDataModal] = useState(false);
    const [selectedWellIndex, setSelectedWellIndex] = useState(null);

    useEffect(() => {
        if (props.plateinformation && props.plateinformation.wells) {
            setWellsData(props.plateinformation.wells);
        }
    }, [props.plateinformation]);

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

    const handleWellDataClear = () => {
      setWellsData(Array(96).fill(null))
    };

    const handleWellDataDelete = async (plateId) => {
        try {
          const response = await axios.delete(`https://assay-plate-editor.onrender.com/delete-assay-plate/${plateId}`);
          console.log('Response:', response.data);
          window.location.reload(); // Reload the page after a successful save
        } catch (error) {
          console.error('Error:', error.response ? error.response.data : error.message);
        }
      }

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

    const onSave = async (wellData, plateID) => {
      console.log(wellData)
      axios.post('https://assay-plate-editor.onrender.com/update-or-add-assay-plate', {
        id: plateID,
        wells: wellData
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
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit 96 Well Plate
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="plate">
              {renderWells()}
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
             <Button variant="danger" onClick={() => {handleWellDataDelete(props.plateinformation.id); props.onHide()}}>Delete</Button>
              <div>
                  <Button className= "me-2" onClick={() => {
                    onSave(wellsData, props.plateinformation.id ); 
                    props.onHide();
                    handleWellDataClear();
                  }}>
                    Save
                  </Button>
                  <Button onClick={props.onHide}>Close</Button>
              </div>
          </Modal.Footer>
        </Modal>
        <WellDataModal
          show={showWellDataModal}
          onHide={() => setShowWellDataModal(false)}
          onSave={handleWellDataSave}
          initialData={selectedWellIndex !== null ? wellsData[selectedWellIndex] : null}
        />
      </>
    );
}
