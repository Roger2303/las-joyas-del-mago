import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap"; // ✅ Agregado

function CartaMagic({ img, titulo, desc, cartaCompleta }) {
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: cartaCompleta });
    navigate("/carrito");
  };

  return (
    <Card style={{ width: '18rem', border: "1px solid black", margin: "1rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{desc}</Card.Text>
        <div><span><strong>Precio:</strong> $1000</span></div>
        <Button
          variant="dark"
          className="w-100"
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CartaMagic;


