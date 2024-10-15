import React from "react";
import CourseCard from "./CourseCard";

function CourseList({ addToCart }) {
  const courses = [
    { title: "Desarrollo Web", description: "Aprende a desarrollar sitios web completos", price: 100, image: "./desarrollo-web.jpg", details: "Curso de HTML, CSS y JavaScript" },
    { title: "Programación Backend", description: "Domina la programación del lado del servidor", price: 120, image: "./backend.jpg", details: "Curso de Node.js" },
    { title: "SQL", description: "Manejo y gestión de bases de datos con SQL", price: 80, image: "./sql.jpg", details: "Curso de SQL" },
    { title: "Testing QA Manual", description: "Domina el testing manual de aplicaciones", price: 90, image: "./testingqa.jpg", details: "Curso de QA manual" },
    { title: "Cloud Computing (AWS)", description: "Aprende a trabajar con AWS y la nube", price: 150, image: "./cloud.jpg", details: "Curso de AWS" },
  ];

  return (
    <div className="row">
      {courses.map((course, index) => (
        <CourseCard
          key={index}
          title={course.title}
          description={course.description}
          price={course.price}
          image={course.image}
          details={course.details}
          onAddToCart={() => addToCart(course)}
        />
      ))}
    </div>
  );
}

export default CourseList;
