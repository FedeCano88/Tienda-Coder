import React from "react";

function Cart({ cart, removeFromCart, handlePurchase }) {
  return (
    <div className="cart-dropdown position-absolute" style={{ top: "60px", right: "20px", backgroundColor: "#1f1b2e", padding: "10px", borderRadius: "5px", width: "300px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <div className="cart-header text-center"><h4>Carrito de compras</h4></div>
      <div className="cart-body">
        {cart.length > 0 ? (
          <>
            {cart.map((course, index) => (
              <div key={index} className="cart-item d-flex justify-content-between align-items-center mb-2" style={{ padding: "5px 0", borderBottom: "1px solid #90859b" }}>
                <p className="mb-0" style={{ fontSize: "0.9rem", flex: "1" }}>{course.title}</p>
                <p className="mb-0 text-end" style={{ fontSize: "0.9rem", width: "50px", textAlign: "right" }}>${course.price}</p>
                <button className="btn btn-danger btn-sm ms-2" style={{ fontSize: "0.7rem", padding: "2px 6px" }} onClick={() => removeFromCart(index)}>Eliminar</button>
              </div>
            ))}
            <h5 className="text-center mt-3">Total: ${cart.reduce((total, course) => total + course.price, 0).toFixed(2)} USD</h5>
            <button className="btn btn-success mt-3 w-100" onClick={handlePurchase}>Realizar compra</button>
          </>
        ) : (
          <p>El carrito está vacío.</p>
        )}
      </div>
    </div>
  );
}

export default Cart;
