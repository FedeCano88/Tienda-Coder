import React, { useState } from "react";
import Swal from "sweetalert2";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "./AuthForm.css";

function AuthForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [isRegister, setIsRegister] = useState(true);

  const validatePassword = (password) => /^(?=.*[A-Z]).{8,}$/.test(password);

  const handleRegister = async () => {
    if (!validatePassword(password)) {
      Swal.fire("Error", "La contraseña debe tener al menos una mayúscula y 8 caracteres.", "error");
      return;
    }

    const auth = getAuth();
    const normalizedEmail = email.toLowerCase();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      const user = userCredential.user;

      // Actualizar el perfil del usuario
      await updateProfile(user, {
        displayName: name,
      });

      onLogin(user.displayName || user.email);
      Swal.fire("Registro exitoso", "Te has registrado correctamente", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleLogin = async () => {
    const auth = getAuth();
    const normalizedEmail = email.toLowerCase();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
      const user = userCredential.user;
      onLogin(user.displayName || user.email);
      Swal.fire("Login exitoso", "Has iniciado sesión correctamente", "success");
    } catch (error) {
      Swal.fire("Error", "Usuario o contraseña incorrectos", "error");
    }
  };

  return (
    <div className="auth-form-container">
      <button
        className="toggle-form-button"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿Nuevo usuario? Regístrate"}
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isRegister) {
            handleRegister();
          } else {
            handleLogin();
          }
        }}
      >
        {isRegister && (
          <>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {isRegister ? "Registrarse" : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
