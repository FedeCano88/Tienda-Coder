import React, { useState } from "react";
import Swal from "sweetalert2";
import "./AuthForm.css";

function AuthForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [isRegister, setIsRegister] = useState(true);

  const validatePassword = (password) => /^(?=.*[A-Z]).{8,}$/.test(password);

  const handleRegister = () => {
    const normalizedEmail = email.toLowerCase();
    const storedUser = JSON.parse(localStorage.getItem("appUserData")) || null;

    // Verificar si el correo ya está registrado
    if (storedUser && storedUser.email === normalizedEmail) {
      Swal.fire("Error", "Este correo electrónico ya está registrado", "error");
      return;
    }

    if (name && lastname && phone && normalizedEmail && password) {
      if (!validatePassword(password)) {
        Swal.fire("Contraseña no válida", "La contraseña debe tener al menos 8 caracteres y una letra mayúscula", "error");
        return;
      }
      const userData = { name, lastname, phone, email: normalizedEmail, password };
      localStorage.setItem("appUserData", JSON.stringify(userData)); // Guardar datos en localStorage
      Swal.fire("Registro exitoso", `Bienvenido ${name} ${lastname}`, "success").then(() => {
        onLogin(name); // Inicia sesión automáticamente con el nombre del usuario
      });
    } else {
      Swal.fire("Error", "Completa todos los campos", "error");
    }
  };

  const handleLogin = () => {
    const normalizedEmail = email.toLowerCase();
    const storedUser = JSON.parse(localStorage.getItem("appUserData")) || null;

    if (storedUser && storedUser.email === normalizedEmail && storedUser.password === password) {
      Swal.fire("Login exitoso", `Bienvenido de nuevo ${storedUser.name} ${storedUser.lastname}`, "success").then(() => {
        onLogin(storedUser.name); // Actualiza el estado en App.jsx
      });
    } else {
      Swal.fire("Error", "Credenciales incorrectas o no registrado", "error");
    }
  };

  return (
    <div className="auth-form-container">
      <button
        className="toggle-form-button"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
      </button>
      <h2>{isRegister ? "Registro" : "Iniciar Sesión"}</h2>
      {isRegister && (
        <>
          <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Apellido" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          <input type="text" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </>
      )}
      <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={isRegister ? handleRegister : handleLogin} className="btn btn-primary">
        {isRegister ? "Registrarse" : "Iniciar Sesión"}
      </button>
    </div>
  );
}

export default AuthForm;

