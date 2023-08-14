import "./App.css";
import React from "react";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { CartProvider } from "./components/CartConText";
import CartItem from "./screens/CartItem";
import PaymentPage from "./components/PaymentPage";
import OrderSuccessPage from "./components/OrderSuccessPage";
import MyOrders from "./screens/MyOrders";




function App() {

  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/cartitem" element={<CartItem />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route path="/paymentpage" element={<PaymentPage />} />
            <Route path="/ordersuccesspage" element={<OrderSuccessPage />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
