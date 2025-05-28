import React, { useEffect, useState } from "react";
import CartaMagic from "../../components/card/Card";
import "./coleccion.css";
import Loading from "../../components/loading/Loading";

const Coleccion = () => {
  const [cartas, setCartas] = useState([]);

  useEffect(() => {
    fetch("https://api.magicthegathering.io/v1/cards")
      .then((res => res.json()))
      .then((data => {setCartas(data.cards)}))
      .catch((error => console.error(error)));
  }, []);
  return (
    <>
      <h1>Encuentra tu coleccion</h1>
      <div className="container">
        {cartas.length === 0 ? (<Loading />) : (cartas.map((carta, index) => (<CartaMagic
        key={index} 
        img={carta.imageUrl || "https://via.placeholder.com/223x310?text=Sin+imagen"}
        titulo={carta.name}
        desc={carta.text || "Sin descripción"}
        action="Comprar"
        />)))}
       
      </div>
    </>
  );
};

export default Coleccion;
