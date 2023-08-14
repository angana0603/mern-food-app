import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Call login API with username and password
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "exampleUser",
          password: "examplePassword",
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Save the user data to local storage
        localStorage.setItem("userData", JSON.stringify(data));

        // Update isLoggedIn state to true
        setIsLoggedIn(true);

        // Set the user data state
        setUserData(data);
      } else {
        // Handle login failure
        alert("Invalid credentials");
      }
    } catch (error) {
      // Handle API or other errors
      console.error("Error during login:", error);
    }
  };

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("userData");

    // Reset isLoggedIn state to false
    setIsLoggedIn(false);

    // Redirect the user to the login page
    navigate("/login");
  };

  // Load user data from local storage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setIsLoggedIn(true);
    }
  }, []);
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    response = await response.json();
    console.log(response[0][1].CategoryName)
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };
  useEffect(() => {
    loadFoodItems();
  }, []);

  const desiredCategory = "CategoryName";
  // eslint-disable-next-line
  const filteredFoodItems = foodItem.filter(
    (item) => item.CategoryName === desiredCategory
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <div>
        <Navbar>
          {isLoggedIn ? (
            // Show the logout button when the user is logged in
            <>
              <span>Welcome, {userData && userData.name}!</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            // Show the login button when the user is logged out
            <button onClick={handleLogin}>Login</button>
          )}
        </Navbar>
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/300x300/?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(40%)" }}
                alt=""
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300x300/?chicken-pizza"
                className="d-block w-100"
                style={{ filter: "brightness(40%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300x300/?pasta-pizza"
                className="d-block w-100"
                style={{ filter: "brightness(40%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem !== [] ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>"No Data Found"</div>
                )}
              </div>
            );
          })
        ) : (
          <div>""""""</div>
        )}
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
