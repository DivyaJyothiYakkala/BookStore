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
            <div className="container py-5 text-center">
                <h1>📦</h1>
                <h2>No Orders Yet</h2>
                <p className="text-muted">
                    Browse books and place your first order.
                </p>
            </div>
        );
    }
    return (
        <div className="container my-5">
            <h2 className="text-center fw-bold mb-5">
                📦 My Orders
            </h2>

            {orders.map((order) => (
                <div key={order._id} className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h5 className="fw-bold mb-1">🧾 Order ID</h5>
                        <p className="text-muted mb-3">
                            {order._id}
                        </p>
                        <p>
                            <span
                                className={`badge ${
                                    order.status === "Pending"
                                        ? "bg-warning text-dark"
                                        : order.status === "Processing"
                                        ? "bg-primary"
                                        : "bg-success"
                                }`}
                            >
                                {order.status}
                            </span>
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <hr />

                        {order.items.filter(item => item.book).map((item) => (
                            <div key={item._id} className="row mb-3">
                                <div className="col-md-2">
                                    <img
                                        src={item.book?.image
                                            ? `http://localhost:5000${item.book.image}`
                                            : "https://via.placeholder.com/150"}
                                        alt={item.book.title}
                                        className="img-fluid rounded shadow"
                                        style={{
                                            height: "140px",
                                            width: "100px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                                <div className="col-md-10">
                                    <h5>{item.book?.title || "Book Deleted" }</h5>
                                    <p>{item.book?.author || "Unknown Author"}</p>
                                    <p>Price: ₹{item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                        <hr />
                        <h5 className="text-end text-success fw-bold">
                            Total: ₹{order.totalAmount}
                        </h5>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Orders;