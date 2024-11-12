import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseCard.css";

const courses = [
  {
    id: 1,
    title: "Desarrollo Web",
    description: "Aprende a desarrollar sitios web completos",
    price: 100,
    image: "../desarrollo-web.jpg",
    details: "En este curso aprenderás a construir sitios web desde cero utilizando HTML, CSS y JavaScript. Este curso está diseñado para principiantes y avanzados que quieran mejorar sus habilidades en desarrollo web y aprender las mejores prácticas.",
  },
  {
    id: 2,
    title: "Programación Backend",
    description: "Domina la programación del lado del servidor",
    price: 120,
    image: "../backend.jpg",
    details: "En este curso aprenderás a construir aplicaciones del lado del servidor utilizando Node.js. Aprenderás sobre bases de datos, autenticación, manejo de sesiones y más, para construir aplicaciones escalables.",
  },
  {
    id: 3,
    title: "SQL",
    description: "Manejo y gestión de bases de datos con SQL",
    price: 80,
    image: "../sql.jpg",
    details: "Este curso te enseña a gestionar bases de datos relacionales utilizando SQL. Aprenderás sobre consultas, gestión de datos, optimización de rendimiento y cómo aplicar SQL en escenarios del mundo real.",
  },
  {
    id: 4,
    title: "Testing QA Manual",
    description: "Domina el testing manual de aplicaciones",
    price: 90,
    image: "../testingqa.jpg",
    details: "Aprenderás las mejores prácticas para realizar pruebas manuales de software. Este curso cubre desde conceptos básicos de QA hasta técnicas avanzadas de testing.",
  },
  {
    id: 5,
    title: "Cloud Computing (AWS)",
    description: "Aprende a trabajar con AWS y la nube",
    price: 150,
    image: "../cloud.jpg",
    details: "Este curso te enseña a utilizar los servicios en la nube de AWS. Aprenderás sobre almacenamiento en la nube, bases de datos, redes, y cómo implementar aplicaciones escalables y seguras en AWS.",
  },
];

function CourseCard({ onAddToCart }) {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const selectedCourse = courses.find((c) => c.id.toString() === courseId);
    setCourse(selectedCourse);
  }, [courseId]);

  if (!course) return <p>Cargando curso...</p>;

  return (
    <div className="container my-5">
      <div className="row">
        {/* Columna de imagen */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={course.image} className="img-fluid" alt={course.title} style={{ maxWidth: "100%", borderRadius: "10px" }} />
        </div>
        {/* Columna de detalles */}
        <div className="col-md-6">
          <h1 className="mb-3">{course.title}</h1>
          <p className="lead">{course.description}</p>
          <p><strong>Precio:</strong> ${course.price} USD</p>
          <button className="btn btn-success mb-3" onClick={() => onAddToCart(course)}>
            Comprar
          </button>
          <h4>Detalles del Curso</h4>
          <p>{course.details}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;





