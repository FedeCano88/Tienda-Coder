import React from "react";
import "./Home.css"; // Asegúrate de crear y vincular este archivo CSS

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Bienvenido a Tienda Coder</h1>
          <p>Explora nuestros cursos de desarrollo web y lleva tus habilidades al siguiente nivel.</p>
          <a href="/cursos" className="btn-primary">Ver Cursos</a>
        </div>
      </header>

      <section className="courses-section">
        <h2>Nuestros Cursos Destacados</h2>
        <div className="courses-grid">
          <div className="course-card">
            <img src="./desarrollo-web.jpg" alt="Curso de HTML y CSS" />
            <h3>HTML y CSS</h3>
            <p>Aprende los fundamentos de HTML y CSS para crear sitios web básicos y atractivos.</p>
          </div>
          <div className="course-card">
            <img src="./backend.jpg" alt="Backend" />
            <h3>Backend</h3>
            <p>En este curso aprenderás a construir aplicaciones del lado del servidor utilizando Node.js.</p>
          </div>
          <div className="course-card">
            <img src="./sql.jpg" alt="SQL" />
            <h3>SQL</h3>
            <p>Este curso te enseña a gestionar bases de datos relacionales utilizando SQL.</p>
          </div>
        </div>
      </section>
      
      <section className="about-section">
        <h2>¿Por qué elegir Tienda Coder?</h2>
        <p>En Tienda Coder, ofrecemos cursos de alta calidad enfocados en el desarrollo web. Nuestros cursos están diseñados para ayudarte a alcanzar tus metas profesionales con conocimientos actualizados y prácticos.</p>
      </section>
    </div>
  );
}

export default Home;
