import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function WellPlateModal384(props) {
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
        Coming Soon
        </Modal.Body>
        <Modal.Footer>
          <Button>Save</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }