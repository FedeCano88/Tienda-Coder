import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CourseList from "./CourseList";
import AuthForm from "./AuthForm";
import Footer from "./Footer";
import Cart from "./Cart";
import Swal from 'sweetalert2';
import Container from "./Container"; 

function App() {
  const [showCourses, setShowCourses] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user.name);
    }
  }, []);

  const handleShowCourses = () => setShowCourses(true);
  const handleShowRegister = () => setShowCourses(false);

  const handleLogin = (name) => {
    setLoggedInUser(name);
    setShowCourses(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
    setShowCourses(false);
    setCart([]);
  };

  const addToCart = (course) => {
    if (!loggedInUser) {
      Swal.fire({
        title: 'Debes registrarte',
        text: "No puedes comprar cursos sin estar registrado",
        icon: 'warning',
        confirmButtonText: 'Registrarse'
      }).then(() => {
        setShowCourses(false);
      });
    } else {
      setCart([...cart, course]);
      Swal.fire("Curso añadido al carrito", `${course.title} ha sido añadido al carrito`, "success");
    }
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    Swal.fire("Curso eliminado", "El curso ha sido eliminado del carrito", "info");
  };

  const handlePurchase = () => {
    Swal.fire("Compra realizada", "¡Gracias por tu compra!", "success");
    setCart([]);
    setShowCart(false);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div>
      <Navbar 
        onShowCourses={handleShowCourses} 
        onShowRegister={handleShowRegister} 
        cartItemCount={cart.length} 
        toggleCart={toggleCart} 
        onLogout={handleLogout} 
        loggedInUser={loggedInUser}
      />

      <Container welcomeMessage="Bienvenido a Tienda Coder, los mejores cursos de programación te esperan.">
        {showCourses && <CourseList addToCart={addToCart} />}
      </Container>

      {!showCourses && <AuthForm onLogin={handleLogin} />}

      {showCart && (
        <Cart cart={cart} removeFromCart={removeFromCart} handlePurchase={handlePurchase} />
      )}

      <Footer />
    </div>
  );
}

export default App;














