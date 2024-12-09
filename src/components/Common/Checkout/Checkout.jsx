import React, { useState } from "react";
import "./Checkout.css"; 
const Checkout = ({ cartItems, onConfirmPurchase }) => {
  const [buyerData, setBuyerData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });

  const handleInputChange = (e) => {
    setBuyerData({
      ...buyerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!buyerData.name || !buyerData.email || !buyerData.address || !buyerData.paymentMethod) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (
      buyerData.paymentMethod === "creditCard" &&
      (!buyerData.cardNumber || !buyerData.cardExpiry || !buyerData.cardCVV)
    ) {
      alert("Por favor, completa los datos de la tarjeta.");
      return;
    }

    onConfirmPurchase(buyerData);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong> - ${item.price}
          </li>
        ))}
      </ul>
      <p>Total: ${cartItems.reduce((sum, item) => sum + item.price, 0)}</p>
      <h3>Información del comprador</h3>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={buyerData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={buyerData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={buyerData.address}
          onChange={handleInputChange}
        />
        <select name="paymentMethod" value={buyerData.paymentMethod} onChange={handleInputChange}>
          <option value="">Selecciona un método de pago</option>
          <option value="creditCard">Tarjeta de crédito</option>
          <option value="paypal">PayPal</option>
          <option value="cash">Efectivo</option>
        </select>

        {buyerData.paymentMethod === "creditCard" && (
          <>
            <input
              type="text"
              name="cardNumber"
              placeholder="Número de tarjeta"
              value={buyerData.cardNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cardExpiry"
              placeholder="Fecha de vencimiento (MM/AA)"
              value={buyerData.cardExpiry}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cardCVV"
              placeholder="Código de seguridad (CVV)"
              value={buyerData.cardCVV}
              onChange={handleInputChange}
            />
          </>
        )}

        <button type="button" onClick={handleSubmit}>
          Confirmar Compra
        </button>
      </form>
    </div>
  );
};

export default Checkout;
