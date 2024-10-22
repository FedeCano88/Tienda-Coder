import React from "react";

function Navbar({ onShowCourses, onShowRegister, cartItemCount, toggleCart, loggedInUser, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark flex-column">
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '200px' }}>
        <img src="./Logo.png" alt="Tienda Coder Logo" height="100" className="mb-2" />
        <h1 className="text-center" style={{ fontSize: "2.5rem", color: "#ffffff" }}>Tienda Coder</h1>
      </div>

      <div className="navbar-nav d-flex justify-content-center w-100 mt-4">
      <button className="nav-link btn-link" onClick={onShowCourses}>Cursos</button>
<button className="nav-link btn-link" onClick={onShowRegister}>Login/Registro</button>
<button className="nav-link btn-link position-relative" onClick={toggleCart}>
  <i className="fas fa-shopping-cart"></i> Carrito ({cartItemCount})
</button>
        {loggedInUser && (
          <button className="btn btn-secondary" onClick={onLogout}>Logout ({loggedInUser})</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;







