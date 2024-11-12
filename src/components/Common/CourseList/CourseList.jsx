import React, { useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import "./CourseList.css";

// Lista de cursos con ID y Categoría añadidos
const courses = [
  {
    id: 1,
    title: "Desarrollo Web",
    description: "Aprende a desarrollar sitios web completos",
    price: 100,
    image: "./desarrollo-web.jpg",
    details: "En este curso aprenderás a construir sitios web desde cero utilizando HTML, CSS y JavaScript.",
    categoria: "Desarrollo Web",
  },
  {
    id: 2,
    title: "Programación Backend",
    description: "Domina la programación del lado del servidor",
    price: 120,
    image: "./backend.jpg",
    details: "En este curso aprenderás a construir aplicaciones del lado del servidor utilizando Node.js.",
    categoria: "Backend",
  },
  {
    id: 3,
    title: "SQL",
    description: "Manejo y gestión de bases de datos con SQL",
    price: 80,
    image: "./sql.jpg",
    details: "Este curso te enseña a gestionar bases de datos relacionales utilizando SQL.",
    categoria: "Bases de Datos",
  },
  {
    id: 4,
    title: "Testing QA Manual",
    description: "Domina el testing manual de aplicaciones",
    price: 90,
    image: "./testingqa.jpg",
    details: "Aprenderás las mejores prácticas para realizar pruebas manuales de software.",
    categoria: "Calidad y Testing",
  },
  {
    id: 5,
    title: "Cloud Computing (AWS)",
    description: "Aprende a trabajar con AWS y la nube",
    price: 150,
    image: "./cloud.jpg",
    details: "Este curso te enseña a utilizar los servicios en la nube de AWS.",
    categoria: "Cloud Computing",
  },
];

function CourseList({ onAddToCart, activeCard, toggleCard }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedCourses, setSortedCourses] = useState(courses);

  // Maneja los cambios en la barra de búsqueda
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

  // Ordena los cursos por precio de menor a mayor
  const sortAscending = () => {
    const sorted = [...sortedCourses].sort((a, b) => a.price - b.price);
    setSortedCourses(sorted);
  };

  // Ordena los cursos por precio de mayor a menor
  const sortDescending = () => {
    const sorted = [...sortedCourses].sort((a, b) => b.price - a.price);
    setSortedCourses(sorted);
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
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            price={course.price}
            image={course.image}
            details={course.details}
            categoria={course.categoria}
            onAddToCart={() => onAddToCart(course)}
            isActive={activeCard === course.id}
            toggleCard={() => toggleCard(course.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default CourseList;


