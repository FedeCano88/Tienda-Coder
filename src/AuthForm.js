import React, { useState } from "react";
import Swal from "sweetalert2";

function AuthForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [isRegister, setIsRegister] = useState(true);

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  };

  const handleRegister = () => {
    if (name && lastname && phone && email && password) {
      if (!validatePassword(password)) {
        Swal.fire("Contraseña no válida", "La contraseña debe tener al menos 8 caracteres y una letra mayúscula", "error");
        return;
      }
      const userData = { name, lastname, phone, email, password };
      localStorage.setItem("appUserData", JSON.stringify(userData));
      Swal.fire("Registro exitoso", `Bienvenido ${name} ${lastname}`, "success").then(() => {
        onLogin(name);
      });
    } else {
      Swal.fire("Error", "Completa todos los campos", "error");
    }
  };

  const handleLogin = () => {
    let user = JSON.parse(localStorage.getItem("appUserData"));
    if (user && user.email === email && user.password === password) {
      Swal.fire("Login exitoso", `Bienvenido de nuevo ${user.name} ${user.lastname}`, "success").then(() => {
        onLogin(user.name);
      });
    } else {
      Swal.fire("Error", "Credenciales incorrectas o no registrado", "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="auth-tabs d-flex justify-content-center mb-4">
        <button className={`btn ${isRegister ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setIsRegister(true)}>Registro</button>
        <button className={`btn ${!isRegister ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setIsRegister(false)}>Login</button>
      </div>

      <h3 className="text-center">{isRegister ? "Registro" : "Login"}</h3>

      {isRegister ? (
        <>
          <div className="input-wrapper">
            <input
              type="text"
              className="form-control mt-3 smaller-input"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="form-control mt-3 smaller-input"
              placeholder="Apellido"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              type="text"
              className="form-control mt-3 smaller-input"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              className="form-control mt-3 smaller-input"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mt-3 smaller-input"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small className="password-requirements">
              * La contraseña debe tener al menos 1 mayúscula y mínimo 8 caracteres.
            </small>
            <button
              className="btn btn-success mt-3 smaller-button"
              onClick={handleRegister}
            >
              Registrar
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="input-wrapper">
            <input
              type="email"
              className="form-control mt-3 smaller-input"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mt-3 smaller-input"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-primary mt-3 smaller-button"
              onClick={handleLogin}
            >
              Iniciar Sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AuthForm;









