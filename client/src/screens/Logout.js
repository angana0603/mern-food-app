import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = () => {
    // For example, remove the userData from localStorage
    localStorage.removeItem("userData");

    // Redirect the user to the login page
    navigate("/login");
  };

  return (
    <button
      className="btn bg-white mx-2 text-secondary fw-bold"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
