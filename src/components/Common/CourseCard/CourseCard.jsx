import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseCard.css";

const courses = [
  {
    id: 1,
    title: "Desarrollo Web",
    slug: "desarrollo-web",
    description: "Aprende a desarrollar sitios web completos",
    price: 100,
    image: "/desarrollo-web.jpg",
    details: "En este curso aprenderás a construir sitios web desde cero utilizando HTML, CSS y JavaScript.",
  },
  {
    id: 2,
    title: "Programación Backend",
    slug: "programacion-backend",
    description: "Domina la programación del lado del servidor",
    price: 120,
    image: "/backend.jpg",
    details: "En este curso aprenderás a construir aplicaciones del lado del servidor utilizando Node.js.",
  },
  {
    id: 3,
    title: "SQL",
    slug: "sql",
    description: "Manejo y gestión de bases de datos con SQL",
    price: 80,
    image: "/sql.jpg",
    details: "Este curso te enseña a gestionar bases de datos relacionales utilizando SQL.",
  },
  {
    id: 4,
    title: "Testing QA Manual",
    slug: "testing-qa-manual",
    description: "Domina el testing manual de aplicaciones",
    price: 90,
    image: "/testingqa.jpg",
    details: "Aprenderás las mejores prácticas para realizar pruebas manuales de software.",
  },
  {
    id: 5,
    title: "Cloud Computing (AWS)",
    slug: "cloud-computing-aws",
    description: "Aprende a trabajar con AWS y la nube",
    price: 150,
    image: "/cloud.jpg",
    details: "Este curso te enseña a utilizar los servicios en la nube de AWS.",
  },
];

function CourseCard({ onAddToCart }) {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const selectedCourse = courses.find((c) => c.slug === slug);
    setCourse(selectedCourse);
  }, [slug]);

  if (!course) return <p>Cargando curso...</p>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={course.image} className="img-fluid" alt={course.title} style={{ maxWidth: "100%", borderRadius: "10px" }} />
        </div>
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






