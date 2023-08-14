import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);

    // Fetch order details from local storage or state management
    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setOrders(response)
        })

    }
    useEffect(() => {
        fetchMyOrder()
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='container'>
                <div className='row'>
                    {orders !== {} ? Array(orders).map(data => {
                        return (
                            data.orders ? data.orders.order_data.slice(0).reverse().map((item) => {
                                return (
                                    item.map((arrayData) => {
                                        return (
                                            <div> {arrayData.Order_date ? <div className='m-auto mt-5'>
                                                {data = arrayData.Order_date}
                                                <hr />
                                            </div> : <div className='col-12 col-md-6 col-lg-3' >
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>{arrayData.quantity}</span>
                                                            <span className='m-1'>{arrayData.size}</span>
                                                            <span className='m-1'>{data}</span>
                                                            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                ₹{arrayData.totalprice}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                            </div>
                                        )
                                    })

                                )
                            }) : ""
                        )
                    }) : ""}
                </div>


            </div>
        </div>
    )
}
