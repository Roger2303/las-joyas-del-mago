import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <>
    <h2> Cargando cartas... </h2>
      <Spinner animation="border" variant="primary" />
    </>
  );
}

export default Loading;