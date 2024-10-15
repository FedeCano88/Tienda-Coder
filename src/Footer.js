import React from "react";

function Footer() {
  return (
    <footer className="text-center mt-5 p-4" style={{ backgroundColor: "#1f1b2e", color: "#90859b" }}>
      &copy; {new Date().getFullYear()} Tienda Coder. Todos los derechos reservados.
    </footer>
  );
}

export default Footer;