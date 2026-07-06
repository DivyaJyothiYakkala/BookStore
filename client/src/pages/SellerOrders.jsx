import { useEffect, useState } from "react";
import api from "../services/api";

function SellerOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/seller/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching seller orders:", error);
            }
        };

        loadOrders();
    }, []);

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Seller Orders</h2>

            {orders.length === 0 ? (
                <h4 className="text-center">No orders found.</h4>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="card mb-4 shadow-sm">
                        <div className="card-header">
                            <strong>Customer:</strong> {order.user.name}
                            <br />
                            <strong>Email:</strong> {order.user.email}
                        </div>

                        <div className="card-body">

                            {order.items.map((item) => (
                                <div
                                    key={item._id}
                                    className="border rounded p-3 mb-3"
                                >
                                    <h5>{item.book.title}</h5>

                                    <p>
                                        Quantity: {item.quantity}
                                    </p>

                                    <p>
                                        Price: ₹{item.price}
                                    </p>

                                    <p>
                                        Subtotal: ₹{item.price * item.quantity}
                                    </p>
                                </div>
                            ))}

                            <hr />

                            <p>
                                <strong>Status:</strong> {order.status}
                            </p>

                            <p>
                                <strong>Total Order Amount:</strong> ₹{order.totalAmount}
                            </p>

                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default SellerOrders;