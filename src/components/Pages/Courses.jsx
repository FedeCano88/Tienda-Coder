import React from 'react';
import CourseList from '../Common/CourseList/CourseList';

function Courses({ onAddToCart, toggleCard, activeCard }) {
  return (
    <div>
      <h1>Cursos Disponibles</h1>
      <CourseList onAddToCart={onAddToCart} toggleCard={toggleCard} activeCard={activeCard} />
    </div>
  );
}

export default Courses;
