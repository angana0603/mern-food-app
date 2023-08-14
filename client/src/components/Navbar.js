import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartConText";


export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const cartItems = useCart();



  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(authToken ? true : false);
  }, []);

  const handleLogout = () => {
    // Clear authToken from local storage
    localStorage.removeItem("authToken");
    // Navigate to login page
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic fw-bold text-warning">
            Yummy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/">
                  Home
                </Link>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/MyOrders">My Orders</Link>
                </li>
              )}
            </ul>

            {(!localStorage.getItem("authToken")) ?
              <div className="d-flex">
                <Link
                  className="btn bg-white mx-2 text-secondary fw-bold"
                  to="/login">
                  Login
                </Link>
                <Link
                  className="btn bg-white mx-2 text-secondary fw-bold"
                  to="/signup">
                  Signup
                </Link>
              </div>
              : <div>
                <Link className="btn bg-white mx-2 text-secondary fw-bold" to="/cartitem"> Cart {"  "}
                  <span class="badge bg-secondary">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>

                </Link>

                <div className="btn bg-white mx-2 text-danger fw-bold" to="" onClick={handleLogout}>Logout</div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}
