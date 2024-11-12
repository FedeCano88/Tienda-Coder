import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onShowCourses, onShowRegister, cartItemCount, toggleCart, loggedInUser }) { // Agregamos loggedInUser
  return (
    <nav className="navbar navbar-expand-lg navbar-dark flex-column">
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '200px' }}>
        <Link to="/">
          <img src="./Logo.png" alt="Tienda Coder Logo" height="100" className="mb-2" />
        </Link>
        <h1 className="text-center" style={{ fontSize: "2.5rem", color: "#ffffff" }}>Tienda Coder</h1>
      </div>
      <div className="navbar-nav d-flex justify-content-center w-100 mt-4">
        <Link className="nav-link mx-3" to="/" onClick={onShowCourses}>Home</Link>
        <Link className="nav-link mx-3" to="/cursos" onClick={onShowCourses}>Cursos</Link>
        <Link className="nav-link mx-3" to="/login" onClick={onShowRegister}>Login/Registro</Link>
        <button className="nav-link mx-3 position-relative btn btn-link" onClick={toggleCart}>
          <i className="fas fa-shopping-cart"></i> Carrito ({cartItemCount})
        </button>
        {loggedInUser && (
          <Link to="/perfil" className="user-profile-link mx-3 nav-link">Perfil</Link> // Enlace al perfil, visible solo si loggedInUser está definido
        )}
      </div>
    </nav>
  );
}

export default Navbar;








