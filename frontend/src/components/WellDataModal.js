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
          <div className="row d-flex align-items-center">
            <label className="col-sm-6">Reagent:</label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                name="reagent"
                value={data.reagent}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row d-flex align-items-center">
            <label className="col-sm-6">Antibody:</label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                name="antibody"
                value={data.antibody}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row d-flex align-items-center">
            <label className="col-sm-6">Concentration:</label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                name="concentration"
                value={data.concentration}
                onChange={handleChange}
              />
            </div>
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
