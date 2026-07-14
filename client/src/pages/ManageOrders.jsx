import { useEffect, useState } from "react";
import api from "../services/api";

function ManageOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/orders/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        loadOrders();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("token");

            await api.put(
                `/orders/${id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === id
                        ? { ...order, status }
                        : order
                )
            );

            alert("Order status updated successfully.");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to update status");
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center fw-bold mb-5">
                📦 Order Management 
            </h2>

            {orders.map((order) => (
                <div key={order._id} className="card shadow-lg border-0 rounded-4 mb-4">
                    <div className="card-header bg-primary text-white">
                        <strong>Customer:</strong> {order.user.name}
                        <br />
                        <strong>Email:</strong> {order.user.email}
                    </div>

                    <div className="card-body">

                        {order.items.map((item) => (
                            <div
                                key={item._id}
                                className="border rounded-4 p-3 mb-3 bg-light"
                            >
                                <h5>{item.book?.title || "Book Deleted"}</h5>

                                <p>Author: {item.book?.author || "N/A"}</p>

                                <p>Quantity: {item.quantity}</p>

                                <p>Price: ₹{item.price}</p>

                                <p>
                                    Subtotal: ₹{item.price * item.quantity}
                                </p>
                            </div>
                        ))}

                        <div className="d-flex align-items-center justify-content-between">

                            <h5 className="text-success fw-bold">
                                💰 Total: ₹{order.totalAmount}
                            </h5>

                            <select
                                className="form-select w-auto shadow-sm"
                                value={order.status}
                                onChange={(e) =>
                                    updateStatus(order._id, e.target.value)
                                }
                            >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Delivered">Delivered</option>
                            </select>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ManageOrders;