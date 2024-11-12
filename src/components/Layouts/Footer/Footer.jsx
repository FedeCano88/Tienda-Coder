import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="text-center mt-5 p-4">
      &copy; {new Date().getFullYear()} Tienda Coder. Todos los derechos reservados.
    </footer>
  );
}

export default Footer;
