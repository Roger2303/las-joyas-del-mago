import React from "react";
import { useCart } from "../../context/CartContext";
import { Button, ListGroup, Container } from "react-bootstrap";

const Carrito = () => {
  const { cart, dispatch } = useCart();

  const handleClear = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price ?? 1000), 0);

  const formatPrice = (price) =>
    `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

  return (
    <div
      style={{
        backgroundImage:
          "url('https://r.testifier.nl/Acbs8526SDKI/resizing_type:fill/watermark:Mikko%20Saari/plain/https%3A%2F%2Fs3-newsifier.ams3.digitaloceanspaces.com%2Fxgn.nl%2Fimages%2F2024-05%2Fmagic-the-gathering-664233f6ab2d9.jpg@webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        width: "66.6vw",      // Dos tercios del ancho de la pantalla
        height: "100vh",

        marginLeft: "auto",   // Centrado horizontal
        marginRight: "auto",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      <Container
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "30px",
          borderRadius: "12px",
          border: "2px solid #333",
          maxWidth: "600px",
          width: "100%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          boxSizing: "border-box",
        }}
      >
        <h2 className="text-center mb-4">🛒 Tu Carrito</h2>

        {cart.length === 0 ? (
          <p className="text-center">El carrito está vacío</p>
        ) : (
          <>
            <ListGroup>
              {cart.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    border: "2px solid #666",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <div>
                    <strong>{item.name}</strong>
                    <div style={{ fontSize: "0.9rem", color: "#555" }}>
                      {formatPrice(item.price ?? 1000)}
                    </div>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: index })
                    }
                  >
                    Eliminar
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <h4 className="mt-3 text-end">
              Total: <strong>{formatPrice(totalPrice)}</strong>
            </h4>

            <Button className="mt-3 w-100" variant="success" onClick={handleClear}>
              Comprar y vaciar carrito
            </Button>
          </>
        )}
      </Container>
    </div>
  );
};

export default Carrito;
