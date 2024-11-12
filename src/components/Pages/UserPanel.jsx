import React, { useEffect, useState } from "react";
import "./UserPanel.css";

function UserPanel() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("appUserData"));
    const history = JSON.parse(localStorage.getItem("purchaseHistory")) || {};
    setPurchaseHistory(history[storedUser.email] || []);
  }, []);
  
  return (
    <div className="user-panel-container">
      <h2>Historial de Compras</h2>
      {purchaseHistory.length === 0 ? (
        <p>No has realizado ninguna compra aún.</p>
      ) : (
        <table className="purchase-table">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Cursos</th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory.map((purchase, index) => (
              <tr key={index}>
                <td>{purchase.date}</td>
                <td>
                  <ul>
                    {purchase.items.map((item, i) => (
                      <li key={i} className="course-item">{item.title} - ${item.price} USD</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserPanel;

