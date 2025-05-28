import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Modal, Nav, Form } from 'react-bootstrap';


const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, role, login, logout } = useAuth();

  const navigate = useNavigate();


  console.log("Autenticado:", isAuthenticated);
  console.log("Rol actual:", role);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const handleLogin = () => {
    if (login(username, password)) {
      handleLoginClose();
    } else {
      alert("Credenciales inválidas");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">LAS JOYAS DEL MAGO </Link>
               
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"> </span>
        </button>
        

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Nav className="me-auto mb-2 mb-lg-0">
           <>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/coleccion">Colección</Nav.Link>
          </>
           
            {isAuthenticated && (
            <>
              {role === "admin" ? (
                <>
                  <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
                  <Nav.Link as={Link} to="/carrito"><i className="bi bi-cart4" style={{ fontSize: "1.1rem" }}></i></Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/">Home</Nav.Link>
              )}
              
              {role === "user" && (
                <>
                  <Nav.Link as={Link} to="/coleccion">Colección</Nav.Link>
                </>
              )}
            </>
          )}

          </Nav>

          <div className="d-flex">
            {!isAuthenticated && (
              <Button variant="outline-primary" onClick={handleLoginShow}>
                Login
              </Button>
            )}
            {isAuthenticated && (
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>


    <Modal show={showLogin} onHide={handleLoginClose}>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleLoginClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default Navbar;