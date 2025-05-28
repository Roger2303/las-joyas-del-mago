import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function CartaMagic({img, titulo, desc, action}) {
  return (
    <Card style={{ width: '18rem', border:"4 black" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title> {titulo} </Card.Title>
        <Card.Text>
        {desc}       
        </Card.Text>
        <div><span> <strong> Precio: </strong> $1000 </span></div>
         <Button as={Link} to="/carrito" variant="dark" className="w-100">
          Comprar
        </Button>
      </Card.Body>
    </Card>
  );
}
 
export default CartaMagic;
