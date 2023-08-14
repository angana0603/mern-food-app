import React, { useState, useEffect, useRef } from "react";
import { useCart, useDispatchCart } from "./CartConText";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let cartItems = useCart();
  let priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options)
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState("");

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleAddToCart = async () => {
    let food = []
    for (const data of cartItems) {
      if (data.id === props.foodItem._id) {
        food = data;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE", id: props.foodItem._id, name: props.foodItem.name, totalPrice: totalPrice, quantity: quantity, size: size, price: options[size], img: props.foodItem.img,
        })
        return
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD_TO_CART", id: props.foodItem._id, name: props.foodItem.name, totalPrice: totalPrice, quantity: quantity, size: size, price: options[size], img: props.foodItem.img,
        });
        return
      }
      return
    }
    await dispatch({
      type: "ADD_TO_CART", id: props.foodItem._id, name: props.foodItem.name, totalPrice: totalPrice, quantity: quantity, size: size, price: options[size], img: props.foodItem.img,
    });
  };
  let totalPrice = quantity * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, []);


  return (
    <div>
      <div className="d-flex flex-wrap">
        <div
          className="card mb-4 mt-4 bg-dark text-white"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img src={props.foodItem.img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-center">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select
                className="mb-3 h-100 rounded bg-success"
                onChange={(e) => setQuantity(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select
                className="m-2 h-100 rounded bg-success"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>

              <div className="mt-1 text-center">₹{quantity * parseInt(options[size])}/-</div>
            </div>
            <div className="d-inline h-100 fs-5">
              <button
                className="btn btn-primary justify-center ms-5"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
