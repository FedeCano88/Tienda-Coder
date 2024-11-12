import React from "react";
import "./Cart.css";

function Cart({ cartItems, onRemoveItem, onPurchase }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <ul className="cart-list">
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <span className="item-name">{item.title}</span>
            <span className="item-price">${item.price.toFixed(2)}</span>
            <button className="btn btn-danger btn-sm" onClick={() => onRemoveItem(index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <h5 className="cart-total">Total: ${totalPrice.toFixed(2)} USD</h5>
      <button className="btn btn-success mt-3 w-100" onClick={onPurchase}>
        Realizar compra
      </button>
    </div>
  );
}

export default Cart;

