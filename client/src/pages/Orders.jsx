import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/orders", {
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

    if (orders.length === 0) {
        return (
            <div className="container mt-5">
                <h2 className="text-center">No Orders Found</h2>
            </div>
        );
    }
    return (
        <div className="container my-5">
            <h2 className="mb-4">My Orders</h2>

            {orders.map((order) => (
                <div key={order._id} className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h5>Order ID: {order._id}</h5>
                        <p>
                            <strong>Status:</strong> {order.status}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <hr />

                        {order.items.map((item) => (
                            <div key={item._id} className="row mb-3">
                                <div className="col-md-2">
                                    <img
                                        src={`http://localhost:5000${item.book.image}`}
                                        alt={item.book.title}
                                        className="img-fluid rounded"
                                    />
                                </div>
                                <div className="col-md-10">
                                    <h5>{item.book.title}</h5>
                                    <p>{item.book.author}</p>
                                    <p>Price: ₹{item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                        <hr />
                        <h5 className="text-end">
                            Total: ₹{order.totalAmount}
                        </h5>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Orders;