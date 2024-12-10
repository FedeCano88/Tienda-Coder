
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Layouts/Navbar/Navbar";
import Footer from "./components/Layouts/Footer/Footer";
import AuthForm from "./components/Common/AuthForm/AuthForm";
import Cart from "./components/Common/Cart/Cart";
import Confirmation from "./components/Common/Confirmation/Confirmation";
import UserPanel from "./components/Pages/UserPanel";
import Home from "./components/Pages/Home";
import Courses from "./components/Pages/Courses";
import CourseDetails from "./components/Pages/CourseDetails/CourseDetails"
import Checkout from "./components/Common/Checkout/Checkout";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import Modal from "react-modal"; // Importar React Modal
import db from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Configurar React Modal
Modal.setAppElement("#root");

function App() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user.displayName || user.email); 
        console.log("Usuario autenticado:", user);
      } else {
        setLoggedInUser(null);
        console.log("No hay usuario autenticado.");
      }
    });
    return () => unsubscribe(); // Limpieza
  }, []);

  const [courses, setCourses] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  const fetchCourses = async () => {
    try {
      const courseCollection = collection(db, "CourseList");
      const courseSnapshot = await getDocs(courseCollection);
      const courseList = courseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(courseList);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleLogin = (name) => {
    setLoggedInUser(name);
    navigate("/home");
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

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    Swal.fire("Curso eliminado", "El curso ha sido eliminado del carrito", "info");
  };

  const handlePurchase = () => {
    if (cart.length === 0) {
      Swal.fire("Carrito vacío", "No tienes cursos en el carrito", "warning");
      return;
    }

    setShowCartModal(false);
    navigate("/checkout");
  };

  const confirmPurchase = async (buyerData) => {
    const user = JSON.parse(localStorage.getItem("appUserData"));
    const purchaseData = {
      buyer: buyerData.name,
      email: buyerData.email || user.email,
      address: buyerData.address,
      paymentMethod: buyerData.paymentMethod,
      date: new Date().toLocaleString(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price, 0),
    };

    try {
      const purchaseCollection = collection(db, "Purchases");
      await addDoc(purchaseCollection, purchaseData);

      Swal.fire("Compra realizada", "¡Gracias por tu compra!", "success").then(() => {
        setCart([]);
        navigate("/perfil");
      });
    } catch (error) {
      console.error("Error al guardar la compra: ", error);
      Swal.fire("Error", "No se pudo completar la compra. Intenta nuevamente.", "error");
    }
  };

  return (
    <div>
      <Navbar
        cartItemCount={cart.length}
        loggedInUser={loggedInUser} handleLogout={handleLogout}
        toggleCart={() => setShowCartModal(true)}
      />
      {loggedInUser && (
        <div className="text-center mt-3 welcome">
          <h3>Bienvenido, {loggedInUser}</h3>
          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cursos" element={<Courses courses={courses} onAddToCart={addToCart} />} />
        <Route path="/cursos/:slug" element={<CourseDetails />} /> {/* Ruta dinámica */}
        <Route path="/checkout" element={<Checkout cartItems={cart} onConfirmPurchase={confirmPurchase} />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/perfil" element={<UserPanel />} />
        <Route path="/registrar" element={<AuthForm onLogin={handleLogin} />} />
        <Route path="/login" element={<AuthForm onLogin={handleLogin} />} />
        <Route
          path="/carrito"
          element={<Cart cartItems={cart} onRemoveItem={removeFromCart} onPurchase={handlePurchase} />}
        />
      </Routes>

      <Footer />

      <Modal
        isOpen={showCartModal}
        onRequestClose={() => setShowCartModal(false)}
        contentLabel="Carrito de Compras"
        overlayClassName="cart-modal-overlay"
        className="cart-modal-content"
      >
        <Cart
          cartItems={cart}
          onRemoveItem={removeFromCart}
          onPurchase={handlePurchase}
        />
        <button
          onClick={() => setShowCartModal(false)}
          className="btn btn-secondary mt-3 w-100"
        >
          Cerrar
        </button>
      </Modal>
    </div>
  );
}

export default App;
