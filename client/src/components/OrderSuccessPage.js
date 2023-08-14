import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatchCart } from "./CartConText"; // Import useDispatchCart



export default function OrderSuccessPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatchCart(); // Get the dispatch function

    useEffect(() => {
        const isOrderSuccessful = location.search.includes("success=true");

        if (isOrderSuccessful) {
            // Dispatch action to clear the cart
            dispatch({ type: "CLEAR_CART" })
        }
    }, [location.search, navigate, dispatch]);


    return (
        <div className="container mt-5 vh-100 d-flex justify-content-center align-items-center">
            <div className="bg-light p-4">
                <div className="alert alert-success" role="alert">
                    <div className="d-flex align-items-center">
                        <div className="alert-icon">
                            <i className="fa fa-check-circle-o fa-2x"></i>
                        </div>
                        <div className="alert-text ml-3">
                            <strong>Your order is successful!</strong>
                        </div>
                        <Link to="/" className="btn btn-primary">Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
