import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../firebaseConfig";
import "./UserPanel.css"

const UserPanel = () => {
  const [purchases, setPurchases] = useState([]);
  const user = JSON.parse(localStorage.getItem("appUserData"));

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "Purchases"),
          where("email", "==", user.email) // Filtrar por el email del usuario logueado
        );
        const querySnapshot = await getDocs(q);
        const userPurchases = querySnapshot.docs.map((doc) => doc.data());
        setPurchases(userPurchases);
      } catch (error) {
        console.error("Error al obtener las compras: ", error);
      }
    };

    fetchPurchases();
  }, [user]);

  return (
    <div className="profile-container">
      <h2>Historial de Compras</h2>
      {purchases.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Cursos</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={index}>
                <td>{purchase.date}</td>
                <td>
                  {purchase.items.map((item, i) => (
                    <div key={i}>
                      {item.title} - ${item.price} USD
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No has realizado compras aún.</p>
      )}
    </div>
  );
};

export default UserPanel;


