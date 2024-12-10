import React from "react";
import { useParams } from "react-router-dom";
import "./CourseDetails.css"; // Asegúrate de que el CSS esté en la misma carpeta

const courses = [
  {
    id: 1,
    title: "Desarrollo Web",
    slug: "desarrollo-web",
    description: "Aprende a desarrollar sitios web completos",
    price: 100,
    image: "/desarrollo-web.jpg",
    details: "En este curso aprenderás a construir sitios web desde cero utilizando HTML, CSS y JavaScript.",
    categoria: "Desarrollo Web",
  },
  {
    id: 2,
    title: "Programación Backend",
    slug: "programacion-backend",
    description: "Domina la programación del lado del servidor",
    price: 120,
    image: "/backend.jpg",
    details: "En este curso aprenderás a construir aplicaciones del lado del servidor utilizando Node.js.",
    categoria: "Backend",
  },
  {
    id: 3,
    title: "SQL",
    slug: "sql",
    description: "Manejo y gestión de bases de datos con SQL",
    price: 80,
    image: "/sql.jpg",
    details: "Este curso te enseña a gestionar bases de datos relacionales utilizando SQL.",
    categoria: "Bases de Datos",
  },
  {
    id: 4,
    title: "Testing QA Manual",
    slug: "testing-qa-manual",
    description: "Domina el testing manual de aplicaciones",
    price: 90,
    image: "/testingqa.jpg",
    details: "Aprenderás las mejores prácticas para realizar pruebas manuales de software.",
    categoria: "Calidad y Testing",
  },
  {
    id: 5,
    title: "Cloud Computing (AWS)",
    slug: "cloud-computing-aws",
    description: "Aprende a trabajar con AWS y la nube",
    price: 150,
    image: "/cloud.jpg",
    details: "Este curso te enseña a utilizar los servicios en la nube de AWS.",
    categoria: "Cloud Computing",
  },
];

function CourseDetails() {
  const { slug } = useParams(); // Captura el slug desde la URL
  const course = courses.find((course) => course.slug === slug); // Encuentra el curso por su slug

  if (!course) {
    return <p>Curso no encontrado.</p>;
  }

  return (
    <div className="course-details-container">
      <img
        src={course.image}
        alt={course.title}
        className="course-details-image"
      />
      <h1 className="course-details-title">{course.title}</h1>
      <p className="course-details-description">{course.details}</p>
      <p className="course-details-price">Precio: ${course.price} USD</p>
      <p className="course-details-category">Categoría: {course.categoria}</p>
    </div>
  );
}

export default CourseDetails;

