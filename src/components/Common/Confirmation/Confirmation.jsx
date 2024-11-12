
import React from 'react';
import { Link } from 'react-router-dom';
import "./Confirmation.css";

function Confirmation() {
  return (
    <div className="confirmation-container">
      <h2>¡Compra Exitosa!</h2>
      <p>Gracias por tu compra. Los detalles de tu compra han sido registrados exitosamente.</p>
      <Link to="/cursos" className="bn btn-primary">Volver a los Cursos</Link>
    </div>
  );
}

export default Confirmation;
