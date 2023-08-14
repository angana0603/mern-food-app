import React from "react";
import { Link } from "react-router-dom";
import { useCart, useDispatchCart } from "../components/CartConText"; // Import useCart
import Navbar from "../components/Navbar";

export default function CartItem() {
  const item = useCart();
  const dispatch = useDispatchCart();
  if (item.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <div className="m-5 w-100 text-center fs-3">Your Cart is Empty</div>
        <Link to="/" className="btn btn-primary ms-5 w-30 text-center fs-4">Back</Link>
      </div>
    )
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    let response = await fetch("http://localhost:5000/api/orderData", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: item,
        email: userEmail,
        order_date: new Date().toISOString()
      })
    }
    );
    console.log("JSON RESPONSE:::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let calculateTotal = () => {
    return item.reduce((total, food) => total + food.totalPrice, 0);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Cart Page</h2>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Option</th>
              <th>Amount</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {item.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>₹{food.totalPrice}</td>
                <td>
                  <button className="btn btn-danger" alt="delete" onClick={() => {
                    dispatch({ type: "REMOVE_FROM_CART", index: index })
                  }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h4>Total: ₹{calculateTotal()}</h4>
          <Link to={{ pathname: "/paymentpage", search: `?totalAmount=${calculateTotal()}` }} className="btn btn-primary" onClick={handleCheckOut}>Check Out</Link>

        </div>
      </div>
    </div>
  );
}
