import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const WellDataModal = ({ show, onHide, onSave, initialData }) => {
  const [data, setData] = useState(initialData || { reagent: '', antibody: '', concentration: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Well</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>Reagent:</label>
            <input
              type="text"
              name="reagent"
              value={data.reagent}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Antibody:</label>
            <input
              type="text"
              name="antibody"
              value={data.antibody}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Concentration:</label>
            <input
              type="text"
              name="concentration"
              value={data.concentration}
              onChange={handleChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onSave(data)}>Save</Button>
        <Button onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WellDataModal;
