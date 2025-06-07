import React, { useEffect, useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import "./home.css";
import mg1 from "../../assets/img/mg1.png";
import mg2 from "../../assets/img/mg2.png";
import mg3 from "../../assets/img/mg3.png";
import mg4 from "../../assets/img/mg4.png";
import magic1 from "../../assets/img/magic1.png";
import magic2 from "../../assets/img/magic2.png";
import magic3 from "../../assets/img/magic3.png";
import magic4 from "../../assets/img/magic4.png";
import magic5 from "../../assets/img/magic5.png";
import magic6 from "../../assets/img/magic6.png";

const imagenes = {
  mg1,
  mg2,
  mg3,
  mg4
};

const imgs = {
  magic1,
  magic2,
  magic3,
  magic4,
  magic5,
  magic6
};

const Home = () => {
  const [secretLair, setSecretLair] = useState([]);
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch("/data/secret_lair.json")
      .then((res) => res.json())
      .then((data) => setSecretLair(data))
      .catch((err) => console.error("Error al cargar productos:", err));

    fetch("/data/noticias.json")
      .then((res) => res.json())
      .then((data) => setNoticias(data))
      .catch((err) => console.error("Error al cargar noticias:", err));
  }, []);

  return (
    <>
      {/* Carrusel superior */}
      <Carousel />

      {/* Sección tipo Secret Lair */}
        <div className="row">
          {/* Columna de texto */}
          <div className="col-md-4 d-flex flex-column justify-content-center">
            <h5 className="fw-bold">SECRET LAIR</h5>
            <p>
              ¡Ya está aquí Secret Lair para celebrar todo lo que nos gusta de
              Magic! Encuentra cartas con ilustraciones alucinantes, nuevos
              artistas y más. ¡Pero date prisa!
            </p>
            <div className="boton-1"><button className="btn btn-dark w-50 ">HAZ YA TU PEDIDO</button></div>
          </div>

          {/* Carrusel horizontal*/}
          <div className="col-md-8 container-secret-lair">
            <div className="d-flex overflow-auto gap-3">
              {secretLair.map((item, i) => (
                <div
                  key={i}
                  className="card"
                  style={{ minWidth: "200px", maxWidth: "200px" }}
                >
                  <img
                    src={imagenes[item.imagen]}
                    className="card-img-top"
                    alt={`Producto ${i}`}
                  />
                  <div className="card-body">
                    <p className="card-text small">{item.titulo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Sección Noticias */}
<section className="container-blog">
<div className="noticias-grid">
  {noticias.map((noticia, i) => (
    <div className="noticia-card" key={i}>
      <div className="card h-100 shadow-sm">
        <img
          src={imgs[noticia.imagen]}
          alt={`Noticia ${i}`}
          className="card-img-top"
          style={{
            height: "180px",
            objectFit: "cover",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />
        <div className="card-body bg-dark text-white">
          <span className="badge bg-danger mb-2">{noticia.categoria}</span>
          <h5 className="card-title">{noticia.titulo}</h5>
          <p className="card-text small">{noticia.descripcion}</p>
        </div>
        <div className="card-footer bg-secondary text-light small">
          {noticia.autor}
        </div>
      </div>
    </div>
  ))}
</div>
</section>
    </>
  );
};

export default Home;