import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Navbar from "./components/Layouts/Navbar/Navbar";
import Footer from "./components/Layouts/Footer/Footer";
import AuthForm from "./components/Common/AuthForm/AuthForm";
import Cart from "./components/Common/Cart/Cart";
import Confirmation from "./components/Common/Confirmation/Confirmation";
import UserPanel from "./components/Pages/UserPanel";
import Home from "./components/Pages/Home";
import Courses from "./components/Pages/Courses";
import CourseCard from "./components/Common/CourseCard/CourseCard"; // Import CourseCard here if needed
import Swal from "sweetalert2";

Modal.setAppElement("#root");

function App() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const handleLogin = (name) => {
    setLoggedInUser(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
    setCart([]);
  };

  const addToCart = (course) => {
    if (!loggedInUser) {
      Swal.fire({
        title: "Debes registrarte",
        text: "No puedes comprar cursos sin estar registrado",
        icon: "warning",
        confirmButtonText: "Registrarse",
      });
    } else {
      setCart([...cart, course]);
      Swal.fire("Curso añadido al carrito", `${course.title} ha sido añadido al carrito`, "success");
    }
  };

  const toggleCard = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    Swal.fire("Curso eliminado", "El curso ha sido eliminado del carrito", "info");
  };

  const handlePurchase = () => {
    const storedUser = JSON.parse(localStorage.getItem("appUserData"));
    const purchase = {
      items: cart,
      date: new Date().toLocaleString(),
    };

    const purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || {};
    purchaseHistory[storedUser.email] = purchaseHistory[storedUser.email] || [];
    purchaseHistory[storedUser.email].push(purchase);

    localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));

    Swal.fire("Compra realizada", "¡Gracias por tu compra!", "success").then(() => {
      setCart([]);
      navigate("/confirmation");
    });
    setShowCartModal(false);
  };

  return (
    <div>
      <Navbar cartItemCount={cart.length} toggleCart={() => setShowCartModal(true)} loggedInUser={loggedInUser} />
      {loggedInUser && (
        <div className="text-center mt-3">
          <h3>Bienvenido, {loggedInUser}</h3>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cursos" element={<Courses onAddToCart={addToCart} toggleCard={toggleCard} activeCard={activeCard} />} />
        <Route path="/cursos/:courseId" element={<CourseCard onAddToCart={addToCart} />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/perfil" element={<UserPanel />} />
        <Route path="/registrar" element={<AuthForm onLogin={handleLogin} />} />
        <Route path="/login" element={<AuthForm onLogin={handleLogin} />} />
        <Route path="/carrito" element={<Cart cartItems={cart} onRemoveItem={removeFromCart} onPurchase={handlePurchase} />} />
      </Routes>

      <Footer />

      <Modal
        isOpen={showCartModal}
        onRequestClose={() => setShowCartModal(false)}
        contentLabel="Carrito de Compras"
        overlayClassName="cart-modal-overlay"
        className="cart-modal-content"
      >
        <Cart cartItems={cart} onRemoveItem={removeFromCart} onPurchase={handlePurchase} />
        <button onClick={() => setShowCartModal(false)} className="btn btn-secondary mt-3 w-100">
          Cerrar
        </button>
      </Modal>
    </div>
  );
}

export default App;

