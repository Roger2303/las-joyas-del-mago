import React from "react";
import { useCart } from "../../context/CartContext"; 
import { Button, ListGroup, Container } from "react-bootstrap";

const Carrito = () => {
  const { cart, dispatch } = useCart();

  const handleClear = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <Container className="mt-4">
      <h2>🛒 Tu Carrito</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ListGroup>
            {cart.map((item, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.name}</strong>
                </div>
                <Button
                  variant="danger"
                  onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: index })}
                >
                  Eliminar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button className="mt-3" variant="success" onClick={handleClear}>
            Comprar y vaciar carrito
          </Button>
        </>
      )}
    </Container>
  );
};

export default Carrito;

