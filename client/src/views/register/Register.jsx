import React, { useState } from "react";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !email || !password) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }
    register();
    
    setMensaje("");
    setNombre("");
    setEmail("");
    setPassword("");
  };


  const register = async () => {
    try {
      const res = await fetch("http://localhost:9000/api/v1/register", {method: "POST", headers: {"Content-Type": "application/json",},
    body: JSON.stringify({name: nombre, email, password}), 
    });

    if (!res.ok) throw new Error("Falló el registro");

    const data = await res.json();
    setMensaje("Usuario registrado con éxito");
    } catch (e) {
      console.error("Error:", e.mensaje);
      setMensaje("Hubo un error a registrar");
    }
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage:
            "url('https://deadline.com/wp-content/uploads/2024/09/MTG-Teaser_8-28-24.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
          opacity: 1,
        }}
      />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="card shadow-sm p-4 w-100"
          style={{ maxWidth: "500px", backgroundColor: "rgba(255, 255, 255, 0.95)" }}
        >
          <h3 className="card-title text-center mb-4">Crear cuenta</h3>
          {mensaje && (
            <div className="alert alert-info" role="alert">
              {mensaje}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre completo
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Crear cuenta
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
