import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        name: values.name,
        password: values.password,
        email: values.email,
        location: values.location,
      })
    );
    const response = await fetch("http://localhost:5000/api/creatuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        password: values.password,
        email: values.email,
        location: values.location,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid values");
    } else {
      navigate("/login");
    }
  };
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="form-label fw-bold text-primary"
            >
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={values.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label fw-bold text-primary"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={values.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label fw-bold text-primary"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={values.password}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputAddress"
              className="form-label fw-bold text-primary"
            >
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={values.location}
              onChange={onChange}
              id="exampleInputAddress"
            />
          </div>

          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-primary">
            Already a user
          </Link>
        </form>
      </div>

      {showPopup && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Sign in now
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowPopup(false)} // the state to false to hide the pop-up
          ></button>
        </div>
      )}
    </>
  );
}
