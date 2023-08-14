import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { CardElement } from "@stripe/react-stripe-js";


export default function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
    const totalPrice = queryParams.get("totalPrice");
    console.log("Amount from query params:", totalPrice);

    const [orderStatus, setOrderStatus] = useState(null); // State to track order status

    const generateOrderId = () => {
        const timestamp = Date.now().toString(36);
        const randomString = Math.random().toString(36).slice(2, 7);
        return timestamp + randomString;
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    }

    const handleSubmit = async (event) => {
        await event.preventDefault();

        if (paymentMethod === "creditDebitCard") {
            setTimeout(() => {
                setOrderStatus("success");

                const orderDetails = {
                    id: generateOrderId(),
                    totalAmount: totalPrice,
                };

                const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
                const updatedOrders = [...existingOrders, orderDetails];

                localStorage.setItem("orders", JSON.stringify(updatedOrders));
                navigate("/ordersuccesspage");

            })
        } else if (paymentMethod === "cashOnDelivery") {
            // Handle cash on delivery logic
            setTimeout(() => {
                setOrderStatus("success");

                const orderDetails = {
                    id: generateOrderId(),
                    totalAmount: totalPrice,
                };

                const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
                const updatedOrders = [...existingOrders, orderDetails];

                localStorage.setItem("orders", JSON.stringify(updatedOrders));
                navigate("/ordersuccesspage");

            });
        }

    };

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="container mt-5 vh-100 d-flex justify-content-center align-items-center">
                <div className="bg-secondary p-4 text-black bg-opacity-25">
                    <h2 className="mb-4">Payment Page</h2>
                    <hr />
                    <h4> Total Amount: ₹{totalPrice}</h4> {/* function of calculate total */}
                    <div className="mb-3">
                        <h4>Payment Options:</h4>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="cashOnDelivery"
                                    checked={paymentMethod === "cashOnDelivery"}
                                    onChange={() => handlePaymentMethodChange("cashOnDelivery")}
                                />
                                Cash on Delivery
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    value="creditDebitCard"
                                    checked={paymentMethod === "creditDebitCard"}
                                    onChange={() => handlePaymentMethodChange("creditDebitCard")}
                                />
                                Credit/Debit Card
                            </label>
                        </div>

                        {paymentMethod === "creditDebitCard" && (
                            <form onSubmit={handleSubmit}>
                                {/* Card input */}
                                <CardElement />
                                <button type="submit">Confirm Payment</button>
                            </form>
                        )}

                        {paymentMethod === "cashOnDelivery" && (
                            <button onClick={handleSubmit}>Confirm Payment</button>
                        )}
                        {orderStatus === "success" && (
                            <div className="mt-3 text-success">
                                Order is successful!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );

}