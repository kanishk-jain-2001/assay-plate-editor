import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App () {
  return (
    <>
      <Container className='text-center align-middle'>
        <div> Assay Plate Editor Application </div>
        <Button variant="primary"> Add a 96 Well Plate </Button>
        <Button variant="primary"> Add a 384 Well Plate </Button>
     </Container>
    </>
  )
};