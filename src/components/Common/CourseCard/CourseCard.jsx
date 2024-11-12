import React from "react";
import "./CourseCard.css";

function CourseCard({ title, description, price, image, onAddToCart, details, isActive, toggleCard }) {
  const course = { title, price };

  return (
    <div className="col-md-4 d-flex justify-content-center">
      <div className="card mb-4" style={{ width: "18rem" }}>
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><strong>${price}</strong> USD</p>
          <button className="btn btn-primary" onClick={() => onAddToCart(course)}>Comprar</button>
          <button className="btn btn-secondary btn-sm" onClick={toggleCard}>
            {isActive ? "Ocultar información" : "Más información"}
          </button>
          {isActive && <div className="course-details mt-3"><p>{details}</p></div>}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;



