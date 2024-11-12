import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CourseList.css";

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

function CourseList({ onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedCourses, setSortedCourses] = useState(courses);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredCourses = courses.filter(
      (course) =>
        course.id.toString().includes(term) || 
        course.categoria.toLowerCase().includes(term) || 
        course.title.toLowerCase().includes(term)
    );
    setSortedCourses(filteredCourses);
  };

  const sortAscending = () => {
    const sorted = [...sortedCourses].sort((a, b) => a.price - b.price);
    setSortedCourses(sorted);
  };

  const sortDescending = () => {
    const sorted = [...sortedCourses].sort((a, b) => b.price - a.price);
    setSortedCourses(sorted);
  };

  const handleMoreDetails = (courseSlug) => {
    navigate(`/cursos/${courseSlug}`);
  };

  return (
    <div className="course-list-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Buscar por ID, título o categoría..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="sort-buttons">
        <button className="sort-btn" onClick={sortAscending}>
          Ordenar por Precio (Menor a Mayor)
        </button>
        <button className="sort-btn" onClick={sortDescending}>
          Ordenar por Precio (Mayor a Menor)
        </button>
      </div>
      <div className="course-list row justify-content-center">
        {sortedCourses.map((course) => (
          <div key={course.id} className="col-md-4 d-flex justify-content-center">
            <div className="card mb-4" style={{ width: "18rem" }}>
              <img src={course.image} className="card-img-top" alt={course.title} />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p className="card-text"><strong>${course.price}</strong> USD</p>
                <button className="btn btn-primary mb-2" onClick={() => onAddToCart(course)}>Comprar</button>
                <button className="btn btn-secondary" onClick={() => handleMoreDetails(course.slug)}>
                  Más detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;





